import { useState } from "react";
import { Server, Globe, ArrowUpRight } from "lucide-react";

export default function DeploymentModule() {
  const [activePlatform, setActivePlatform] = useState<"render" | "vercel" | "netlify">("render");

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
          Deployment Blueprints
        </h1>
        <p className="text-zinc-400 mt-2 text-sm">
          Simple, step-by-step documentation on hosting frontend client systems and REST servers.
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="flex border-b border-zinc-800/80 gap-4">
        <button
          onClick={() => setActivePlatform("render")}
          className={`pb-4 text-sm font-semibold border-b-2 transition-all cursor-pointer flex items-center space-x-2 ${
            activePlatform === "render"
              ? "border-indigo-500 text-white"
              : "border-transparent text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <Server size={16} />
          <span>Render (Backend API)</span>
        </button>

        <button
          onClick={() => setActivePlatform("vercel")}
          className={`pb-4 text-sm font-semibold border-b-2 transition-all cursor-pointer flex items-center space-x-2 ${
            activePlatform === "vercel"
              ? "border-indigo-500 text-white"
              : "border-transparent text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <Globe size={16} />
          <span>Vercel (Frontend Client)</span>
        </button>

        <button
          onClick={() => setActivePlatform("netlify")}
          className={`pb-4 text-sm font-semibold border-b-2 transition-all cursor-pointer flex items-center space-x-2 ${
            activePlatform === "netlify"
              ? "border-indigo-500 text-white"
              : "border-transparent text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <ArrowUpRight size={16} />
          <span>Netlify (Alternative Client)</span>
        </button>
      </div>

      {/* platform content display */}
      <div className="bg-[#18181b]/35 border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6">
        {activePlatform === "render" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-white">Deploying Node/Express Server on Render</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Render is a modern cloud provider ideal for running backend dynamic server applications.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-sm text-zinc-300">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 text-xs border border-indigo-500/25 flex-shrink-0 font-bold mt-0.5">1</span>
                <div>
                  <h4 className="font-bold text-white">Configure Start Script</h4>
                  <p className="text-zinc-400 mt-1">Ensure your <code className="text-indigo-300 bg-black/40 px-1.5 py-0.5 rounded">package.json</code> includes a start script pointing node to the server startup entrypoint.</p>
                  <pre className="text-xs text-indigo-200 bg-black/35 p-3 rounded-xl border border-zinc-850 font-mono mt-2 overflow-x-auto">
{`"scripts": {
  "start": "node server.js"
}`}
                  </pre>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-sm text-zinc-300">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 text-xs border border-indigo-500/25 flex-shrink-0 font-bold mt-0.5">2</span>
                <div>
                  <h4 className="font-bold text-white">Create a Web Service on Render</h4>
                  <p className="text-zinc-400 mt-1">Connect your Git repository, choose **Web Service**, specify the Environment as **Node**, and configure the installation and build fields.</p>
                  <div className="bg-black/30 border border-zinc-850 p-4 rounded-xl space-y-2 mt-2 font-mono text-xs">
                    <div><span className="text-zinc-500">Build Command:</span> <span className="text-emerald-400">npm install</span></div>
                    <div><span className="text-zinc-500">Start Command:</span> <span className="text-emerald-400">npm start</span></div>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-sm text-zinc-300">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 text-xs border border-indigo-500/25 flex-shrink-0 font-bold mt-0.5">3</span>
                <div>
                  <h4 className="font-bold text-white">Environment variables</h4>
                  <p className="text-zinc-400 mt-1">Add your environment secrets under Render's **Environment** tab: <code className="text-indigo-300 bg-black/40 px-1.5 py-0.5 rounded">MONGODB_URI</code>, <code className="text-indigo-300 bg-black/40 px-1.5 py-0.5 rounded">JWT_SECRET</code>, etc.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePlatform === "vercel" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-white">Deploying Vite React App on Vercel</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Vercel is optimized for building and serving lightning-fast static single-page websites.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-sm text-zinc-300">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 text-xs border border-indigo-500/25 flex-shrink-0 font-bold mt-0.5">1</span>
                <div>
                  <h4 className="font-bold text-white">Vercel router rules setup</h4>
                  <p className="text-zinc-400 mt-1">Create a <code className="text-indigo-300 bg-black/40 px-1.5 py-0.5 rounded">vercel.json</code> file in the client root to enable React client routes routing fallback.</p>
                  <pre className="text-xs text-indigo-200 bg-black/35 p-3 rounded-xl border border-zinc-850 font-mono mt-2 overflow-x-auto">
{`{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`}
                  </pre>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-sm text-zinc-300">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 text-xs border border-indigo-500/25 flex-shrink-0 font-bold mt-0.5">2</span>
                <div>
                  <h4 className="font-bold text-white">Launch Vercel Project</h4>
                  <p className="text-zinc-400 mt-1">Import the Git repository inside your Vercel Dashboard, select **Vite** configuration, set root folder and build commands.</p>
                  <div className="bg-black/30 border border-zinc-850 p-4 rounded-xl space-y-2 mt-2 font-mono text-xs">
                    <div><span className="text-zinc-500">Output Directory:</span> <span className="text-emerald-400">dist</span></div>
                    <div><span className="text-zinc-500">Build Command:</span> <span className="text-emerald-400">npm run build</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePlatform === "netlify" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-white">Deploying React Frontend Client to Netlify</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Netlify offers continuous integration and static deployments direct from Github repositories.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-sm text-zinc-300">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 text-xs border border-indigo-500/25 flex-shrink-0 font-bold mt-0.5">1</span>
                <div>
                  <h4 className="font-bold text-white">Netlify redirects config</h4>
                  <p className="text-zinc-400 mt-1">Place a file named <code className="text-indigo-300 bg-black/40 px-1.5 py-0.5 rounded">_redirects</code> inside the Vite client's public folder to support React routing fallback.</p>
                  <pre className="text-xs text-indigo-200 bg-black/35 p-3 rounded-xl border border-zinc-850 font-mono mt-2 overflow-x-auto">
{`/*    /index.html   200`}
                  </pre>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-sm text-zinc-300">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 text-xs border border-indigo-500/25 flex-shrink-0 font-bold mt-0.5">2</span>
                <div>
                  <h4 className="font-bold text-white">Import to Netlify</h4>
                  <p className="text-zinc-400 mt-1">Connect GitHub, choose client directory, and click **Deploy Site** once environment variables are set.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
