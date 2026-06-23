import { useState } from "react";
import { RefreshCw, Play } from "lucide-react";

export default function UseStateVisualizer() {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(1);
  const [flash, setFlash] = useState(false);
  const [log, setLog] = useState<string[]>(["Component Mounted. Initial State: count = 0"]);

  const triggerIncrement = () => {
    // Increment count
    setCount((prev) => {
      const next = prev + 1;
      setLog((l) => [...l.slice(-4), `Button clicked: setCount(${next}) triggered.`]);
      return next;
    });

    // Increment render count
    setRenderCount((prev) => prev + 1);

    // Flash trigger
    setFlash(true);
    setTimeout(() => setFlash(false), 500);

    setTimeout(() => {
      setLog((l) => [...l.slice(-4), `Re-render completed. Virtual DOM diffed & Painted.`]);
    }, 300);
  };

  const resetCount = () => {
    setCount(0);
    setRenderCount(1);
    setLog(["Counter Reset. State set back to 0. Render count reset."]);
  };

  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h3 className="text-md font-bold text-white flex items-center gap-2">
            <RefreshCw size={16} className={`text-indigo-400 ${flash ? "animate-spin" : ""}`} />
            useState Re-Render Simulator
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Click the button to increment state. Trace how state triggers React to update and paint the Virtual DOM.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1: User Action */}
        <div className="bg-zinc-950/50 border border-zinc-800/80 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block mb-3">1. Trigger Action</span>
            <p className="text-xs text-zinc-400 mb-4">
              Clicking the button calls the state setter function `setCount(count + 1)`.
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={triggerIncrement}
              className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl cursor-pointer shadow-lg shadow-indigo-600/10 transition-all active:scale-[0.98]"
            >
              <Play size={14} fill="currentColor" />
              Increment Count
            </button>
            <button
              onClick={resetCount}
              className="w-full py-1.5 border border-zinc-800 hover:border-zinc-700 text-zinc-500 hover:text-white rounded-lg text-xs font-semibold cursor-pointer transition-all"
            >
              Reset State
            </button>
          </div>
        </div>

        {/* Step 2: Hook State Box */}
        <div className="bg-zinc-950/50 border border-zinc-800/80 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden">
          <div className={`absolute inset-0 bg-indigo-600/5 transition-opacity duration-300 pointer-events-none ${flash ? "opacity-100" : "opacity-0"}`} />
          
          <div>
            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block mb-3">2. State Storage</span>
            <p className="text-xs text-zinc-400 mb-4">
              React stores the state value hook-wise inside its fiber tree structure.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-4 border border-zinc-800 bg-zinc-900/50 rounded-2xl relative">
            <span className="text-[10px] font-mono text-zinc-500 absolute top-2 left-2">Hooks Table</span>
            <div className="flex items-baseline gap-2 mt-4 mb-2">
              <span className="text-xs text-zinc-400 font-mono">count:</span>
              <span className={`text-4xl font-extrabold font-mono transition-all duration-300 ${flash ? "text-indigo-400 scale-110" : "text-white"}`}>
                {count}
              </span>
            </div>
            <span className="text-[9px] text-indigo-400 font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
              Active Value
            </span>
          </div>
        </div>

        {/* Step 3: Render Result */}
        <div className="bg-zinc-950/50 border border-zinc-800/80 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block mb-3">3. Rendering Cycle</span>
            <p className="text-xs text-zinc-400 mb-4">
              State change triggers component re-evaluation and paints updates to the real DOM.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-2.5 px-4 bg-zinc-900 border border-zinc-800 rounded-xl">
              <span className="text-xs text-zinc-400 font-medium">Re-Renders:</span>
              <span className={`text-sm font-bold font-mono ${flash ? "text-emerald-400" : "text-white"}`}>
                {renderCount}
              </span>
            </div>
            <div className="flex justify-between items-center py-2.5 px-4 bg-zinc-900 border border-zinc-800 rounded-xl">
              <span className="text-xs text-zinc-400 font-medium">DOM Update:</span>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                flash ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-zinc-850 border-zinc-800 text-zinc-500"
              }`}>
                {flash ? "Painting..." : "Idle"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Log Console Output */}
      <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">React Fiber Lifecycle Logs</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
        </div>
        <div className="font-mono text-[10px] text-zinc-400 space-y-1.5 h-24 overflow-y-auto pt-1">
          {log.map((entry, index) => (
            <div key={index} className="flex gap-2 last:text-indigo-400">
              <span className="text-zinc-600 font-bold">[{index + 1}]</span>
              <span className="flex-1 text-left">{entry}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
