import { useState, useEffect } from "react";
import { api } from "@/shared/api/api";
import { Download, FileText, ExternalLink, Search } from "lucide-react";
import toast from "react-hot-toast";

interface PdfResource {
  _id: string;
  title: string;
  description: string;
  pdfUrl: string;
  category: string;
}

export default function PdfsModule() {
  const [pdfs, setPdfs] = useState<PdfResource[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        setLoading(true);
        const res = await api.get("/modules/pdfs");
        setPdfs(res.data.data || []);
      } catch (err) {
        toast.error("Failed to load PDF resources.");
      } finally {
        setLoading(false);
      }
    };
    fetchPdfs();
  }, []);

  const filteredPdfs = pdfs.filter(
    (pdf) =>
      pdf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pdf.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            Study Guides & Reference Sheets
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">
            Download curated PDFs to read and study offline.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search guides..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#18181b]/40 border border-zinc-800 focus:border-indigo-500/60 rounded-xl text-sm text-white focus:outline-none transition-all placeholder-zinc-500"
          />
        </div>
      </div>

      {/* PDF Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPdfs.map((pdf) => (
          <div
            key={pdf._id}
            className="bg-[#18181b]/35 border border-zinc-800/80 hover:border-zinc-700/80 rounded-2xl p-6 flex flex-col justify-between hover:shadow-[0_0_20px_rgba(0,0,0,0.4)] group transition-all"
          >
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl">
                  <FileText size={20} />
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 font-medium">
                  {pdf.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                {pdf.title}
              </h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-6">
                {pdf.description}
              </p>
            </div>

            <a
              href={pdf.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-sm font-semibold text-zinc-200 hover:text-white rounded-xl transition-all flex items-center justify-center space-x-2 group-hover:border-zinc-700/50 cursor-pointer"
            >
              <Download size={14} />
              <span>Download PDF</span>
              <ExternalLink size={12} className="opacity-60" />
            </a>
          </div>
        ))}

        {filteredPdfs.length === 0 && (
          <div className="col-span-full py-16 text-center text-zinc-500 border border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center">
            <FileText size={40} className="text-zinc-700 mb-3" />
            <h3 className="font-semibold text-zinc-400">No PDFs Found</h3>
            <p className="text-sm text-zinc-600 mt-1">
              There are no study guides matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
