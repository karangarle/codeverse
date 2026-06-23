import { useState } from "react";
import { ArrowDown, Code, Smartphone } from "lucide-react";

export default function PropsVisualizer() {
  const [title, setTitle] = useState("Awesome React Course");
  const [level, setLevel] = useState("intermediate");
  const [duration, setDuration] = useState(120);

  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h3 className="text-md font-bold text-white flex items-center gap-2">
            <Smartphone size={16} className="text-indigo-400" />
            Interactive Props Flow Simulator
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Modify values in the Parent Form and watch how they flow down as read-only properties into the Child component.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Parent component input dashboard */}
        <div className="lg:col-span-5 bg-zinc-950/50 border border-zinc-800/80 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Parent Component (&lt;App /&gt;)</span>
            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
          </div>

          <div className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-[10px] text-zinc-500 font-semibold uppercase">Course Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-indigo-500/50 rounded-lg py-1.5 px-3 text-xs text-white outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-zinc-500 font-semibold uppercase">Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-indigo-500/50 rounded-lg py-1.5 px-3 text-xs text-white outline-none"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-zinc-500 font-semibold uppercase">Duration (Minutes)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-indigo-500/50 rounded-lg py-1.5 px-3 text-xs text-white outline-none"
              />
            </div>
          </div>

          {/* Source Code passed to Child */}
          <div className="border-t border-zinc-800/60 pt-4 space-y-2">
            <span className="text-[10px] text-zinc-500 font-semibold uppercase flex items-center gap-1">
              <Code size={10} /> JSX Rendering Call
            </span>
            <pre className="p-3 bg-zinc-900/80 rounded-lg border border-zinc-800 font-mono text-[9px] text-zinc-400 overflow-x-auto leading-relaxed">
{`<CourseCard
  title="${title}"
  level="${level}"
  duration={${duration}}
/>`}
            </pre>
          </div>
        </div>

        {/* Visual Connector */}
        <div className="lg:col-span-2 flex flex-row lg:flex-col items-center justify-center text-zinc-600 gap-2">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest rotate-0 lg:-rotate-90 my-2">PROPS FLOW</span>
          <div className="p-2 rounded-full border border-zinc-800 bg-zinc-950/60 flex items-center justify-center animate-bounce">
            <ArrowDown size={14} className="text-indigo-400" />
          </div>
        </div>

        {/* Child component rendering */}
        <div className="lg:col-span-5 bg-zinc-950/50 border border-zinc-800/80 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800/40 mb-4">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Child Component (&lt;CourseCard /&gt;)</span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-500">Read-Only View</span>
            </div>

            {/* Custom rendered card */}
            <div className="p-5 border border-zinc-800/80 bg-zinc-900/40 rounded-xl space-y-4 hover:border-indigo-500/30 transition-all duration-300 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                  level === "beginner" ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/5" :
                  level === "intermediate" ? "text-amber-400 border-amber-500/20 bg-amber-500/5" :
                  "text-rose-400 border-rose-500/20 bg-rose-500/5"
                }`}>
                  {level}
                </span>
                <span className="text-[10px] text-zinc-500 font-semibold">{duration} mins</span>
              </div>
              <h3 className="text-md font-bold text-white leading-snug">{title || "Untitled Course"}</h3>
              <p className="text-[11px] text-zinc-400">
                This component receives parameters as props. Destructuring allows directly reading values of props: title, level, duration.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/40 font-mono text-[9px] text-zinc-500 leading-normal">
            <div>props = &#123;</div>
            <div className="pl-4">title: <span className="text-amber-400">"{title}"</span>,</div>
            <div className="pl-4">level: <span className="text-amber-400">"{level}"</span>,</div>
            <div className="pl-4">duration: <span className="text-purple-400">{duration}</span></div>
            <div>&#125;</div>
          </div>
        </div>
      </div>
    </div>
  );
}
