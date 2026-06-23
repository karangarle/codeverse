import { useState } from "react";
import { Grid } from "lucide-react";

export default function ArrayVisualizer() {
  const arrayData = [12, 99, 37, 42, 58, 77, 83];
  const memoryAddresses = ["0x100", "0x104", "0x108", "0x10C", "0x110", "0x114", "0x118"];
  
  const [activeCell, setActiveCell] = useState<number | null>(null);
  const [searchTarget, setSearchTarget] = useState<number | null>(null);
  const [accessIndex, setAccessIndex] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [complexityText, setComplexityText] = useState("");
  const [executionLog, setExecutionLog] = useState<string[]>([]);

  const runAccessIndex = (index: number) => {
    if (animating) return;
    setAnimating(true);
    setSearchTarget(null);
    setAccessIndex(index);
    setExecutionLog([`Starting O(1) Index Access: arr[${index}]`]);
    setComplexityText("O(1) Constant Time");

    // Simulation of immediate jump
    setTimeout(() => {
      setActiveCell(index);
      setExecutionLog((l) => [
        ...l,
        `Memory lookup: Address = ${memoryAddresses[index]} calculated.`,
        `Jumped directly to address! Value retrieved: ${arrayData[index]}`,
      ]);
      setAnimating(false);
    }, 850);
  };

  const runSearchValue = (value: number) => {
    if (animating) return;
    setAnimating(true);
    setAccessIndex(null);
    setSearchTarget(value);
    setComplexityText("O(N) Linear Time");
    setExecutionLog([`Starting O(N) Linear Search for value: ${value}`]);

    let step = 0;
    const interval = setInterval(() => {
      setActiveCell(step);
      
      if (arrayData[step] === value) {
        setExecutionLog((l) => [
          ...l,
          `Index ${step}: Found target value ${value}!`,
          `Search completed in ${step + 1} steps.`,
        ]);
        clearInterval(interval);
        setAnimating(false);
      } else {
        setExecutionLog((l) => [
          ...l,
          `Index ${step}: Value ${arrayData[step]} != ${value}. Moving to next index.`,
        ]);
        step++;
        if (step >= arrayData.length) {
          setExecutionLog((l) => [...l, `Value ${value} not found in array.`]);
          clearInterval(interval);
          setAnimating(false);
        }
      }
    }, 700);
  };

  const resetAll = () => {
    setActiveCell(null);
    setSearchTarget(null);
    setAccessIndex(null);
    setComplexityText("");
    setExecutionLog([]);
    setAnimating(false);
  };

  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h3 className="text-md font-bold text-white flex items-center gap-2">
            <Grid size={16} className="text-indigo-400" />
            Array Contiguous Memory Visualizer
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Compare O(1) Index Access vs O(N) Linear Search on a contiguous block of memory cells.
          </p>
        </div>
        <button
          onClick={resetAll}
          className="px-2.5 py-1 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-lg text-[10px] font-semibold cursor-pointer"
        >
          Reset Simulation
        </button>
      </div>

      {/* Grid of memory addresses */}
      <div className="flex flex-wrap items-center justify-center gap-4 py-4">
        {arrayData.map((val, idx) => {
          const isCurrent = activeCell === idx;
          const isFound = searchTarget === val && isCurrent;
          const isAccessed = accessIndex === idx && isCurrent;

          return (
            <div
              key={idx}
              className={`w-20 border rounded-xl p-3 flex flex-col items-center justify-center transition-all duration-300 relative ${
                isFound
                  ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 scale-105"
                  : isAccessed
                  ? "bg-sky-500/10 border-sky-500 text-sky-400 scale-105"
                  : isCurrent
                  ? "bg-indigo-500/15 border-indigo-500 text-indigo-400"
                  : "bg-zinc-950/60 border-zinc-800 text-zinc-400"
              }`}
            >
              {/* Address label */}
              <span className="text-[9px] font-mono text-zinc-600 absolute top-1.5">{memoryAddresses[idx]}</span>
              {/* Value */}
              <span className="text-lg font-bold font-mono mt-2.5 mb-1.5">{val}</span>
              {/* Index label */}
              <span className="text-[9px] font-bold text-zinc-500 absolute bottom-1.5 bg-zinc-900 px-1.5 py-0.5 rounded">
                [{idx}]
              </span>
            </div>
          );
        })}
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Action 1: Access by index */}
        <div className="bg-zinc-950/40 p-4 border border-zinc-850 rounded-xl space-y-3">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block">O(1) Access Elements</span>
          <div className="flex flex-wrap gap-2">
            {[0, 2, 5, 6].map((idx) => (
              <button
                key={idx}
                onClick={() => runAccessIndex(idx)}
                disabled={animating}
                className="px-2.5 py-1.5 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-semibold text-white transition-all disabled:opacity-50 cursor-pointer"
              >
                Access index [{idx}]
              </button>
            ))}
          </div>
        </div>

        {/* Action 2: Search by value */}
        <div className="bg-zinc-950/40 p-4 border border-zinc-850 rounded-xl space-y-3">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block">O(N) Search Values</span>
          <div className="flex flex-wrap gap-2">
            {[12, 42, 83, 100].map((val) => (
              <button
                key={val}
                onClick={() => runSearchValue(val)}
                disabled={animating}
                className="px-2.5 py-1.5 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-semibold text-white transition-all disabled:opacity-50 cursor-pointer"
              >
                Search "{val}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Complexity and Trace Logs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Time Complexity Card */}
        <div className="bg-zinc-950/60 p-4 border border-zinc-800 rounded-xl flex flex-col justify-center items-center text-center">
          <span className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider mb-2">Time Complexity</span>
          <span className="text-md font-bold text-indigo-400 font-mono">
            {complexityText || "Select operation"}
          </span>
          <span className="text-[10px] text-zinc-600 mt-2 leading-relaxed">
            {complexityText.includes("O(1)")
              ? "Offset calculation: address = start_address + index * cell_size. Immediate lookup."
              : complexityText.includes("O(N)")
              ? "Checks element-by-element from the beginning until match is found."
              : "Compare how access is instant while search scales with array size."}
          </span>
        </div>

        {/* Logs */}
        <div className="md:col-span-2 bg-zinc-950 p-4 border border-zinc-850 rounded-xl space-y-2 text-left">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block border-b border-zinc-900 pb-1.5">
            Address Calculation & Search Logs
          </span>
          <div className="font-mono text-[10px] text-zinc-400 space-y-1.5 h-20 overflow-y-auto pt-1">
            {executionLog.map((log, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="text-zinc-600">➔</span>
                <span>{log}</span>
              </div>
            ))}
            {executionLog.length === 0 && (
              <span className="text-zinc-600 italic">No operations executed yet.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
