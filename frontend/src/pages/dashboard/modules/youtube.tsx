import { useState, useEffect, useMemo } from "react";
import { api } from "@/shared/api/api";
import {
  Play,
  Video,
  Search,
  Brain,
  Coffee,
  GitBranch,
  Binary,
  Cpu,
  Terminal,
  Database,
  HardDrive,
  Monitor,
  Network,
  Globe,
  Code2,
  Award,
  User,
  Tv,
  ListVideo
} from "lucide-react";
import toast from "react-hot-toast";

interface VideoData {
  _id: string;
  title: string;
  videoId: string;
  playlistName: string;
  channelName: string;
  subject: string;
  description: string;
  order: number;
}

interface YoutubeModuleProps {
  activeVideoId?: string;
  initialSearch?: string;
}

const SUBJECT_ICONS: Record<string, React.ComponentType<any>> = {
  All: Tv,
  Aptitude: Brain,
  Java: Coffee,
  DSA: GitBranch,
  "DSA Fundamentals": Binary,
  OOPs: Cpu,
  Python: Terminal,
  SQL: Database,
  DBMS: HardDrive,
  "Operating System": Monitor,
  "System Design": Network,
  "Computer Networks": Globe,
  "Web Development": Code2,
  "GATE Preparation": Award,
};

export default function YoutubeModule({
  activeVideoId,
  initialSearch,
}: YoutubeModuleProps) {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [activePlaylistName, setActivePlaylistName] = useState<string>("");
  const [activeVideo, setActiveVideo] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const res = await api.get("/modules/videos");
        const list: VideoData[] = res.data.data || [];
        setVideos(list);

        if (list.length > 0) {
          // Find first playlist
          const firstPlay = list[0].playlistName;
          setActivePlaylistName(firstPlay);
          setActiveVideo(list[0]);
        }
      } catch (err) {
        toast.error("Failed to load video playlists.");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    if (initialSearch) {
      setSearchTerm(initialSearch);
    }
  }, [initialSearch]);

  // Jump to specific video if activeVideoId is passed
  useEffect(() => {
    if (!activeVideoId || videos.length === 0) return;

    const video = videos.find((item) => item._id === activeVideoId);
    if (video) {
      setSelectedSubject(video.subject);
      setActivePlaylistName(video.playlistName);
      setActiveVideo(video);
    }
  }, [activeVideoId, videos]);

  // Unique list of subjects with video count
  const subjectsList = useMemo(() => {
    const subjects = Array.from(new Set(videos.map((v) => v.subject))).sort();
    return ["All", ...subjects].map((subj) => {
      const count = subj === "All" ? videos.length : videos.filter((v) => v.subject === subj).length;
      return {
        name: subj,
        count,
        Icon: SUBJECT_ICONS[subj] || Video,
      };
    });
  }, [videos]);

  // Filter videos by subject and search term
  const filteredVideos = useMemo(() => {
    return videos.filter((v) => {
      const matchesSubject = selectedSubject === "All" || v.subject === selectedSubject;
      const matchesSearch =
        v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.playlistName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.channelName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSubject && matchesSearch;
    });
  }, [videos, selectedSubject, searchTerm]);

  // Group filtered videos into playlists
  const playlists = useMemo(() => {
    const map = new Map<string, VideoData[]>();
    filteredVideos.forEach((v) => {
      const list = map.get(v.playlistName) || [];
      list.push(v);
      map.set(v.playlistName, list);
    });

    // Sort playlist videos by order
    map.forEach((list) => {
      list.sort((a, b) => (a.order || 0) - (b.order || 0));
    });

    return Array.from(map.entries()).map(([name, list]) => ({
      playlistName: name,
      channelName: list[0]?.channelName || "Unknown Creator",
      description: list[0]?.description || "",
      subject: list[0]?.subject || "General",
      videos: list,
    }));
  }, [filteredVideos]);

  // When selectedSubject changes, update active playlist to the first one available
  useEffect(() => {
    if (playlists.length > 0) {
      // Find if current active playlist is still in filtered lists
      const exists = playlists.some((p) => p.playlistName === activePlaylistName);
      if (!exists) {
        setActivePlaylistName(playlists[0].playlistName);
        if (playlists[0].videos.length > 0) {
          setActiveVideo(playlists[0].videos[0]);
        }
      }
    } else {
      setActivePlaylistName("");
      setActiveVideo(null);
    }
  }, [selectedSubject, playlists]);

  // Active playlist object helper
  const activePlaylist = useMemo(() => {
    return playlists.find((p) => p.playlistName === activePlaylistName) || null;
  }, [playlists, activePlaylistName]);

  const selectPlaylist = (playlistName: string) => {
    setActivePlaylistName(playlistName);
    const selected = playlists.find((p) => p.playlistName === playlistName);
    if (selected && selected.videos.length > 0) {
      setActiveVideo(selected.videos[0]);
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            YouTube Reference Playlists
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">
            Subject-wise learning tracks and playlists curated by industry professionals.
          </p>
        </div>

        {/* Global Search */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search channels, topics, playlists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#18181b]/40 border border-zinc-800 focus:border-indigo-500/60 rounded-xl text-xs text-white focus:outline-none transition-all placeholder-zinc-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Subject Categories Sidebar */}
        <div className="lg:col-span-3 bg-zinc-950/20 border border-zinc-850 rounded-2xl p-4 flex flex-col max-h-[640px]">
          <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-3 mb-3 shrink-0">
            Subjects Index
          </h3>
          <div className="space-y-1 overflow-y-auto custom-scrollbar pr-2 flex-1">
            {subjectsList.map((subject) => {
              const Icon = subject.Icon;
              const isActive = selectedSubject === subject.name;
              return (
                <button
                  key={subject.name}
                  onClick={() => {
                    setSelectedSubject(subject.name);
                    setSearchTerm("");
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    isActive
                      ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/10"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900 border-transparent"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon size={14} className={isActive ? "text-white" : "text-zinc-500"} />
                    <span className="truncate">{subject.name}</span>
                  </div>
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-md font-bold ${
                    isActive ? "bg-indigo-500 text-white" : "bg-zinc-900 text-zinc-500 border border-zinc-800"
                  }`}>
                    {subject.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Columns: Playback & Active Playlists */}
        <div className="lg:col-span-9 space-y-6">
          {/* Playlist chips for selected subject */}
          {playlists.length > 1 && (
            <div className="flex flex-wrap gap-2 pb-1.5 border-b border-zinc-850">
              {playlists.map((p) => {
                const isActive = activePlaylistName === p.playlistName;
                return (
                  <button
                    key={p.playlistName}
                    onClick={() => selectPlaylist(p.playlistName)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border flex items-center gap-1.5 ${
                      isActive
                        ? "bg-indigo-500/15 border-indigo-500/50 text-indigo-300"
                        : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <ListVideo size={12} />
                    <span>{p.playlistName}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Main workspace layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Playback player pane */}
            <div className="lg:col-span-8 space-y-5">
              {activeVideo ? (
                <div className="space-y-4">
                  <div className="aspect-video w-full rounded-2xl overflow-hidden border border-zinc-800 bg-black shadow-2xl">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${activeVideo.videoId}`}
                      title={activeVideo.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
                        {activeVideo.subject}
                      </span>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/10 flex items-center gap-1">
                        <User size={10} className="text-zinc-500" />
                        {activeVideo.channelName}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-white leading-tight">{activeVideo.title}</h2>
                    {activeVideo.description && (
                      <p className="text-xs text-zinc-400 leading-relaxed bg-zinc-950/20 border border-zinc-850 p-4 rounded-xl whitespace-pre-line text-left">
                        {activeVideo.description}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="aspect-video w-full bg-zinc-950/40 border border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-500">
                  <Video size={48} className="text-zinc-700 mb-3" />
                  <span className="text-xs font-semibold">Select a video from the playlists index to watch</span>
                </div>
              )}
            </div>

            {/* Video checklist pane */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider px-1 block text-left">
                Playlist Curriculum
              </span>

              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
                {activePlaylist ? (
                  activePlaylist.videos.map((video) => {
                    const isActive = activeVideo?._id === video._id;
                    return (
                      <div
                        key={video._id}
                        onClick={() => setActiveVideo(video)}
                        className={`p-3 border rounded-xl flex items-center space-x-3 cursor-pointer transition-all ${
                          isActive
                            ? "bg-indigo-500/10 border-indigo-500/40 text-white"
                            : "bg-[#18181b]/20 border-zinc-850/80 text-zinc-400 hover:border-zinc-700/80"
                        }`}
                      >
                        <div className={`p-2 rounded-lg flex-shrink-0 ${
                          isActive ? "bg-indigo-600 text-white" : "bg-zinc-900 border border-zinc-800"
                        }`}>
                          <Play size={10} fill={isActive ? "currentColor" : "none"} />
                        </div>
                        <div className="min-w-0 flex-1 text-left">
                          <h4 className={`text-xs font-semibold truncate ${isActive ? "text-indigo-300" : "text-white"}`}>
                            {video.title}
                          </h4>
                          <span className="text-[9px] text-zinc-500 block mt-0.5 truncate">
                            Step {video.order || 1} • {video.playlistName}
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center text-zinc-500 py-8 text-xs">
                    No active playlist selected.
                  </div>
                )}

                {playlists.length === 0 && (
                  <div className="text-center text-zinc-500 py-8 text-xs">
                    No matching playlists found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
