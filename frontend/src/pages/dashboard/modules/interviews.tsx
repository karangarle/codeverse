import { useState, useEffect } from "react";
import { api } from "@/shared/api/api";
import { Search, ChevronDown, ChevronUp, HelpCircle, Sparkles, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";

interface InterviewQuestion {
  _id: string;
  question: string;
  answer: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
}

const CodeBlock = ({ code, lang }: { code: string; lang: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-5 rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d0f] shadow-lg">
      <div className="flex items-center justify-between px-4 py-2 bg-[#18181b] border-b border-zinc-800/80">
        <span className="text-xs text-zinc-500 font-mono lowercase">{lang || 'text'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          <span className={copied ? "text-emerald-400 font-medium" : ""}>{copied ? 'Copied!' : 'Copy code'}</span>
        </button>
      </div>
      <div className="p-4 overflow-x-auto custom-scrollbar">
        <pre className="text-[13px] font-mono text-zinc-300 leading-relaxed">
          <code>{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
};

const MarkdownText = ({ content }: { content: string }) => {
  const parts = content.split(/```(\w+)?\n([\s\S]*?)```/g);
  
  return (
    <div className="whitespace-pre-wrap text-zinc-300 text-sm md:text-base leading-relaxed">
      {parts.map((part, index) => {
        if (index % 3 === 0) {
          const boldParts = part.split(/\*\*(.*?)\*\*/g);
          return (
            <span key={index}>
              {boldParts.map((bp, i) => 
                i % 2 === 1 ? <strong key={i} className="text-indigo-100 font-bold bg-indigo-500/10 px-1 py-0.5 rounded">{bp}</strong> : bp
              )}
            </span>
          );
        } else if (index % 3 === 1) {
          return null;
        } else {
          const lang = parts[index - 1] || 'text';
          return <CodeBlock key={index} code={part} lang={lang} />;
        }
      })}
    </div>
  );
};

interface InterviewsModuleProps {
  initialSearch?: string;
}

export default function InterviewsModule({ initialSearch }: InterviewsModuleProps) {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await api.get("/modules/interviews");
        setQuestions(res.data.data || []);
      } catch (err) {
        toast.error("Failed to load interview questions.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (initialSearch) {
      setSearchTerm(initialSearch);
      setActiveCategory("All");
    }
  }, [initialSearch]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const categoryOrder = [
    "JavaScript",
    "React",
    "React Advanced",
    "React Architecture",
    "Node & Express",
    "Node.js Deep Dive",
    "MongoDB",
    "MongoDB Advanced",
    "MERN Basics",
    "Security",
    "System Design & Architecture"
  ];

  const rawCategories = Array.from(new Set(questions.map((q) => q.category)));
  rawCategories.sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const categories = ["All", ...rawCategories];

  // Filtering and Sorting
  const filteredQuestions = questions
    .filter((q) => {
      const matchCategory = activeCategory === "All" || q.category === activeCategory;
      const matchSearch =
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      const indexA = categoryOrder.indexOf(a.category);
      const indexB = categoryOrder.indexOf(b.category);
      
      if (indexA === -1 && indexB === -1) return a.category.localeCompare(b.category);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "medium":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "hard":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Interview Questions
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">
            Prepare for technical interviews with curated MERN and frontend questions.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-80">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search questions or answers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#18181b]/40 border border-zinc-800 focus:border-indigo-500/60 rounded-xl text-sm text-white focus:outline-none transition-all placeholder-zinc-500"
          />
        </div>
      </div>

      {/* Categories Selector */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-zinc-800/60">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              activeCategory === category
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                : "bg-zinc-900/50 border-zinc-800/80 text-zinc-400 hover:border-zinc-700/80 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Questions Accordion */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const isExpanded = expandedId === q._id;
          return (
            <div
              key={q._id}
              className="bg-[#18181b]/35 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-zinc-700/50 transition-all"
            >
              {/* Question Header Row */}
              <div
                onClick={() => toggleExpand(q._id)}
                className="p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-start space-x-3.5 flex-1">
                  <HelpCircle size={20} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-white text-sm md:text-base leading-relaxed">
                      {q.question}
                    </h3>
                    <div className="flex items-center space-x-2.5 mt-2">
                      <span className="text-xs px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 font-medium">
                        {q.category}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-md border font-semibold uppercase tracking-wider ${getDifficultyColor(
                          q.difficulty
                        )}`}
                      >
                        {q.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-zinc-500 bg-zinc-900/80 p-2 rounded-xl border border-zinc-800/60 hover:text-white transition-colors flex-shrink-0">
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {/* Answer Panel */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-zinc-800/60 bg-zinc-900/15 animate-slideDown">
                  <div className="flex items-start space-x-3 text-zinc-300 text-sm md:text-base leading-relaxed">
                    <Sparkles size={18} className="text-amber-400/80 mt-1 flex-shrink-0" />
                    <div className="prose prose-invert max-w-none w-full">
                      <MarkdownText content={q.answer} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredQuestions.length === 0 && (
          <div className="py-16 text-center text-zinc-500 border border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center">
            <HelpCircle size={40} className="text-zinc-700 mb-3" />
            <h3 className="font-semibold text-zinc-400">No Questions Found</h3>
            <p className="text-sm text-zinc-600 mt-1">
              Try adjusting your filters or search keywords.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
