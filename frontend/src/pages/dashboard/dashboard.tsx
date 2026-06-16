import { lazy, Suspense, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/shared/store/auth.store";
import { api } from "@/shared/api/api";
import toast from "react-hot-toast";
import {
  LogOut,
  BookOpen,
  Zap,
  HelpCircle,
  Terminal,
  FileCode2,
  Server,
  FileText,
  Video,
  Award,
  TrendingUp,
  Menu,
  Search,
  X
} from "lucide-react";

// Module views
const CoursesModule = lazy(() => import("./modules/courses"));
const RevisionsModule = lazy(() => import("./modules/revisions"));
const InterviewsModule = lazy(() => import("./modules/interviews"));
const GitModule = lazy(() => import("./modules/git"));
const MernSetupModule = lazy(() => import("./modules/mern-setup"));
const DeploymentModule = lazy(() => import("./modules/deployment"));
const PdfsModule = lazy(() => import("./modules/pdfs"));
const YoutubeModule = lazy(() => import("./modules/youtube"));
const ResumeModule = lazy(() => import("./modules/resume"));
const AdminModule = lazy(() => import("./modules/admin"));

type Tab =
  | "courses"
  | "revisions"
  | "interviews"
  | "git"
  | "mern-setup"
  | "deployment"
  | "pdfs"
  | "youtube"
  | "resume"
  | "admin";

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  tab: Tab;
  kind: string;
}

const getText = (value: unknown) => {
  return typeof value === "string" ? value : "";
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const { logout, user, token } = useAuthStore();
  const [activeTab, setActiveTab] = useState<Tab>("courses");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState("");
  const [searchItems, setSearchItems] = useState<SearchItem[]>([]);
  const [selectedSearchItem, setSelectedSearchItem] =
    useState<SearchItem | null>(null);

  // Guard: if not authenticated, redirect to login
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!token) return;

    const loadSearchIndex = async () => {
      try {
        const [
          coursesResponse,
          topicsResponse,
          revisionsResponse,
          interviewsResponse,
          gitResponse,
          pdfsResponse,
          videosResponse,
        ] = await Promise.all([
          api.get("/courses"),
          api.get("/course-topics"),
          api.get("/modules/revisions"),
          api.get("/modules/interviews"),
          api.get("/modules/git-commands"),
          api.get("/modules/pdfs"),
          api.get("/modules/videos"),
        ]);

        const courses = coursesResponse.data.data || [];
        const topics = topicsResponse.data.data || [];
        const revisions = revisionsResponse.data.data || [];
        const interviews = interviewsResponse.data.data || [];
        const gitCommands = gitResponse.data.data || [];
        const pdfs = pdfsResponse.data.data || [];
        const videos = videosResponse.data.data || [];

        setSearchItems([
          ...courses.map((item: Record<string, unknown>) => ({
            id: getText(item._id),
            title: getText(item.title),
            subtitle: "Course",
            tab: "courses" as Tab,
            kind: "course",
          })),
          ...topics.map((item: Record<string, unknown>) => ({
            id: getText(item._id),
            title: getText(item.title),
            subtitle: "Course topic",
            tab: "courses" as Tab,
            kind: "topic",
          })),
          ...revisions.map((item: Record<string, unknown>) => ({
            id: getText(item._id),
            title: getText(item.title),
            subtitle: `Revision - ${getText(item.category)}`,
            tab: "revisions" as Tab,
            kind: "revision",
          })),
          ...interviews.map((item: Record<string, unknown>) => ({
            id: getText(item._id),
            title: getText(item.question),
            subtitle: `Interview - ${getText(item.category)}`,
            tab: "interviews" as Tab,
            kind: "interview",
          })),
          ...gitCommands.map((item: Record<string, unknown>) => ({
            id: getText(item._id),
            title: getText(item.command),
            subtitle: `Git - ${getText(item.category)}`,
            tab: "git" as Tab,
            kind: "git-command",
          })),
          ...pdfs.map((item: Record<string, unknown>) => ({
            id: getText(item._id),
            title: getText(item.title),
            subtitle: `PDF - ${getText(item.category)}`,
            tab: "pdfs" as Tab,
            kind: "pdf",
          })),
          ...videos.map((item: Record<string, unknown>) => ({
            id: getText(item._id),
            title: getText(item.title),
            subtitle: `Video - ${getText(item.playlistName)}`,
            tab: "youtube" as Tab,
            kind: "video",
          })),
        ]);
      } catch {
        setSearchItems([]);
      }
    };

    loadSearchIndex();
  }, [token]);

  const filteredSearchItems = useMemo(() => {
    const query = quickSearch.trim().toLowerCase();

    if (!query) return [];

    return searchItems
      .filter((item) =>
        `${item.title} ${item.subtitle}`.toLowerCase().includes(query)
      )
      .slice(0, 8);
  }, [quickSearch, searchItems]);

  const openSearchItem = (item: SearchItem) => {
    setActiveTab(item.tab);
    setSelectedSearchItem(item);
    setQuickSearch("");
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const navItems = [
    { id: "courses", label: "Learning Tracker", icon: BookOpen },
    { id: "revisions", label: "Quick Revisions", icon: Zap },
    { id: "interviews", label: "Interview Q&A", icon: HelpCircle },
    { id: "git", label: "Git Commands", icon: Terminal },
    { id: "mern-setup", label: "MERN Setup", icon: FileCode2 },
    { id: "deployment", label: "Deployment Guides", icon: Server },
    { id: "pdfs", label: "PDF Downloads", icon: FileText },
    { id: "youtube", label: "YouTube Playlists", icon: Video },
    { id: "resume", label: "Resume Builder", icon: Award },
  ];

  const renderQuickSearchBox = () => (
    <div className="relative">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
      <input
        value={quickSearch}
        onChange={(event) => setQuickSearch(event.target.value)}
        placeholder="Search references..."
        className="w-full rounded-xl border border-zinc-800 bg-zinc-950/60 py-2.5 pl-9 pr-3 text-xs text-white outline-none transition focus:border-indigo-500/60"
      />

      {filteredSearchItems.length > 0 && (
        <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl">
          {filteredSearchItems.map((item) => (
            <button
              key={`${item.tab}-${item.id}`}
              onClick={() => openSearchItem(item)}
              className="block w-full border-b border-zinc-900 px-3 py-2.5 text-left last:border-b-0 hover:bg-zinc-900"
            >
              <span className="block truncate text-xs font-semibold text-white">
                {item.title}
              </span>
              <span className="mt-0.5 block truncate text-[10px] text-zinc-500">
                {item.subtitle}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  // Admin tab is only visible to admin users
  if (user?.role === "admin") {
    navItems.push({ id: "admin", label: "Admin Analytics", icon: TrendingUp });
  }

  const renderActiveModule = () => {
    switch (activeTab) {
      case "courses":
        return <CoursesModule searchTarget={selectedSearchItem} />;
      case "revisions":
        return <RevisionsModule initialSearch={selectedSearchItem?.title} />;
      case "interviews":
        return <InterviewsModule initialSearch={selectedSearchItem?.title} />;
      case "git":
        return <GitModule initialSearch={selectedSearchItem?.title} />;
      case "mern-setup":
        return <MernSetupModule />;
      case "deployment":
        return <DeploymentModule />;
      case "pdfs":
        return <PdfsModule initialSearch={selectedSearchItem?.title} />;
      case "youtube":
        return (
          <YoutubeModule
            activeVideoId={selectedSearchItem?.id}
            initialSearch={selectedSearchItem?.title}
          />
        );
      case "resume":
        return <ResumeModule />;
      case "admin":
        return <AdminModule />;
      default:
        return <CoursesModule searchTarget={selectedSearchItem} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#fafafa] font-sans flex overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#09090b]/80 border-r border-[#27272a]/60 backdrop-blur-md z-30 h-screen sticky top-0 flex-shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-[#27272a]/40 space-x-2.5">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 font-bold text-sm">
            CV
          </span>
          <span className="font-extrabold tracking-wide bg-gradient-to-r from-[#fafafa] to-[#a1a1aa] bg-clip-text text-transparent">
            CodeVerse
          </span>
        </div>

        <div className="px-4 pt-4">
          {renderQuickSearchBox()}
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as Tab);
                  setSelectedSearchItem(null);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-indigo-600 border border-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                    : "text-[#a1a1aa] hover:text-white hover:bg-[#18181b]/40 border border-transparent"
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User profile details & Logout */}
        <div className="p-4 border-t border-[#27272a]/40 bg-zinc-950/20 flex flex-col space-y-3">
          <div className="px-2">
            <span className="text-xs font-bold text-white block truncate">{user?.name || "User"}</span>
            <span className="text-[10px] text-zinc-500 block truncate">{user?.email}</span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 border border-[#27272a] hover:border-rose-500/50 hover:bg-rose-950/20 text-xs text-[#a1a1aa] hover:text-rose-400 rounded-xl transition-all cursor-pointer"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header Menu Bar */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <header className="md:hidden sticky top-0 z-40 w-full border-b border-[#27272a]/60 bg-[#09090b]/80 backdrop-blur-md h-16 flex items-center justify-between px-6">
          <div className="flex items-center space-x-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 font-bold text-xs">
              CV
            </span>
            <span className="font-extrabold tracking-wide text-white text-sm">
              CodeVerse
            </span>
          </div>

          <div className="mx-4 hidden flex-1 sm:block">
            {renderQuickSearchBox()}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 border border-[#27272a] rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        {/* Mobile Navigation Drawer overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-[#09090b]/95 flex flex-col p-6 space-y-6">
            <div className="flex justify-between items-center">
              <span className="font-extrabold text-white text-lg">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 border border-[#27272a] rounded-lg text-zinc-400 hover:text-white cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 space-y-2 overflow-y-auto">
              <div className="mb-4">
                {renderQuickSearchBox()}
              </div>

              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as Tab);
                      setSelectedSearchItem(null);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-indigo-600 text-white"
                        : "text-[#a1a1aa] hover:text-white hover:bg-[#18181b]/40"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="border-t border-zinc-800 pt-4 space-y-4">
              <div className="px-2">
                <span className="text-sm font-bold text-white block">{user?.name}</span>
                <span className="text-xs text-zinc-500 block truncate mt-0.5">{user?.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-[#27272a] text-zinc-400 hover:text-rose-400 rounded-xl cursor-pointer"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Dashboard Panel Page Content */}
        <main className="flex-1 overflow-y-auto px-6 py-8 md:p-10 max-w-7xl w-full mx-auto">
          <Suspense
            fallback={
              <div className="flex min-h-[360px] items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500/30 border-t-indigo-500" />
              </div>
            }
          >
            {renderActiveModule()}
          </Suspense>
        </main>
      </div>
    </div>
  );
}
