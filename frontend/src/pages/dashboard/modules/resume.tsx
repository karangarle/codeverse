import { useState } from "react";
import { Check, Sparkles } from "lucide-react";

interface Item {
  id: number;
  label: string;
  category: "formatting" | "sections" | "content";
  tip: string;
}

export default function ResumeModule() {
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  const checkList: Item[] = [
    {
      id: 1,
      label: "One Page Limit",
      category: "formatting",
      tip: "Keep it strictly to 1 page unless you have 5+ years of relevant experience."
    },
    {
      id: 2,
      label: "Contact Links (GitHub, LinkedIn)",
      category: "formatting",
      tip: "Ensure hyperlinks are clickable and link directly to updated profiles."
    },
    {
      id: 3,
      label: "Summary/Objective Statement",
      category: "sections",
      tip: "Include a short 2-3 sentence overview highlighting your core stack (e.g. MERN) and target role."
    },
    {
      id: 4,
      label: "Technical Skills (Grouped)",
      category: "sections",
      tip: "Group skills: Languages (JS, TS), Frameworks (React, Node), Databases (MongoDB)."
    },
    {
      id: 5,
      label: "Projects Section (with Links)",
      category: "sections",
      tip: "Include 2-3 main full-stack projects with GitHub links and hosted links."
    },
    {
      id: 6,
      label: "Use Action Verbs",
      category: "content",
      tip: "Begin bullet points with action verbs: 'Developed', 'Optimized', 'Architected' instead of 'Responsible for'."
    },
    {
      id: 7,
      label: "Quantify Results",
      category: "content",
      tip: "Instead of 'Improved speed', write 'Optimized response latency by 35% through Redis caching'."
    }
  ];

  const handleCheck = (id: number) => {
    setCheckedIds(
      checkedIds.includes(id) ? checkedIds.filter((item) => item !== id) : [...checkedIds, id]
    );
  };

  const percentage = Math.round((checkedIds.length / checkList.length) * 100);

  const getRank = (score: number) => {
    if (score < 40) return { title: "Draft", color: "text-rose-400 bg-rose-500/10 border-rose-500/20" };
    if (score < 80) return { title: "Good", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" };
    return { title: "ATS Ready!", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" };
  };

  const rank = getRank(percentage);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Scorecard */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Resume Optimization Checklist
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">
            Self-assess your resume using criteria designed to pass ATS screening.
          </p>
        </div>

        {/* Scorecard Widget */}
        <div className="bg-[#18181b]/35 border border-zinc-800 rounded-2xl p-5 flex items-center space-x-5 min-w-[240px]">
          <div className="flex-1">
            <span className="text-xs text-zinc-500 font-semibold block">Resume Strength</span>
            <div className="w-full bg-zinc-950 h-2.5 rounded-full mt-2.5 overflow-hidden border border-zinc-850">
              <div
                className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-xl font-black text-white block">{percentage}%</span>
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border mt-1 inline-block ${rank.color}`}>
              {rank.title}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Checklist Container */}
        <div className="lg:col-span-7 space-y-3">
          {checkList.map((item) => {
            const isChecked = checkedIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => handleCheck(item.id)}
                className={`p-4 border rounded-xl flex items-start space-x-3.5 cursor-pointer transition-all select-none ${
                  isChecked
                    ? "bg-indigo-500/5 border-indigo-500/30 text-zinc-300"
                    : "bg-[#18181b]/20 border-zinc-800/80 hover:border-zinc-700/80 text-zinc-400"
                }`}
              >
                <div
                  className={`w-5.5 h-5.5 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                    isChecked
                      ? "bg-indigo-600 border-indigo-500 text-white"
                      : "border-zinc-850 hover:border-zinc-700"
                  }`}
                >
                  {isChecked && <Check size={12} />}
                </div>

                <div className="min-w-0">
                  <h4 className={`text-sm font-semibold leading-relaxed ${isChecked ? "text-zinc-500 line-through" : "text-white"}`}>
                    {item.label}
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1">{item.tip}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tips box side pane */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#18181b]/30 border border-zinc-850 p-6 rounded-2xl relative overflow-hidden space-y-4">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles size={16} className="text-indigo-400" />
              Pro Tips: Project Bullet Format
            </h3>

            <div className="space-y-3.5 text-xs text-zinc-400">
              <p>Structure your projects points using the **X-Y-Z formula**:</p>
              <div className="bg-black/35 p-3.5 border border-zinc-900 rounded-xl font-mono text-zinc-300 leading-relaxed">
                Accomplished <span className="text-emerald-400">[X]</span> as measured by <span className="text-amber-400">[Y]</span>, by doing <span className="text-indigo-400">[Z]</span>.
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-1.5">
                  <span className="text-indigo-400 mt-0.5">•</span>
                  <span>Avoid generic lists of tech tools. Frame them inside user problems and solutions.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-indigo-400 mt-0.5">•</span>
                  <span>Keep descriptions under 3 bullets per project. Keep it punchy!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
