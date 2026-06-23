import { useState } from "react";
import { Send, Code } from "lucide-react";

export default function ExpressVisualizer() {
  const [method, setMethod] = useState<"GET" | "POST" | "DELETE">("GET");
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string>("");
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
  ]);

  const triggerRequest = () => {
    setIsLoading(true);
    setResponse("");
    setActiveStep(1); // Client request sent

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const runFlow = async () => {
      // Step 2: Route Matcher / Parsing body
      await delay(700);
      setActiveStep(2);

      // Step 3: Auth/Logging middleware
      await delay(700);
      setActiveStep(3);

      // Step 4: Controller handling
      await delay(700);
      setActiveStep(4);

      // Complete operations & update state
      if (method === "GET") {
        setResponse(JSON.stringify({ success: true, data: users }, null, 2));
      } else if (method === "POST") {
        const newUser = { id: users.length + 1, name: "Charlie", email: "charlie@example.com" };
        setUsers((prev) => [...prev, newUser]);
        setResponse(JSON.stringify({ success: true, message: "User created", data: newUser }, null, 2));
      } else if (method === "DELETE") {
        setUsers((prev) => prev.slice(0, -1));
        setResponse(JSON.stringify({ success: true, message: "Last user deleted" }, null, 2));
      }

      // Step 5: Response sent back
      await delay(700);
      setActiveStep(5);
      setIsLoading(false);
    };

    runFlow();
  };

  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h3 className="text-md font-bold text-white flex items-center gap-2">
            <Code size={16} className="text-indigo-400" />
            Express REST API Request Flow Simulator
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Select an HTTP method and click "Send Request" to watch the packet navigate the Express middleware pipeline.
          </p>
        </div>
      </div>

      {/* Control Panel */}
      <div className="flex flex-wrap gap-4 items-center bg-zinc-950/40 p-4 border border-zinc-800 rounded-xl">
        <div className="flex gap-2">
          {["GET", "POST", "DELETE"].map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m as "GET" | "POST" | "DELETE")}
              disabled={isLoading}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                method === m
                  ? m === "GET"
                    ? "bg-sky-600 text-white"
                    : m === "POST"
                    ? "bg-emerald-600 text-white"
                    : "bg-rose-600 text-white"
                  : "bg-zinc-900 text-zinc-400 hover:text-white"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-zinc-400 flex-1 text-left bg-zinc-900/50 py-1.5 px-3 rounded-lg border border-zinc-800/60">
          {method === "GET" && "GET /api/users"}
          {method === "POST" && "POST /api/users  { name: 'Charlie', email: 'charlie@example.com' }"}
          {method === "DELETE" && "DELETE /api/users/:id"}
        </div>

        <button
          onClick={triggerRequest}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
        >
          <Send size={12} />
          {isLoading ? "Running..." : "Send Request"}
        </button>
      </div>

      {/* Pipeline Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center">
        {/* Step 1: Client Request */}
        <div className={`p-4 rounded-xl border transition-all duration-300 ${
          activeStep === 1 ? "bg-indigo-500/10 border-indigo-500 text-white" : "bg-zinc-950/40 border-zinc-850 text-zinc-500"
        }`}>
          <div className="text-lg font-bold">Client</div>
          <span className="text-[9px] uppercase tracking-wider block mt-1">1. Dispatch Request</span>
          <div className="mt-2 text-[10px] text-zinc-400 leading-normal">
            Request initialized. Headers & body packed.
          </div>
        </div>

        {/* Step 2: Route Matcher */}
        <div className={`p-4 rounded-xl border transition-all duration-300 ${
          activeStep === 2 ? "bg-indigo-500/10 border-indigo-500 text-white" : "bg-zinc-950/40 border-zinc-850 text-zinc-500"
        }`}>
          <div className="text-lg font-bold">Router</div>
          <span className="text-[9px] uppercase tracking-wider block mt-1">2. Endpoint Match</span>
          <div className="mt-2 text-[10px] text-zinc-400 leading-normal">
            Express matches verb & path patterns.
          </div>
        </div>

        {/* Step 3: Middlewares */}
        <div className={`p-4 rounded-xl border transition-all duration-300 ${
          activeStep === 3 ? "bg-indigo-500/10 border-indigo-500 text-white" : "bg-zinc-950/40 border-zinc-850 text-zinc-500"
        }`}>
          <div className="text-lg font-bold">Middleware</div>
          <span className="text-[9px] uppercase tracking-wider block mt-1">3. Cors & Body Parser</span>
          <div className="mt-2 text-[10px] text-zinc-400 leading-normal">
            Parses parameters, validates authentication tokens.
          </div>
        </div>

        {/* Step 4: Controller */}
        <div className={`p-4 rounded-xl border transition-all duration-300 ${
          activeStep === 4 ? "bg-indigo-500/10 border-indigo-500 text-white" : "bg-zinc-950/40 border-zinc-850 text-zinc-500"
        }`}>
          <div className="text-lg font-bold">Controller</div>
          <span className="text-[9px] uppercase tracking-wider block mt-1">4. Route Handler</span>
          <div className="mt-2 text-[10px] text-zinc-400 leading-normal">
            Querying DB / altering state of users array.
          </div>
        </div>

        {/* Step 5: Response */}
        <div className={`p-4 rounded-xl border transition-all duration-300 ${
          activeStep === 5 ? "bg-emerald-500/10 border-emerald-500 text-white" : "bg-zinc-950/40 border-zinc-850 text-zinc-500"
        }`}>
          <div className="text-lg font-bold">Response</div>
          <span className="text-[9px] uppercase tracking-wider block mt-1">5. HTTP Response</span>
          <div className="mt-2 text-[10px] text-zinc-400 leading-normal">
            Sending back JSON payload + status code.
          </div>
        </div>
      </div>

      {/* Response Box */}
      <div className="space-y-2 text-left">
        <span className="text-xs font-semibold text-zinc-400 px-1">Network Response (JSON Payload)</span>
        <div className="h-32 rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 font-mono text-xs text-emerald-400 overflow-y-auto leading-relaxed relative flex items-center justify-center">
          {isLoading && activeStep !== 5 ? (
            <div className="flex flex-col items-center gap-2 text-zinc-500">
              <div className="w-5 h-5 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
              <span className="text-[10px]">Processing Request Step {activeStep}...</span>
            </div>
          ) : response ? (
            <pre className="w-full h-full text-left">{response}</pre>
          ) : (
            <div className="text-zinc-600 text-xs italic">Response payload will be displayed here</div>
          )}
        </div>
      </div>
    </div>
  );
}
