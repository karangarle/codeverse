import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/shared/store/auth.store";
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
  X
} from "lucide-react";

// Module views
import CoursesModule from "./modules/courses";
import RevisionsModule from "./modules/revisions";
import InterviewsModule from "./modules/interviews";
import GitModule from "./modules/git";
import MernSetupModule from "./modules/mern-setup";
import DeploymentModule from "./modules/deployment";
import PdfsModule from "./modules/pdfs";
import YoutubeModule from "./modules/youtube";
import ResumeModule from "./modules/resume";
import AdminModule from "./modules/admin";

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

export default function DashboardPage() {
  const navigate = useNavigate();
  const { logout, user, token } = useAuthStore();
  const [activeTab, setActiveTab] = useState<Tab>("courses");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Guard: if not authenticated, redirect to login
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

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
    { id: "mern-setup", label: "MERN Setup Setup", icon: FileCode2 },
    { id: "deployment", label: "Deployment Guides", icon: Server },
    { id: "pdfs", label: "PDF Downloads", icon: FileText },
    { id: "youtube", label: "YouTube Playlists", icon: Video },
    { id: "resume", label: "Resume Builder", icon: Award },
  ];

  // Admin tab is only visible to admin users
  if (user?.role === "admin") {
    navItems.push({ id: "admin", label: "Admin Analytics", icon: TrendingUp });
  }

  const renderActiveModule = () => {
    switch (activeTab) {
      case "courses":
        return <CoursesModule />;
      case "revisions":
        return <RevisionsModule />;
      case "interviews":
        return <InterviewsModule />;
      case "git":
        return <GitModule />;
      case "mern-setup":
        return <MernSetupModule />;
      case "deployment":
        return <DeploymentModule />;
      case "pdfs":
        return <PdfsModule />;
      case "youtube":
        return <YoutubeModule />;
      case "resume":
        return <ResumeModule />;
      case "admin":
        return <AdminModule />;
      default:
        return <CoursesModule />;
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

        {/* Sidebar Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
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

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 border border-[#27272a] rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        {/* Mobile Navigation Drawer overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-45 bg-[#09090b]/95 flex flex-col p-6 space-y-6">
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
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as Tab);
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
          {renderActiveModule()}
        </main>
      </div>
    </div>
  );
}