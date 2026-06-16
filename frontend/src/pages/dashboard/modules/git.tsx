import { useState, useEffect } from "react";
import { api } from "@/shared/api/api";
import { Search, ClipboardList, Check, Terminal } from "lucide-react";
import toast from "react-hot-toast";

interface GitCommand {
  _id: string;
  command: string;
  description: string;
  category: string;
  example?: string;
}

export default function GitModule() {
  const [commands, setCommands] = useState<GitCommand[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        setLoading(true);
        const res = await api.get("/modules/git-commands");
        setCommands(res.data.data || []);
      } catch (err) {
        toast.error("Failed to load Git commands.");
      } finally {
        setLoading(false);
      }
    };
    fetchCommands();
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Command copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = ["All", ...new Set(commands.map((c) => c.category))];

  const filteredCommands = commands.filter((c) => {
    const matchCategory = activeCategory === "All" || c.category === activeCategory;
    const matchSearch =
      c.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
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
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Git Commands Cheat Sheet
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">
            Quick reference for essential Git commands and terminal workflows.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search commands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#18181b]/40 border border-zinc-800 focus:border-indigo-500/60 rounded-xl text-sm text-white focus:outline-none transition-all placeholder-zinc-500"
          />
        </div>
      </div>

      {/* Category selector */}
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

      {/* Commands List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCommands.map((cmd) => (
          <div
            key={cmd._id}
            className="bg-[#18181b]/35 border border-zinc-800/80 hover:border-zinc-700/80 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:shadow-[0_0_20px_rgba(0,0,0,0.4)] group transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 font-medium">
                  {cmd.category}
                </span>
                <Terminal size={14} className="text-zinc-600" />
              </div>
              <p className="text-zinc-300 text-sm">{cmd.description}</p>
            </div>

            {/* Command Copy block */}
            <div className="flex items-center justify-between gap-3 p-3 bg-black/40 border border-zinc-800/60 rounded-xl font-mono text-xs md:text-sm text-indigo-300 relative overflow-hidden group-hover:border-zinc-700/40">
              <span className="truncate">{cmd.example || cmd.command}</span>
              <button
                onClick={() => copyToClipboard(cmd.example || cmd.command, cmd._id)}
                className="p-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                {copiedId === cmd._id ? <Check className="text-emerald-400" size={14} /> : <ClipboardList size={14} />}
              </button>
            </div>
          </div>
        ))}

        {filteredCommands.length === 0 && (
          <div className="col-span-full py-16 text-center text-zinc-500 border border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center">
            <ClipboardList size={40} className="text-zinc-700 mb-3" />
            <h3 className="font-semibold text-zinc-400">No Commands Found</h3>
            <p className="text-sm text-zinc-600 mt-1">
              No Git commands match your active query.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
