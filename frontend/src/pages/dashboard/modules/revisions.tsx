import { useState, useEffect } from "react";
import { api } from "@/shared/api/api";
import { BookOpen, Sparkles, AlertCircle, Search } from "lucide-react";
import toast from "react-hot-toast";

interface Revision {
  _id: string;
  title: string;
  category: string;
  content: string;
  keyPoints: string[];
}

interface RevisionsModuleProps {
  initialSearch?: string;
}

export default function RevisionsModule({ initialSearch }: RevisionsModuleProps) {
  const [revisions, setRevisions] = useState<Revision[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevisions = async () => {
      try {
        setLoading(true);
        const res = await api.get("/modules/revisions");
        setRevisions(res.data.data || []);
      } catch (err) {
        toast.error("Failed to load revision cards.");
      } finally {
        setLoading(false);
      }
    };
    fetchRevisions();
  }, []);

  useEffect(() => {
    if (initialSearch) {
      setSearchTerm(initialSearch);
      setActiveCategory("All");
    }
  }, [initialSearch]);

  const categories = ["All", ...new Set(revisions.map((r) => r.category))];

  const filteredRevisions =
    activeCategory === "All"
      ? revisions
      : revisions.filter((r) => r.category === activeCategory);

  const visibleRevisions = filteredRevisions.filter((revision) => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return true;

    return `${revision.title} ${revision.category} ${revision.content}`
      .toLowerCase()
      .includes(query);
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

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
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-[#18181b]/40 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-indigo-500/60"
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

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleRevisions.map((rev) => (
          <div
            key={rev._id}
            className="bg-[#18181b]/35 border border-zinc-800/80 hover:border-indigo-500/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(99,102,241,0.05)] group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/10 transition-all duration-300" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/25">
                  {rev.category}
                </span>
                <BookOpen size={16} className="text-zinc-600" />
              </div>

              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                {rev.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {rev.content}
              </p>
            </div>

            {/* Key takeaways list */}
            {rev.keyPoints && rev.keyPoints.length > 0 && (
              <div className="border-t border-zinc-800/60 pt-4 space-y-2">
                <span className="text-xs font-semibold text-zinc-500 flex items-center gap-1.5">
                  <Sparkles size={12} className="text-amber-400/80" />
                  Key Takeaways
                </span>
                <ul className="space-y-1.5">
                  {rev.keyPoints.map((point, idx) => (
                    <li key={idx} className="text-xs text-zinc-400 flex items-start gap-1.5">
                      <span className="text-indigo-400 mt-1 flex-shrink-0">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        {visibleRevisions.length === 0 && (
          <div className="col-span-full py-16 text-center text-zinc-500 border border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center">
            <AlertCircle size={40} className="text-zinc-700 mb-3" />
            <h3 className="font-semibold text-zinc-400">No Revision Cards</h3>
            <p className="text-sm text-zinc-600 mt-1">
              There are no revision cards matching the active filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
