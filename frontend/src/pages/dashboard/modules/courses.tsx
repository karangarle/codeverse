import { useState, useEffect } from "react";
import { CheckCircle2, Circle, BookOpen, Clock, ChevronRight, Copy, Check, Terminal } from "lucide-react";
import toast from "react-hot-toast";
import TopicVisualizer from "./visualizers";
import { staticCourses, staticTopics } from "@/shared/data/staticData";

interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  level: string;
  duration: number;
  order?: number;
}

interface Topic {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  codeSnippet?: string;
  codeLanguage?: string;
  visualizeUrl?: string;
  videoUrl?: string;
  estimatedMinutes?: number;
  order?: number;
  course: {
    _id: string;
    title: string;
  };
}

interface ProgressData {
  completedTopicIds: string[];
  progressPercentage: number;
  totalTopics: number;
}

interface SearchTarget {
  id: string;
  kind: string;
}

interface CoursesModuleProps {
  searchTarget?: SearchTarget | null;
}

const getYouTubeEmbedUrl = (url: string) => {
  if (!url) return "";
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes("youtube.com") && urlObj.pathname === "/watch") {
      const videoId = urlObj.searchParams.get("v");
      const playlistId = urlObj.searchParams.get("list");
      const timeParam = urlObj.searchParams.get("t");
      if (videoId) {
        let embedUrl = `https://www.youtube.com/embed/${videoId}`;
        const params: string[] = [];
        if (playlistId) params.push(`list=${playlistId}`);
        if (timeParam) {
          const seconds = parseInt(timeParam, 10);
          if (!isNaN(seconds)) params.push(`start=${seconds}`);
        }
        if (params.length > 0) embedUrl += `?${params.join("&")}`;
        return embedUrl;
      }
    } else if (urlObj.hostname.includes("youtu.be")) {
      const videoId = urlObj.pathname.slice(1);
      const playlistId = urlObj.searchParams.get("list");
      const timeParam = urlObj.searchParams.get("t");
      if (videoId) {
        let embedUrl = `https://www.youtube.com/embed/${videoId}`;
        const params: string[] = [];
        if (playlistId) params.push(`list=${playlistId}`);
        if (timeParam) {
          const seconds = parseInt(timeParam, 10);
          if (!isNaN(seconds)) params.push(`start=${seconds}`);
        }
        if (params.length > 0) embedUrl += `?${params.join("&")}`;
        return embedUrl;
      }
    }
    return url;
  } catch (e) {
    return url;
  }
};

export default function CoursesModule({ searchTarget }: CoursesModuleProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Load static courses and topics
  useEffect(() => {
    setLoading(true);
    const sortedCourses = [...staticCourses].sort((a: Course, b: Course) => {
      const orderA = typeof a.order === 'number' ? a.order : 0;
      const orderB = typeof b.order === 'number' ? b.order : 0;
      return orderA - orderB;
    });

    setCourses(sortedCourses);
    setTopics(staticTopics);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!searchTarget || loading) return;

    if (searchTarget.kind === "course") {
      const course = courses.find((item) => item._id === searchTarget.id);
      if (course) {
        setSelectedCourse(course);
        setSelectedTopic(null);
      }
      return;
    }

    if (searchTarget.kind === "topic") {
      const topic = topics.find((item) => item._id === searchTarget.id);
      const course = topic
        ? courses.find((item) => item._id === topic.course?._id)
        : null;

      if (topic && course) {
        setSelectedCourse(course);
        setSelectedTopic(topic);
      }
    }
  }, [courses, loading, searchTarget, topics]);

  // Fetch progress locally when course changes
  useEffect(() => {
    if (!selectedCourse) {
      setProgress(null);
      setSelectedTopic(null);
      return;
    }
    
    const courseTopics = staticTopics.filter(t => t.course && t.course._id === selectedCourse._id);
    const totalTopics = courseTopics.length;
    const stored = localStorage.getItem(`progress_${selectedCourse._id}`);
    const completedTopicIds = stored ? JSON.parse(stored) : [];
    const progressPercentage = totalTopics > 0 ? Math.round((completedTopicIds.length / totalTopics) * 100) : 0;

    setProgress({
      completedTopicIds,
      progressPercentage,
      totalTopics
    });
  }, [selectedCourse]);

  const toggleTopic = (topicId: string) => {
    if (!selectedCourse) return;
    
    const courseTopics = staticTopics.filter(t => t.course && t.course._id === selectedCourse._id);
    const totalTopics = courseTopics.length;
    
    const stored = localStorage.getItem(`progress_${selectedCourse._id}`);
    let completedTopicIds = stored ? JSON.parse(stored) : [];
    
    if (completedTopicIds.includes(topicId)) {
      completedTopicIds = completedTopicIds.filter((id: string) => id !== topicId);
      toast.success("Topic marked as incomplete");
    } else {
      completedTopicIds.push(topicId);
      toast.success("Topic completed! Keep it up! 🎉");
    }
    
    localStorage.setItem(`progress_${selectedCourse._id}`, JSON.stringify(completedTopicIds));
    const progressPercentage = totalTopics > 0 ? Math.round((completedTopicIds.length / totalTopics) * 100) : 0;
    
    setProgress({
      completedTopicIds,
      progressPercentage,
      totalTopics
    });
  };

  const filteredTopics = topics
    .filter((t) => t.course && t.course._id === selectedCourse?._id)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

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
      <div>
        <h1 className="text-3xl font-extrabold text-white bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
          {selectedCourse ? selectedCourse.title : "Learning Progress Tracker"}
        </h1>
        <p className="text-zinc-400 mt-2 text-sm md:text-base">
          {selectedCourse
            ? "Track your progress, watch videos, and read topic summaries."
            : "Browse courses and track your topic completion progress."}
        </p>
      </div>

      {!selectedCourse ? (
        // Course Listing Grid
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              onClick={() => setSelectedCourse(course)}
              className="bg-[#18181b]/35 hover:bg-[#18181b]/60 border border-zinc-800/80 hover:border-zinc-700/80 rounded-2xl p-6 cursor-pointer transition-all duration-300 group relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md mb-4 border border-indigo-500/20">
                  {course.level}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-zinc-400 mt-2 text-sm line-clamp-2">
                  {course.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {course.duration} mins
                </span>
                <span className="flex items-center gap-1 text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform">
                  View Course
                  <ChevronRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Course Detail & Learning Path
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Back button and List of Topics */}
          <div className="lg:col-span-5 space-y-4">
            <button
              onClick={() => setSelectedCourse(null)}
              className="px-4 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 text-zinc-300 transition-all cursor-pointer mb-2"
            >
              ← Back to Courses
            </button>

            {/* Progress Card */}
            {progress && (
              <div className="bg-[#18181b]/40 border border-zinc-800 rounded-2xl p-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400 font-medium">Course Progress</span>
                  <span className="text-indigo-400 font-bold">{progress.progressPercentage}%</span>
                </div>
                <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-zinc-800">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progress.progressPercentage}%` }}
                  />
                </div>
                <div className="text-xs text-zinc-500">
                  {progress.completedTopicIds.length} of {progress.totalTopics} topics completed
                </div>
              </div>
            )}

            {/* Topic Cards */}
            <div className="space-y-3">
              {filteredTopics.map((topic) => {
                const isCompleted = progress?.completedTopicIds.includes(topic._id) || false;
                const isSelected = selectedTopic?._id === topic._id;
                return (
                  <div
                    key={topic._id}
                    className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? "bg-indigo-500/10 border-indigo-500/40 text-white"
                        : "bg-[#18181b]/20 border-zinc-800/80 text-zinc-300 hover:border-zinc-700/80"
                    }`}
                    onClick={() => setSelectedTopic(topic)}
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTopic(topic._id);
                        }}
                        className="text-zinc-500 hover:text-indigo-400 transition-colors flex-shrink-0 cursor-pointer"
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="text-emerald-400" size={20} />
                        ) : (
                          <Circle size={20} />
                        )}
                      </button>
                      <div className="truncate">
                        <h4 className="font-semibold text-sm truncate">{topic.title}</h4>
                        <p className="text-xs text-zinc-500 truncate">
                          {topic.estimatedMinutes || 15} mins
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-zinc-600" />
                  </div>
                );
              })}

              {filteredTopics.length === 0 && (
                <div className="text-center text-zinc-500 py-8 text-sm">
                  No topics published for this course yet.
                </div>
              )}
            </div>
          </div>

          {/* Topic Detail Pane */}
          <div className="lg:col-span-7">
            {selectedTopic ? (
              <div className="bg-[#18181b]/30 border border-zinc-800/80 rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedTopic.title}</h2>
                  <p className="text-zinc-400 text-sm mt-2">{selectedTopic.shortDescription}</p>
                </div>

                {/* Video Embed */}
                {selectedTopic.videoUrl && (
                  <div className="aspect-video w-full rounded-xl overflow-hidden border border-zinc-800 bg-black">
                    <iframe
                      width="100%"
                      height="100%"
                      src={getYouTubeEmbedUrl(selectedTopic.videoUrl)}
                      title={selectedTopic.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}

                {/* Content Details */}
                <div className="prose prose-invert max-w-none text-zinc-300 text-sm md:text-base leading-relaxed whitespace-pre-line border-t border-zinc-800/60 pt-6">
                  {selectedTopic.content}
                </div>

                {/* Concept Diagram / Image */}
                {selectedTopic.visualizeUrl && (
                  <div className="space-y-2 border-t border-zinc-800/60 pt-6">
                    <span className="text-xs font-semibold text-zinc-400">Concept Diagram</span>
                    <div className="border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-950/20 p-4 flex justify-center">
                      <img
                        src={selectedTopic.visualizeUrl}
                        alt={`${selectedTopic.title} diagram`}
                        className="max-h-[320px] object-contain rounded-xl hover:scale-[1.01] transition-all duration-300 shadow-md"
                      />
                    </div>
                  </div>
                )}

                {/* Interactive Visual Simulator */}
                <TopicVisualizer slug={selectedTopic.slug} />

                {/* Code Snippet Demonstration */}
                {selectedTopic.codeSnippet && (
                  <div className="space-y-2 border-t border-zinc-800/60 pt-6">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
                        <Terminal size={14} className="text-indigo-400" />
                        Code Demonstration
                      </span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/10">
                        {selectedTopic.codeLanguage || "javascript"}
                      </span>
                    </div>

                    <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-xl font-mono text-xs relative group">
                      {/* Terminal window decoration */}
                      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800/50">
                        <div className="flex gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                        </div>
                        <button
                          onClick={() => handleCopyCode(selectedTopic.codeSnippet || "")}
                          className="p-1.5 rounded-md hover:bg-zinc-850 text-zinc-400 hover:text-white transition-colors cursor-pointer border border-transparent hover:border-zinc-800"
                          title="Copy Code"
                        >
                          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        </button>
                      </div>
                      <pre className="p-4 overflow-x-auto text-left leading-relaxed text-indigo-200/90 bg-zinc-950/40 max-h-[300px]">
                        <code>{selectedTopic.codeSnippet}</code>
                      </pre>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t border-zinc-800/40">
                  <div className="flex items-center space-x-2 text-xs text-zinc-500">
                    <BookOpen size={14} />
                    <span>Estimated: {selectedTopic.estimatedMinutes || 15} mins</span>
                  </div>

                  <button
                    onClick={() => toggleTopic(selectedTopic._id)}
                    className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      progress?.completedTopicIds.includes(selectedTopic._id)
                        ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700/50"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                    }`}
                  >
                    {progress?.completedTopicIds.includes(selectedTopic._id) ? (
                      <>
                        <CheckCircle2 size={16} className="text-emerald-400" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <>
                        <Circle size={16} />
                        <span>Mark as Complete</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[#18181b]/10 border border-dashed border-zinc-800 rounded-2xl p-12 text-center text-zinc-500 min-h-[300px] flex flex-col items-center justify-center">
                <BookOpen size={48} className="text-zinc-700 mb-4" />
                <h3 className="font-semibold text-zinc-400">No Topic Selected</h3>
                <p className="text-sm text-zinc-600 mt-1">
                  Select a topic from the learning path on the left to read and view materials.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
