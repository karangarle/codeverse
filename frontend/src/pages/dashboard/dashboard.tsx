import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/shared/store/auth.store";
import { api } from "@/shared/api/api";
import toast from "react-hot-toast";
import { LogOut, User, Mail, Shield, Loader2, Sparkles, Terminal } from "lucide-react";

export default function DashboardPage() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  // SEO Setup
  useEffect(() => {
    document.title = "Dashboard | CodeVerse";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "View your CodeVerse developer dashboard, manage your projects, and review account settings.");
    }
  }, []);

  // Fetch current user details via React Query
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await api.get("/auth/me");
      return response.data.data; // Returns user object {_id, name, email, role}
    },
    retry: 1,
  });

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#09090b] text-[#fafafa] font-sans">
        <Loader2 className="animate-spin text-indigo-500 mb-4" size={40} />
        <p className="text-sm text-[#a1a1aa] tracking-widest uppercase animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (isError) {
    console.error("Failed to load user info:", error);
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#09090b] text-[#fafafa] p-4 font-sans text-center">
        <div className="bg-rose-500/10 border border-rose-500/25 rounded-2xl p-8 max-w-md shadow-2xl">
          <h2 className="text-xl font-bold text-rose-400 mb-2">Failed to Load Profile</h2>
          <p className="text-sm text-[#a1a1aa] mb-6">
            There was an error communicating with the server. Please sign in again.
          </p>
          <button
            onClick={handleLogout}
            className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 rounded-xl text-sm font-semibold transition-all duration-200"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#fafafa] font-sans overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-30%] right-[-10%] w-[80%] h-[80%] rounded-full bg-indigo-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-30%] left-[-10%] w-[80%] h-[80%] rounded-full bg-violet-500/10 blur-[130px] pointer-events-none" />

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-[#27272a]/60 bg-[#09090b]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 font-bold text-sm">
              CV
            </span>
            <span className="font-extrabold tracking-wide bg-gradient-to-r from-[#fafafa] to-[#a1a1aa] bg-clip-text text-transparent">
              CodeVerse
            </span>
          </div>

          <button
            id="logout-btn"
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 border border-[#27272a] hover:border-rose-500/50 hover:bg-rose-950/20 text-sm text-[#a1a1aa] hover:text-rose-400 rounded-xl transition-all duration-200 cursor-pointer"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-2xl bg-[#18181b]/40 backdrop-blur-xl border border-[#27272a] rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.6)] relative overflow-hidden group hover:border-[#3f3f46] transition-all duration-300">
          
          {/* Card Accent Lights */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/15 transition-all duration-300" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-violet-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-violet-500/15 transition-all duration-300" />

          {/* User Welcome Block */}
          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8 mb-8 pb-8 border-b border-[#27272a]">
            {/* Avatar */}
            <div className="relative mb-4 md:mb-0">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg border border-indigo-400/20">
                <User size={40} className="text-[#fafafa]" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#18181b]"></span>
              </span>
            </div>

            {/* Profile Info */}
            <div className="text-center md:text-left flex-1 space-y-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-xs font-semibold">
                <Sparkles size={12} />
                <span>Developer Console</span>
              </div>
              <h2 className="text-3xl font-black tracking-tight text-[#fafafa]">
                Welcome, {user?.name || "Developer"}!
              </h2>
              <p className="text-sm text-[#a1a1aa]">
                Successfully authenticated and logged into the CodeVerse console.
              </p>
            </div>
          </div>

          {/* User Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Email card */}
            <div className="flex items-center space-x-4 bg-[#09090b]/60 border border-[#27272a] rounded-2xl p-4.5 transition-all duration-200 hover:bg-[#09090b]/80 hover:border-[#3f3f46]">
              <div className="p-3 bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-xl">
                <Mail size={20} />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#71717a]">Email Address</span>
                <p className="text-sm font-semibold text-[#e4e4e7]">{user?.email}</p>
              </div>
            </div>

            {/* Role card */}
            <div className="flex items-center space-x-4 bg-[#09090b]/60 border border-[#27272a] rounded-2xl p-4.5 transition-all duration-200 hover:bg-[#09090b]/80 hover:border-[#3f3f46]">
              <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
                <Shield size={20} />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#71717a]">System Access</span>
                <p className="text-sm font-semibold text-[#e4e4e7] capitalize">{user?.role || "User"}</p>
              </div>
            </div>

          </div>

          {/* Dev Terminal Graphic */}
          <div className="mt-8 bg-[#09090b]/90 border border-[#27272a] rounded-2xl p-5 font-mono text-xs text-[#a1a1aa] space-y-2">
            <div className="flex items-center space-x-2 border-b border-[#27272a] pb-2 mb-2">
              <Terminal size={14} className="text-indigo-400" />
              <span className="font-bold text-[#fafafa]">terminal@codeverse:~</span>
            </div>
            <p><span className="text-indigo-400">$</span> fetch_user_meta --id {user?._id}</p>
            <p className="text-emerald-400">✓ Meta fetch complete. Status: 200 OK</p>
            <p><span className="text-[#e4e4e7]">User Node:</span> <span className="text-violet-400">"{user?.name?.toLowerCase().replace(/\s+/g, "_")}"</span></p>
          </div>
        </div>
      </main>
    </div>
  );
}