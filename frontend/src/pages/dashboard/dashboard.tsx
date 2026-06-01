import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/shared/store/auth.store";
import toast from "react-hot-toast";
import { LogOut} from "lucide-react";

export default function DashboardPage() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

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
        <div className="w-full max-w-8xl bg-[#18181b]/40 backdrop-blur-xl border border-[#27272a] rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.6)] relative overflow-hidden group hover:border-[#3f3f46] transition-all duration-300">
          
          {/* Card Accent Lights */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/15 transition-all duration-300" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-violet-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-violet-500/15 transition-all duration-300" />

          
        </div>
      </main>
    </div>
  );
}