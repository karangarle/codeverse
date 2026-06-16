import { useState, useEffect } from "react";
import { api } from "@/shared/api/api";
import { Users, GraduationCap, CheckCircle2, TrendingUp, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

interface CourseCompletions {
  title: string;
  count: number;
}

interface AnalyticsData {
  totalUsers: number;
  totalCourses: number;
  totalCompletions: number;
  completionsByCourse: CourseCompletions[];
}

export default function AdminModule() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await api.get("/modules/analytics");
        setData(res.data.data);
      } catch (err: any) {
        toast.error("Failed to load analytics details or access unauthorized.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-16 text-zinc-500 border border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center">
        <AlertTriangle size={40} className="text-rose-500 mb-3" />
        <h3 className="font-semibold text-zinc-400">Access Restricted</h3>
        <p className="text-sm text-zinc-600 mt-1">
          Only users with the admin credentials can view statistical details.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
          Admin Dashboard Analytics
        </h1>
        <p className="text-zinc-400 mt-2 text-sm">
          Platform-wide metrics, active user registrations, and course completions trends.
        </p>
      </div>

      {/* Analytics widgets row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#18181b]/35 border border-zinc-800 p-6 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Total Enrolled Users</span>
            <h3 className="text-3xl font-black text-white mt-1.5">{data.totalUsers}</h3>
          </div>
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl">
            <Users size={24} />
          </div>
        </div>

        <div className="bg-[#18181b]/35 border border-zinc-800 p-6 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Total Platform Courses</span>
            <h3 className="text-3xl font-black text-white mt-1.5">{data.totalCourses}</h3>
          </div>
          <div className="p-3 bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-2xl">
            <GraduationCap size={24} />
          </div>
        </div>

        <div className="bg-[#18181b]/35 border border-zinc-800 p-6 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Topic Completions</span>
            <h3 className="text-3xl font-black text-white mt-1.5">{data.totalCompletions}</h3>
          </div>
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl">
            <CheckCircle2 size={24} />
          </div>
        </div>
      </div>

      {/* Popular Courses details */}
      <div className="bg-[#18181b]/35 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <TrendingUp size={18} className="text-indigo-400" />
          Active Course Completions Distribution
        </h3>

        <div className="space-y-4 pt-2">
          {data.completionsByCourse.map((course, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-zinc-300 font-semibold">{course.title}</span>
                <span className="text-indigo-400 font-bold">{course.count} completions</span>
              </div>
              <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-850">
                <div
                  className="bg-indigo-500 h-full rounded-full"
                  style={{
                    width: `${Math.min((course.count / Math.max(data.totalCompletions, 1)) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          ))}

          {data.completionsByCourse.length === 0 && (
            <div className="text-center text-zinc-600 py-6 text-sm">
              No course completions recorded yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
