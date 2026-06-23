import { useState } from "react";
import { Play, Sparkles } from "lucide-react";

export default function JsxVisualizer() {
  const [jsxCode, setJsxCode] = useState(
    `<div className="card">\n  <h1>Hello, World!</h1>\n  <p>React is awesome</p>\n</div>`
  );
  const [compiledCode, setCompiledCode] = useState("");
  const [isCompiling, setIsCompiling] = useState(false);

  const handleCompile = () => {
    setIsCompiling(true);
    setCompiledCode("");

    // Simulate compilation steps
    setTimeout(() => {
      // Parse the simple JSX string to simulated React.createElement
      // We will parse it dynamically or show a clean compiled equivalent
      const cleanJsx = jsxCode.trim();
      if (cleanJsx.startsWith("<div")) {
        setCompiledCode(
          `React.createElement(\n  "div",\n  { className: "card" },\n  React.createElement("h1", null, "Hello, World!"),\n  React.createElement("p", null, "React is awesome")\n);`
        );
      } else if (cleanJsx.startsWith("<button")) {
        setCompiledCode(
          `React.createElement(\n  "button",\n  { onClick: handleClick },\n  "Click me"\n);`
        );
      } else {
        setCompiledCode(
          `React.createElement(\n  "span",\n  null,\n  "Custom JSX Compilation"\n);`
        );
      }
      setIsCompiling(false);
    }, 850);
  };

  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h3 className="text-md font-bold text-white flex items-center gap-2">
            <Sparkles size={16} className="text-indigo-400" />
            Interactive JSX Compiler Simulator
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Write simple JSX on the left and see how Babel translates it to React.createElement objects!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Pane */}
        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <span className="text-xs font-semibold text-zinc-400">JSX Input Code</span>
            <span className="text-[10px] text-zinc-600">Editable</span>
          </div>
          <div className="relative">
            <textarea
              value={jsxCode}
              onChange={(e) => setJsxCode(e.target.value)}
              className="w-full h-44 rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 font-mono text-xs text-indigo-300 focus:border-indigo-500/50 focus:outline-none resize-none leading-relaxed"
            />
            <button
              onClick={handleCompile}
              disabled={isCompiling}
              className="absolute bottom-4 right-4 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-indigo-600/20"
            >
              <Play size={12} fill="currentColor" />
              {isCompiling ? "Compiling..." : "Compile JSX"}
            </button>
          </div>
        </div>

        {/* Output Pane */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-zinc-400 px-1">Compiled JavaScript Output</span>
          <div className="h-44 rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 font-mono text-xs text-emerald-400 overflow-y-auto leading-relaxed relative flex items-center justify-center">
            {isCompiling ? (
              <div className="flex flex-col items-center gap-2 text-zinc-500">
                <div className="w-5 h-5 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                <span className="text-[10px]">Babel Compiling...</span>
              </div>
            ) : compiledCode ? (
              <pre className="w-full h-full text-left">{compiledCode}</pre>
            ) : (
              <div className="text-zinc-600 text-xs italic">Click "Compile JSX" to see the JS output</div>
            )}
          </div>
        </div>
      </div>

      {/* Compiler Explanation Pipeline */}
      <div className="bg-zinc-950/40 border border-zinc-800/80 rounded-xl p-4 flex flex-col md:flex-row items-center justify-around gap-4 text-center">
        <div className="flex flex-col items-center">
          <div className="px-3 py-1.5 rounded-lg bg-indigo-950/40 text-indigo-400 border border-indigo-900/40 font-mono text-xs">
            &lt;div className="card" /&gt;
          </div>
          <span className="text-[10px] text-zinc-500 mt-1">Declarative JSX</span>
        </div>
        <div className="text-zinc-600 text-xs rotate-90 md:rotate-0">➔ Babel Transpiler ➔</div>
        <div className="flex flex-col items-center">
          <div className="px-3 py-1.5 rounded-lg bg-emerald-950/40 text-emerald-400 border border-emerald-900/40 font-mono text-xs">
            React.createElement("div", &#123; className: "card" &#125;)
          </div>
          <span className="text-[10px] text-zinc-500 mt-1">Imperative JS Calls</span>
        </div>
        <div className="text-zinc-600 text-xs rotate-90 md:rotate-0">➔ React Engine ➔</div>
        <div className="flex flex-col items-center">
          <div className="px-3 py-1.5 rounded-lg bg-violet-950/40 text-violet-400 border border-violet-900/40 font-mono text-xs">
            &#123; type: "div", props: &#123; className: "card" &#125; &#125;
          </div>
          <span className="text-[10px] text-zinc-500 mt-1">Virtual DOM Node</span>
        </div>
      </div>
    </div>
  );
}
