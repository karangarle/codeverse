import { useState, useEffect, useMemo } from "react";
import { api } from "@/shared/api/api";
import {
  BookOpen,
  Sparkles,
  AlertCircle,
  Search,
  ArrowLeft,
  Hash,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { CHEATSHEETS, type CheatCard, type CheatsheetData } from "@/entities/cheatsheet";

// ─────────────────────────────────────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────────────────────────────────────
interface Revision {
  _id: string;
  title: string;
  category: string;
  content: string;
  keyPoints: string[] | string;
}
interface RevisionsModuleProps { initialSearch?: string; }

// ─────────────────────────────────────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────────────────────────────────────
function normalizeKeyPoints(kp: string[] | string): string[] {
  if (Array.isArray(kp)) return kp;
  if (typeof kp === "string" && kp.trim())
    return kp.split(/\.\s+/).map((s) => s.trim()).filter(Boolean);
  return [];
}

function escapeHTML(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─────────────────────────────────────────────────────────────────────────────
//  Syntax Highlighter — HTML
// ─────────────────────────────────────────────────────────────────────────────
function renderHTMLTag(tag: string): string {
  const m = /^(<\/?)(\w[\w-]*)/.exec(tag);
  if (!m) return escapeHTML(tag);
  const bracketOpen = m[1];
  const tagName = m[2];
  let rest = tag.slice(m[0].length);
  const selfClose = rest.endsWith("/>");
  const close = selfClose ? "/>" : ">";
  const attrsRaw = selfClose ? rest.slice(0, -2) : rest.endsWith(">") ? rest.slice(0, -1) : rest;

  let attrsHtml = "";
  let k = 0;
  while (k < attrsRaw.length) {
    const ch = attrsRaw[k];
    if (ch === " " || ch === "\n" || ch === "\t" || ch === "\r") {
      attrsHtml += ch;
      k++;
      continue;
    }
    let nameEnd = k;
    while (nameEnd < attrsRaw.length && attrsRaw[nameEnd] !== "=" && attrsRaw[nameEnd] !== " " && attrsRaw[nameEnd] !== "\n" && attrsRaw[nameEnd] !== "\t") nameEnd++;
    const attrName = attrsRaw.slice(k, nameEnd);
    if (!attrName) { attrsHtml += escapeHTML(attrsRaw[k]); k++; continue; }
    attrsHtml += `<span style="color:#fbbf24">${escapeHTML(attrName)}</span>`;
    k = nameEnd;
    if (k < attrsRaw.length && attrsRaw[k] === "=") {
      attrsHtml += `<span style="color:#94a3b8">=</span>`;
      k++;
      if (k < attrsRaw.length && (attrsRaw[k] === '"' || attrsRaw[k] === "'")) {
        const q = attrsRaw[k];
        let ve = k + 1;
        while (ve < attrsRaw.length && attrsRaw[ve] !== q) ve++;
        ve++;
        attrsHtml += `<span style="color:#86efac">${escapeHTML(attrsRaw.slice(k, ve))}</span>`;
        k = ve;
      }
    }
  }
  return `<span style="color:#94a3b8">${escapeHTML(bracketOpen)}</span><span style="color:#60a5fa">${escapeHTML(tagName)}</span>${attrsHtml}<span style="color:#94a3b8">${escapeHTML(close)}</span>`;
}

function highlightHTML(code: string): string {
  let i = 0, result = "";
  while (i < code.length) {
    if (code.startsWith("<!--", i)) {
      const end = code.indexOf("-->", i + 4);
      const ep = end === -1 ? code.length : end + 3;
      result += `<span style="color:#64748b;font-style:italic">${escapeHTML(code.slice(i, ep))}</span>`;
      i = ep; continue;
    }
    if (code.substring(i, i + 9).toUpperCase() === "<!DOCTYPE") {
      const end = code.indexOf(">", i);
      const ep = end === -1 ? code.length : end + 1;
      result += `<span style="color:#c084fc">${escapeHTML(code.slice(i, ep))}</span>`;
      i = ep; continue;
    }
    if (code[i] === "<") {
      let j = i + 1, inStr = false, sq = "";
      while (j < code.length) {
        if (inStr) { if (code[j] === sq) inStr = false; }
        else { if (code[j] === '"' || code[j] === "'") { inStr = true; sq = code[j]; } else if (code[j] === ">") { j++; break; } }
        j++;
      }
      result += renderHTMLTag(code.slice(i, j));
      i = j; continue;
    }
    let j = i;
    while (j < code.length && code[j] !== "<") j++;
    result += escapeHTML(code.slice(i, j));
    i = j;
  }
  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
//  Syntax Highlighter — JavaScript / JSX
// ─────────────────────────────────────────────────────────────────────────────
const JS_KW = new Set([
  "const","let","var","function","return","if","else","for","while","class",
  "import","export","from","async","await","new","this","true","false","null",
  "undefined","typeof","instanceof","try","catch","finally","throw","switch",
  "case","break","continue","default","do","in","of","delete","void","yield",
  "extends","static","super","constructor","type","interface","enum","as",
]);

function highlightJS(code: string): string {
  let i = 0, result = "";
  while (i < code.length) {
    // Line comment
    if (code.startsWith("//", i)) {
      let end = code.indexOf("\n", i);
      if (end === -1) end = code.length;
      result += `<span style="color:#64748b;font-style:italic">${escapeHTML(code.slice(i, end))}</span>`;
      i = end; continue;
    }
    // Block comment
    if (code.startsWith("/*", i)) {
      let end = code.indexOf("*/", i + 2);
      end = end === -1 ? code.length : end + 2;
      result += `<span style="color:#64748b;font-style:italic">${escapeHTML(code.slice(i, end))}</span>`;
      i = end; continue;
    }
    // Template string
    if (code[i] === "`") {
      let j = i + 1;
      while (j < code.length) {
        if (code[j] === "\\" ) { j += 2; continue; }
        if (code[j] === "`") { j++; break; }
        j++;
      }
      result += `<span style="color:#86efac">${escapeHTML(code.slice(i, j))}</span>`;
      i = j; continue;
    }
    // Strings
    if (code[i] === '"' || code[i] === "'") {
      const q = code[i]; let j = i + 1;
      while (j < code.length) {
        if (code[j] === "\\" ) { j += 2; continue; }
        if (code[j] === q || code[j] === "\n") { if (code[j] === q) j++; break; }
        j++;
      }
      result += `<span style="color:#86efac">${escapeHTML(code.slice(i, j))}</span>`;
      i = j; continue;
    }
    // Numbers
    if (/\d/.test(code[i])) {
      let j = i;
      while (j < code.length && /[\d._x]/.test(code[j])) j++;
      result += `<span style="color:#fb923c">${escapeHTML(code.slice(i, j))}</span>`;
      i = j; continue;
    }
    // Identifiers / keywords
    if (/[a-zA-Z_$]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[\w$]/.test(code[j])) j++;
      const word = code.slice(i, j);
      if (JS_KW.has(word)) {
        result += `<span style="color:#c084fc">${escapeHTML(word)}</span>`;
      } else if (j < code.length && code[j] === "(") {
        result += `<span style="color:#60a5fa">${escapeHTML(word)}</span>`;
      } else {
        result += escapeHTML(word);
      }
      i = j; continue;
    }
    result += escapeHTML(code[i]);
    i++;
  }
  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
//  Syntax Highlighter — CSS
// ─────────────────────────────────────────────────────────────────────────────
function highlightCSS(code: string): string {
  let i = 0, result = "", inBlock = false, afterColon = false;
  while (i < code.length) {
    if (code.startsWith("/*", i)) {
      const end = code.indexOf("*/", i + 2);
      const ep = end === -1 ? code.length : end + 2;
      result += `<span style="color:#64748b;font-style:italic">${escapeHTML(code.slice(i, ep))}</span>`;
      i = ep; continue;
    }
    if (code[i] === "{") { inBlock = true; afterColon = false; result += `<span style="color:#94a3b8">{</span>`; i++; continue; }
    if (code[i] === "}") { inBlock = false; afterColon = false; result += `<span style="color:#94a3b8">}</span>`; i++; continue; }
    if (code[i] === ":" && inBlock) { afterColon = true; result += `<span style="color:#94a3b8">:</span>`; i++; continue; }
    if (code[i] === ";" && inBlock) { afterColon = false; result += `<span style="color:#94a3b8">;</span>`; i++; continue; }
    if (inBlock && afterColon) {
      let j = i;
      while (j < code.length && code[j] !== ";" && code[j] !== "}") j++;
      result += `<span style="color:#86efac">${escapeHTML(code.slice(i, j))}</span>`;
      i = j; continue;
    }
    if (inBlock && /[a-zA-Z-]/.test(code[i])) {
      let j = i;
      while (j < code.length && code[j] !== ":" && code[j] !== "}" && code[j] !== "\n") j++;
      result += `<span style="color:#60a5fa">${escapeHTML(code.slice(i, j))}</span>`;
      i = j; continue;
    }
    if (!inBlock && /[a-zA-Z.#*[\]:]/.test(code[i])) {
      let j = i;
      while (j < code.length && code[j] !== "{" && code[j] !== "\n") j++;
      result += `<span style="color:#fbbf24">${escapeHTML(code.slice(i, j))}</span>`;
      i = j; continue;
    }
    result += escapeHTML(code[i]);
    i++;
  }
  return result;
}

function getHighlighted(code: string, lang?: string): string {
  switch (lang) {
    case "html": return highlightHTML(code);
    case "js":
    case "jsx":
    case "javascript": return highlightJS(code);
    case "css": return highlightCSS(code);
    default: return escapeHTML(code);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  Category colour palette
// ─────────────────────────────────────────────────────────────────────────────
const COLORS: Record<string, { badge: string; label: string; section: string; pill: string }> = {
  HTML:             { badge: "bg-orange-500",  label: "text-white",    section: "text-orange-400",  pill: "bg-orange-500/15 text-orange-300 border-orange-500/25" },
  CSS:              { badge: "bg-sky-500",      label: "text-white",    section: "text-sky-400",     pill: "bg-sky-500/15 text-sky-300 border-sky-500/25" },
  JavaScript:       { badge: "bg-yellow-400",   label: "text-zinc-900", section: "text-yellow-400",  pill: "bg-yellow-500/15 text-yellow-300 border-yellow-500/25" },
  React:            { badge: "bg-cyan-500",      label: "text-white",    section: "text-cyan-400",    pill: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25" },
  "Node & Express": { badge: "bg-emerald-500",   label: "text-white",    section: "text-emerald-400", pill: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25" },
  DSA:              { badge: "bg-violet-500",    label: "text-white",    section: "text-violet-400",  pill: "bg-violet-500/15 text-violet-300 border-violet-500/25" },
  MongoDB:          { badge: "bg-green-600",     label: "text-white",    section: "text-green-400",   pill: "bg-green-500/15 text-green-300 border-green-500/25" },
  TypeScript:       { badge: "bg-blue-500",      label: "text-white",    section: "text-blue-400",    pill: "bg-blue-500/15 text-blue-300 border-blue-500/25" },
};
const DEFAULT_COLOR = { badge: "bg-indigo-500", label: "text-white", section: "text-indigo-400", pill: "bg-indigo-500/15 text-indigo-300 border-indigo-500/25" };
const col = (cat: string) => COLORS[cat] ?? DEFAULT_COLOR;

// ─────────────────────────────────────────────────────────────────────────────
//  CodeBlock component — with syntax highlighting
// ─────────────────────────────────────────────────────────────────────────────
function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const highlighted = useMemo(() => getHighlighted(code, lang), [code, lang]);
  return (
    <div
      className="rounded-lg bg-[#070709]"
      style={{ overflowX: "auto", scrollbarWidth: "thin", scrollbarColor: "#52525b transparent" }}
    >
      <pre
        className="px-4 py-3.5 text-[12.5px] font-mono leading-[1.75]"
        style={{ display: "inline-block", minWidth: "100%" }}
      >
        <code dangerouslySetInnerHTML={{ __html: highlighted }} style={{ color: "#d4d4d8" }} />
      </pre>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Single cheatsheet card — QuickRef.me style
// ─────────────────────────────────────────────────────────────────────────────
function CheatCardView({ card, category }: { card: CheatCard; category: string }) {
  const c = col(category);
  return (
    <div className="rounded-xl border border-zinc-800/60 bg-[#0d0d11] hover:border-zinc-700/70 hover:shadow-xl hover:shadow-black/30 transition-all duration-200 overflow-hidden">

      {/* ── Header strip: colored dot + topic title ── */}
      <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-zinc-800/50 bg-zinc-900/20">
        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${c.badge}`} />
        <span className={`text-[12px] font-bold tracking-wide ${c.section} flex-1 truncate`}>
          {card.title}
        </span>
      </div>

      {/* ── Card body ── */}
      <div className="p-4 space-y-3">
        {/* Description */}
        {card.desc && (
          <p className="text-zinc-400 text-[13px] leading-relaxed">{card.desc}</p>
        )}

        {/* Code block — scrollable, full width */}
        {card.code && <CodeBlock code={card.code} lang={card.lang} />}

        {/* Attributes table */}
        {card.items && card.items.length > 0 && (
          <div className="rounded-lg border border-zinc-800/50 overflow-hidden">
            <table className="w-full text-[12.5px]">
              <tbody>
                {card.items.map((item, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-zinc-800/40 last:border-0 ${idx % 2 === 0 ? "bg-zinc-900/30" : ""}`}
                  >
                    <td className={`px-3 py-2 font-mono font-semibold whitespace-nowrap align-top ${c.section}`}>
                      {item.key}
                    </td>
                    <td className="px-3 py-2 text-zinc-400 leading-relaxed">{item.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Note */}
        {card.note && (
          <p className="text-[12px] text-zinc-500 italic border-t border-zinc-800/40 pt-2.5">
            {card.note}
          </p>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Full cheatsheet page — QuickRef.me style
// ─────────────────────────────────────────────────────────────────────────────
function CheatsheetView({ data, onBack }: { data: CheatsheetData; onBack: () => void }) {
  const c = col(data.category);
  return (
    <div className="space-y-10 animate-fadeIn">
      {/* ── Back ── */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium transition-colors cursor-pointer group"
      >
        <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
        Back to Cards
      </button>

      {/* ── Page header ── */}
      <div>
        <h1 className={`text-3xl font-extrabold ${c.section} tracking-tight`}>
          {data.title}
        </h1>
        <p className="text-zinc-400 text-sm mt-1 max-w-2xl">{data.subtitle}</p>
      </div>

      {/* ── Sections ── */}
      {data.sections.map((section) => (
        <div key={section.id} className="space-y-5">
          {/* Section heading — # style */}
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-800/70">
            <Hash size={18} className={`${c.section} flex-shrink-0`} />
            <h2 className={`text-xl font-bold ${c.section}`}>{section.title}</h2>
          </div>

          {/* Cards — 3-column masonry */}
          <MasonryGrid cards={section.cards} category={data.category} />
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Masonry grid — 3 columns
// ─────────────────────────────────────────────────────────────────────────────
function MasonryGrid({ cards, category }: { cards: CheatCard[]; category: string }) {
  // 2 columns — wide enough for code blocks to be readable
  const cols: CheatCard[][] = [[], []];
  cards.forEach((card, i) => cols[i % 2].push(card));
  return (
    <div className="grid grid-cols-2 gap-5 items-start">
      {cols.map((column, ci) => (
        <div key={ci} className="flex flex-col gap-5 min-w-0">
          {column.map((card) => (
            <CheatCardView key={card.id} card={card} category={category} />
          ))}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Fallback detail view — for categories without static cheatsheet data
// ─────────────────────────────────────────────────────────────────────────────
function RevisionDetailView({
  category,
  revisions,
  onBack,
}: {
  category: string;
  revisions: Revision[];
  onBack: () => void;
}) {
  const c = col(category);
  const cards = revisions.filter((r) => r.category === category);
  const cols: Revision[][] = [[], []];
  cards.forEach((card, i) => cols[i % 2].push(card));

  return (
    <div className="space-y-8 animate-fadeIn">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium transition-colors cursor-pointer group"
      >
        <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
        Back to Cards
      </button>
      <div className="flex items-center gap-3 pb-3 border-b border-zinc-800/70">
        <Hash size={22} className={c.section} />
        <h1 className={`text-2xl font-extrabold ${c.section}`}>{category}</h1>
        <span className="text-zinc-600 text-sm">{cards.length} topic{cards.length !== 1 ? "s" : ""}</span>
      </div>
      <div className="grid grid-cols-2 gap-5 items-start">
        {cols.map((column, ci) => (
          <div key={ci} className="flex flex-col gap-5 min-w-0">
            {column.map((rev) => {
              const kp = normalizeKeyPoints(rev.keyPoints);
              return (
                <div key={rev._id} className="rounded-xl border border-zinc-800/60 bg-[#0d0d11] overflow-hidden hover:border-zinc-700/70 transition-all duration-200">
                  {/* Header strip */}
                  <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-zinc-800/50 bg-zinc-900/20">
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${c.badge}`} />
                    <span className={`text-[12px] font-bold tracking-wide ${c.section} flex-1 truncate`}>
                      {rev.title}
                    </span>
                  </div>
                  <div className="p-4 space-y-3">
                    <p className="text-zinc-300 text-[13px] leading-relaxed">{rev.content}</p>
                    {kp.length > 0 && (
                      <ul className="border-t border-zinc-800/50 pt-3 space-y-1.5">
                        {kp.map((pt, idx) => (
                          <li key={idx} className="flex gap-2 text-[12.5px] text-zinc-400">
                            <span className={`mt-[5px] w-1.5 h-1.5 rounded-full ${c.badge} flex-shrink-0`} />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

//  Grid view — original old design
// ─────────────────────────────────────────────────────────────────────────────
function GridView({
  revisions,
  initialSearch,
  onCardClick,
}: {
  revisions: Revision[];
  initialSearch?: string;
  onCardClick: (rev: Revision) => void;
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState(initialSearch ?? "");

  useEffect(() => {
    if (initialSearch) { setSearchTerm(initialSearch); setActiveCategory("All"); }
  }, [initialSearch]);

  const categories = ["All", ...Array.from(new Set(revisions.map((r) => r.category)))];

  const visible = revisions
    .filter((r) => activeCategory === "All" || r.category === activeCategory)
    .filter((r) => {
      const q = searchTerm.trim().toLowerCase();
      if (!q) return true;
      return `${r.title} ${r.category} ${r.content}`.toLowerCase().includes(q);
    });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Quick Revision Cards
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">
            High-yield, atomic notes to quickly review important coding concepts.
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search revision cards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-[#18181b]/40 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none focus:border-indigo-500/60 transition-all"
          />
        </div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-zinc-800/60">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              activeCategory === cat
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                : "bg-zinc-900/50 border-zinc-800/80 text-zinc-400 hover:border-zinc-700/80 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((rev) => {
          const kp = normalizeKeyPoints(rev.keyPoints);
          const hasCheatsheet = !!CHEATSHEETS[rev.category];
          return (
            <div
              key={rev._id}
              onClick={() => onCardClick(rev)}
              className="bg-[#18181b]/35 border border-zinc-800/80 hover:border-indigo-500/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(99,102,241,0.08)] group relative overflow-hidden cursor-pointer hover:-translate-y-0.5"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/10 transition-all" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/25">
                    {rev.category}
                  </span>
                  {hasCheatsheet ? (
                    <span className="text-[10px] text-indigo-400 font-medium flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                      Cheatsheet <ChevronRight size={11} />
                    </span>
                  ) : (
                    <BookOpen size={16} className="text-zinc-600 group-hover:text-indigo-500 transition-colors" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                  {rev.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">{rev.content}</p>
              </div>
              {kp.length > 0 && (
                <div className="border-t border-zinc-800/60 pt-4 space-y-2">
                  <span className="text-xs font-semibold text-zinc-500 flex items-center gap-1.5">
                    <Sparkles size={12} className="text-amber-400/80" />
                    Key Takeaways
                  </span>
                  <ul className="space-y-1.5">
                    {kp.slice(0, 3).map((point, idx) => (
                      <li key={idx} className="text-xs text-zinc-400 flex items-start gap-1.5">
                        <span className="text-indigo-400 mt-1 flex-shrink-0">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-indigo-400 font-medium flex items-center gap-1">
                {hasCheatsheet ? "Open cheatsheet" : `View all ${rev.category} topics`}
                {" →"}
              </div>
            </div>
          );
        })}

        {visible.length === 0 && (
          <div className="col-span-full py-16 text-center border border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center">
            <AlertCircle size={40} className="text-zinc-700 mb-3" />
            <h3 className="font-semibold text-zinc-400">No Revision Cards</h3>
            <p className="text-sm text-zinc-600 mt-1">No cards matching the active filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Root Module
// ─────────────────────────────────────────────────────────────────────────────
export default function RevisionsModule({ initialSearch }: RevisionsModuleProps) {
  const [revisions, setRevisions] = useState<Revision[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Revision | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get("/modules/revisions");
        setRevisions(res.data.data || []);
      } catch {
        toast.error("Failed to load revision cards.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  // ── Detail: use static cheatsheet if available, else revision fallback ──
  if (selected) {
    const cheatsheet = CHEATSHEETS[selected.category];
    return cheatsheet ? (
      <CheatsheetView data={cheatsheet} onBack={() => setSelected(null)} />
    ) : (
      <RevisionDetailView
        category={selected.category}
        revisions={revisions}
        onBack={() => setSelected(null)}
      />
    );
  }

  return (
    <GridView
      revisions={revisions}
      initialSearch={initialSearch}
      onCardClick={(rev) => setSelected(rev)}
    />
  );
}
