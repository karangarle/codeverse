import { useState, useEffect } from "react";
import { Server } from "lucide-react";

interface QueueItem {
  id: number;
  label: string;
  type: "sync" | "async";
  stage: "stack" | "libuv" | "queue" | "done";
}

export default function NodeVisualizer() {
  const [callStack, setCallStack] = useState<QueueItem[]>([]);
  const [libuvPool, setLibuvPool] = useState<QueueItem[]>([]);
  const [callbackQueue, setCallbackQueue] = useState<QueueItem[]>([]);
  const [executedLogs, setExecutedLogs] = useState<string[]>([]);
  const [loopActive, setLoopActive] = useState(false);
  const [taskIdCounter, setTaskIdCounter] = useState(1);

  const addSyncTask = () => {
    const id = taskIdCounter;
    setTaskIdCounter(id + 1);
    const task: QueueItem = { id, label: `console.log("Sync Task ${id}")`, type: "sync", stage: "stack" };
    
    setCallStack((stack) => [...stack, task]);
    setExecutedLogs((logs) => [...logs, `[Call Stack] Pushed ${task.label}`]);

    // Sync task executes immediately and pops off
    setTimeout(() => {
      setCallStack((stack) => stack.filter((t) => t.id !== id));
      setExecutedLogs((logs) => [...logs, `[Execution] Sync completed: console.log("Sync Task ${id}")`]);
    }, 1200);
  };

  const addAsyncTask = () => {
    const id = taskIdCounter;
    setTaskIdCounter(id + 1);
    const task: QueueItem = { id, label: `fs.readFile("Async File ${id}")`, type: "async", stage: "stack" };

    setCallStack((stack) => [...stack, task]);
    setExecutedLogs((logs) => [...logs, `[Call Stack] Pushed ${task.label}`]);

    // Offload to Libuv
    setTimeout(() => {
      setCallStack((stack) => stack.filter((t) => t.id !== id));
      setLibuvPool((pool) => [...pool, { ...task, stage: "libuv" }]);
      setExecutedLogs((logs) => [...logs, `[Libuv] Offloaded async file operation ${id} to Thread Pool`]);

      // Complete operation in Libuv and queue the callback
      setTimeout(() => {
        setLibuvPool((pool) => pool.filter((t) => t.id !== id));
        setCallbackQueue((queue) => [...queue, { ...task, label: `callback(File ${id} Data)`, stage: "queue" }]);
        setExecutedLogs((logs) => [...logs, `[Queue] File read ${id} completed. Callback added to Event Queue`]);
      }, 1500);
    }, 1000);
  };

  // Event loop tick check
  useEffect(() => {
    if (callStack.length === 0 && callbackQueue.length > 0) {
      setLoopActive(true);
      const timer = setTimeout(() => {
        // Dequeue first callback to stack
        const nextCallback = callbackQueue[0];
        setCallbackQueue((queue) => queue.slice(1));
        setCallStack([{ ...nextCallback, stage: "stack" }]);
        setExecutedLogs((logs) => [
          ...logs,
          `[Event Loop] Stack empty. Pushed callback: ${nextCallback.label} to stack.`,
        ]);

        // Run the callback
        setTimeout(() => {
          setCallStack([]);
          setExecutedLogs((logs) => [...logs, `[Execution] Callback completed: ${nextCallback.label}`]);
          setLoopActive(false);
        }, 1000);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [callStack, callbackQueue]);

  const clearAll = () => {
    setCallStack([]);
    setLibuvPool([]);
    setCallbackQueue([]);
    setExecutedLogs([]);
    setTaskIdCounter(1);
  };

  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h3 className="text-md font-bold text-white flex items-center gap-2">
            <Server size={16} className="text-indigo-400" />
            Interactive Node.js Event Loop Simulator
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Add synchronous or asynchronous actions and see the event loop process them in real-time.
          </p>
        </div>
        <button
          onClick={clearAll}
          className="px-2.5 py-1 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-lg text-[10px] font-semibold cursor-pointer"
        >
          Clear Grid
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={addSyncTask}
          className="flex-1 min-w-[140px] flex items-center justify-center gap-1.5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl cursor-pointer transition-all shadow-md shadow-indigo-600/10"
        >
          + Add Sync Task (Block)
        </button>
        <button
          onClick={addAsyncTask}
          className="flex-1 min-w-[140px] flex items-center justify-center gap-1.5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-xl cursor-pointer transition-all shadow-md shadow-violet-600/10"
        >
          + Add Async File Read
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Call Stack */}
        <div className="md:col-span-3 bg-zinc-950/40 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between min-h-[160px]">
          <div>
            <h4 className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider mb-2">Call Stack</h4>
            <span className="text-[9px] text-zinc-600 block mb-3">Executes synchronous code</span>
          </div>
          <div className="flex-1 flex flex-col-reverse gap-2 justify-start mt-2">
            {callStack.map((task) => (
              <div
                key={task.id}
                className={`p-2 rounded-lg border font-mono text-[9px] text-left transition-all ${
                  task.type === "sync"
                    ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-400"
                    : "bg-violet-500/10 border-violet-500/30 text-violet-400"
                } animate-pulse`}
              >
                {task.label}
              </div>
            ))}
            {callStack.length === 0 && (
              <div className="h-full flex items-center justify-center text-zinc-700 italic text-[10px]">
                Stack Empty
              </div>
            )}
          </div>
        </div>

        {/* Event Loop Wheel */}
        <div className="md:col-span-3 bg-zinc-950/40 border border-zinc-800 rounded-xl p-4 flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden">
          <h4 className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider absolute top-4 left-4">Event Loop</h4>
          <div className="flex flex-col items-center justify-center gap-3">
            <div
              className={`w-16 h-16 rounded-full border-4 border-dashed flex items-center justify-center ${
                loopActive ? "border-emerald-500 animate-spin text-emerald-400" : "border-zinc-800 text-zinc-600"
              } transition-colors duration-500`}
              style={{ animationDuration: "3s" }}
            >
              <span className="text-[10px] font-extrabold font-mono">Loop</span>
            </div>
            <span className={`text-[9px] font-bold uppercase tracking-wider ${loopActive ? "text-emerald-400" : "text-zinc-600"}`}>
              {loopActive ? "Transferring callback" : "Checking Queue"}
            </span>
          </div>
        </div>

        {/* Libuv Thread Pool */}
        <div className="md:col-span-3 bg-zinc-950/40 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between min-h-[160px]">
          <div>
            <h4 className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider mb-2">Libuv Thread Pool</h4>
            <span className="text-[9px] text-zinc-600 block mb-3">Handles background multi-threaded I/O</span>
          </div>
          <div className="flex-1 flex flex-col gap-2 justify-start mt-2">
            {libuvPool.map((task) => (
              <div
                key={task.id}
                className="p-2 rounded-lg border border-purple-500/20 bg-purple-500/5 text-purple-400 font-mono text-[9px] text-left animate-pulse"
              >
                Thread-1: {task.label}
              </div>
            ))}
            {libuvPool.length === 0 && (
              <div className="h-full flex items-center justify-center text-zinc-700 italic text-[10px]">
                No Background Threads
              </div>
            )}
          </div>
        </div>

        {/* Callback Queue */}
        <div className="md:col-span-3 bg-zinc-950/40 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between min-h-[160px]">
          <div>
            <h4 className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider mb-2">Task/Callback Queue</h4>
            <span className="text-[9px] text-zinc-600 block mb-3">Awaiting stack execution</span>
          </div>
          <div className="flex-1 flex flex-col gap-2 justify-start mt-2">
            {callbackQueue.map((task) => (
              <div
                key={task.id}
                className="p-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 font-mono text-[9px] text-left"
              >
                {task.label}
              </div>
            ))}
            {callbackQueue.length === 0 && (
              <div className="h-full flex items-center justify-center text-zinc-700 italic text-[10px]">
                Queue Empty
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Realtime Event Trace Console */}
      <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Node.js Engine Execution Logs</span>
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
        </div>
        <div className="font-mono text-[10px] text-zinc-400 space-y-1.5 h-28 overflow-y-auto pt-1">
          {executedLogs.map((entry, index) => {
            const isCallStack = entry.includes("[Call Stack]");
            const isLibuv = entry.includes("[Libuv]");
            const isQueue = entry.includes("[Queue]");
            const isLoop = entry.includes("[Event Loop]");
            const isDone = entry.includes("[Execution]");

            return (
              <div key={index} className="flex gap-2 text-left">
                <span className="text-zinc-600 font-bold">[{index + 1}]</span>
                <span
                  className={
                    isCallStack ? "text-indigo-300" :
                    isLibuv ? "text-purple-300" :
                    isQueue ? "text-amber-300" :
                    isLoop ? "text-emerald-400 font-semibold" :
                    isDone ? "text-white font-bold" : "text-zinc-400"
                  }
                >
                  {entry}
                </span>
              </div>
            );
          })}
          {executedLogs.length === 0 && (
            <div className="text-zinc-600 italic">Logs are empty. Run task events to trace engine execution...</div>
          )}
        </div>
      </div>
    </div>
  );
}
