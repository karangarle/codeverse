import { useState, useEffect } from "react";
import { api } from "@/shared/api/api";
import { Play, Video, Search } from "lucide-react";
import toast from "react-hot-toast";

interface VideoData {
  _id: string;
  title: string;
  videoId: string;
  playlistName: string;
  order: number;
}

export default function YoutubeModule() {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeVideo, setActiveVideo] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const res = await api.get("/modules/videos");
        const list = res.data.data || [];
        setVideos(list);
        if (list.length > 0) {
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

  const filteredVideos = videos.filter(
    (v) =>
      v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.playlistName.toLowerCase().includes(searchTerm.toLowerCase())
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
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
          YouTube Learning Playlists
        </h1>
        <p className="text-zinc-400 mt-2 text-sm">
          Watch hand-picked premium web development playlists directly from CodeVerse.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Playback Container */}
        <div className="lg:col-span-8 space-y-4">
          {activeVideo ? (
            <div className="space-y-4">
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-zinc-800 bg-black shadow-lg">
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
              <div>
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
                  {activeVideo.playlistName}
                </span>
                <h2 className="text-xl font-bold text-white mt-2">{activeVideo.title}</h2>
              </div>
            </div>
          ) : (
            <div className="aspect-video w-full bg-zinc-950/40 border border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-500">
              <Video size={48} className="text-zinc-700 mb-3" />
              <span>Select a video from the list to watch</span>
            </div>
          )}
        </div>

        {/* Playlists sidebar selection */}
        <div className="lg:col-span-4 space-y-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search playlist videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#18181b]/40 border border-zinc-800 focus:border-indigo-500/60 rounded-xl text-xs text-white focus:outline-none transition-all placeholder-zinc-500"
            />
          </div>

          <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
            {filteredVideos.map((video) => {
              const isActive = activeVideo?._id === video._id;
              return (
                <div
                  key={video._id}
                  onClick={() => setActiveVideo(video)}
                  className={`p-3 border rounded-xl flex items-center space-x-3 cursor-pointer transition-all ${
                    isActive
                      ? "bg-indigo-500/10 border-indigo-500/40 text-white"
                      : "bg-[#18181b]/20 border-zinc-800/80 text-zinc-400 hover:border-zinc-700/80"
                  }`}
                >
                  <div className={`p-2 rounded-lg flex-shrink-0 ${isActive ? "bg-indigo-600 text-white" : "bg-zinc-900 border border-zinc-800"}`}>
                    <Play size={12} fill={isActive ? "currentColor" : "none"} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className={`text-xs font-semibold truncate ${isActive ? "text-indigo-300" : "text-white"}`}>
                      {video.title}
                    </h4>
                    <span className="text-[10px] text-zinc-500 truncate block mt-0.5">
                      {video.playlistName}
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredVideos.length === 0 && (
              <div className="text-center text-zinc-500 py-8 text-xs">
                No matching videos found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
