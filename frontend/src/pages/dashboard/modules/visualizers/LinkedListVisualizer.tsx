import { useState } from "react";
import { Link, ArrowRight } from "lucide-react";

interface NodeItem {
  id: number;
  value: string;
  nextId: number | null;
}

export default function LinkedListVisualizer() {
  const [nodes, setNodes] = useState<NodeItem[]>([
    { id: 1, value: "10", nextId: 2 },
    { id: 2, value: "20", nextId: 3 },
    { id: 3, value: "30", nextId: null },
  ]);
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [idCounter, setIdCounter] = useState(4);

  const insertAtHead = () => {
    if (animating) return;
    const value = Math.floor(Math.random() * 90 + 10).toString();
    const newId = idCounter;
    setIdCounter(newId + 1);

    const newNode: NodeItem = {
      id: newId,
      value,
      nextId: nodes.length > 0 ? nodes[0].id : null,
    };

    setNodes((prev) => [newNode, ...prev]);
    setLogs((l) => [...l, `Created node with value: ${value}. Pointed new_node.next -> current_head`]);
  };

  const deleteAtHead = () => {
    if (animating || nodes.length === 0) return;
    const removedValue = nodes[0].value;
    setNodes((prev) => prev.slice(1));
    setLogs((l) => [...l, `Removed head node containing value: ${removedValue}`]);
  };

  const reverseList = async () => {
    if (animating || nodes.length <= 1) return;
    setAnimating(true);
    setLogs((l) => [...l, "Initiating linked list reversal algorithm..."]);

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    
    // We will animate the pointer changes step-by-step
    // Let's copy the nodes array and reverse it logically
    const reversed: NodeItem[] = [];
    const original = [...nodes];
    
    let prev: NodeItem | null = null;
    
    for (let i = 0; i < original.length; i++) {
      const current = original[i];
      setActiveNodeId(current.id);
      setLogs((l) => [...l, `Node [${current.value}]: Re-linking pointer next -> ${prev ? prev.value : "null"}`]);
      
      await delay(1200);
      
      reversed.unshift({
        ...current,
        nextId: prev ? prev.id : null
      });
      prev = current;
    }

    setNodes(reversed);
    setActiveNodeId(null);
    setAnimating(false);
    setLogs((l) => [...l, "Reversal completed! Head node updated."]);
  };

  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h3 className="text-md font-bold text-white flex items-center gap-2">
            <Link size={16} className="text-indigo-400" />
            Linked List Pointer Visualizer
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Add nodes at head, delete them, or run the pointer reversal algorithm.
          </p>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={insertAtHead}
          disabled={animating}
          className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl cursor-pointer transition-all"
        >
          + Insert Node at Head
        </button>
        <button
          onClick={deleteAtHead}
          disabled={animating || nodes.length === 0}
          className="flex-1 py-2 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl cursor-pointer transition-all"
        >
          - Delete Node at Head
        </button>
        <button
          onClick={reverseList}
          disabled={animating || nodes.length <= 1}
          className="flex-1 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl cursor-pointer transition-all"
        >
          🔄 Reverse Pointers
        </button>
      </div>

      {/* Linked list visual node sequence */}
      <div className="flex flex-wrap items-center justify-center gap-y-8 gap-x-4 py-8 bg-zinc-950/20 border border-zinc-850 rounded-xl overflow-x-auto min-h-[140px]">
        <div className="flex items-center space-x-1">
          <span className="text-[10px] uppercase font-bold text-zinc-500">head</span>
          <ArrowRight size={12} className="text-zinc-600" />
        </div>

        {nodes.map((node, index) => {
          const isActive = activeNodeId === node.id;
          return (
            <div key={node.id} className="flex items-center space-x-3">
              {/* Linked list node */}
              <div
                className={`flex border rounded-xl overflow-hidden transition-all duration-300 ${
                  isActive
                    ? "border-violet-500 ring-2 ring-violet-500/20 text-white"
                    : "border-zinc-800 text-zinc-300"
                }`}
              >
                {/* Data area */}
                <div className="p-3 bg-zinc-950 flex flex-col items-center min-w-[44px]">
                  <span className="text-[8px] text-zinc-600 font-bold uppercase">data</span>
                  <span className="text-md font-extrabold font-mono mt-0.5">{node.value}</span>
                </div>
                {/* Pointer area */}
                <div className="p-3 bg-zinc-900 border-l border-zinc-850 flex flex-col items-center justify-center min-w-[40px]">
                  <span className="text-[8px] text-zinc-600 font-bold uppercase">next</span>
                  <span className="text-[10px] font-mono text-zinc-500 mt-1 font-semibold">
                    {node.nextId !== null ? `*ptr` : "null"}
                  </span>
                </div>
              </div>

              {/* Link Arrow */}
              {index < nodes.length - 1 && (
                <div className="flex items-center justify-center text-indigo-500">
                  <ArrowRight size={18} className="animate-pulse" />
                </div>
              )}
            </div>
          );
        })}

        {nodes.length === 0 && (
          <div className="text-zinc-600 italic text-xs py-4">The list is currently empty. Insert some nodes at the head!</div>
        )}
      </div>

      {/* Realtime Event Trace Console */}
      <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Linked List Operation Trace Log</span>
          <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse"></span>
        </div>
        <div className="font-mono text-[10px] text-zinc-400 space-y-1.5 h-20 overflow-y-auto pt-1">
          {logs.map((entry, index) => (
            <div key={index} className="flex gap-2 text-left">
              <span className="text-zinc-600">➔</span>
              <span className={entry.includes("Re-linking") ? "text-violet-400" : ""}>{entry}</span>
            </div>
          ))}
          {logs.length === 0 && (
            <span className="text-zinc-600 italic">Trace logs will be displayed here as operations occur...</span>
          )}
        </div>
      </div>
    </div>
  );
}
