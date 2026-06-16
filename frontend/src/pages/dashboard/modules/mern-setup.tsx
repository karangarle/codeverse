import { useState } from "react";
import { Check, ClipboardList, ChevronDown, ChevronUp, FolderTree } from "lucide-react";
import toast from "react-hot-toast";

interface Step {
  id: number;
  title: string;
  description: string;
  snippet?: string;
  details?: string[];
}

export default function MernSetupModule() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [expandedStep, setExpandedStep] = useState<number | null>(1);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const steps: Step[] = [
    {
      id: 1,
      title: "Initialize Backend Repository",
      description: "Create your root project directory, initialize package.json, and install express dependencies.",
      snippet: "mkdir mern-app && cd mern-app\nnpm init -y\nnpm install express mongoose dotenv cors cookie-parser jsonwebtoken bcryptjs\nnpm install --save-dev nodemon",
      details: [
        "Create variables in .env (PORT, MONGODB_URI, JWT_SECRET).",
        "Add start scripts inside package.json config.",
        "Verify node v18+ is installed in environment."
      ]
    },
    {
      id: 2,
      title: "Database Configuration Setup",
      description: "Establish connecting middleware to MongoDB database collections using mongoose.",
      snippet: `// config/db.js
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};`,
      details: [
        "Include connectDB() in server.js root entrypoint.",
        "Add mongoose model schemas inside models/ folders."
      ]
    },
    {
      id: 3,
      title: "Vite + React Frontend Scaffold",
      description: "Scaffold client-side workspace using Vite React TS script directly inside workspace root.",
      snippet: "npx create-vite@latest client --template react-ts\ncd client\nnpm install\nnpm install axios react-router-dom zustand @tanstack/react-query",
      details: [
        "Clean standard boilerplate files (App.css, assets).",
        "Configure vite.config.ts port settings and proxy endpoints."
      ]
    },
    {
      id: 4,
      title: "Integrate Axios API Clients",
      description: "Build shared client utility endpoints to proxy requests to localhost backend routes.",
      snippet: `// client/src/api/axios.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  withCredentials: true
});`,
      details: [
        "Mount auth stores or interceptors to assign headers.",
        "Establish unified endpoints for register & logouts."
      ]
    }
  ];

  const toggleComplete = (id: number) => {
    setCompletedSteps(
      completedSteps.includes(id)
        ? completedSteps.filter((s) => s !== id)
        : [...completedSteps, id]
    );
  };

  const toggleExpand = (id: number) => {
    setExpandedStep(expandedStep === id ? null : id);
  };

  const copySnippet = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    toast.success("Code snippet copied!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const score = Math.round((completedSteps.length / steps.length) * 100);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            MERN Setup Blueprint
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">
            Interactive, step-by-step roadmap to launch production-grade MERN stacks.
          </p>
        </div>

        {/* Scorecard */}
        <div className="bg-[#18181b]/40 border border-zinc-800 rounded-2xl p-4 flex items-center space-x-4 min-w-[200px]">
          <div className="flex-1">
            <span className="text-xs text-zinc-500 font-semibold block">Task Completion</span>
            <div className="w-full bg-zinc-950 h-2 rounded-full mt-2 overflow-hidden border border-zinc-800">
              <div
                className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
          <span className="text-lg font-bold text-white">{score}%</span>
        </div>
      </div>

      {/* Directory Layout Visualizer */}
      <div className="bg-black/30 border border-zinc-800 p-5 rounded-2xl space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <FolderTree size={16} className="text-indigo-400" />
          Recommended Directory Structure
        </h3>
        <pre className="text-xs text-zinc-400 font-mono leading-relaxed bg-[#09090b]/40 p-4 border border-zinc-800/60 rounded-xl overflow-x-auto">
{`mern-app/
├── backend/            # Express REST API
│   ├── config/         # Database configs
│   ├── controllers/    # Route controllers
│   ├── models/         # Mongoose schema models
│   ├── routes/         # Express endpoints mapping
│   └── server.js       # App Entrypoint
└── client/             # Vite + React Client
    ├── src/
    │   ├── components/ # Reusable UI widgets
    │   ├── pages/      # Route viewpages
    │   └── store/      # Zustand state managers`}
        </pre>
      </div>

      {/* Checklist Guide */}
      <div className="space-y-4">
        {steps.map((step, idx) => {
          const isCompleted = completedSteps.includes(step.id);
          const isExpanded = expandedStep === step.id;
          return (
            <div
              key={step.id}
              className={`border rounded-2xl overflow-hidden transition-all ${
                isCompleted
                  ? "bg-indigo-950/5 border-emerald-500/20"
                  : "bg-[#18181b]/35 border-zinc-800/80"
              }`}
            >
              {/* Header block */}
              <div className="p-5 flex items-center justify-between gap-4 select-none">
                <div className="flex items-center space-x-3.5 flex-1 min-w-0">
                  <button
                    onClick={() => toggleComplete(step.id)}
                    className={`p-1 rounded-lg border transition-all cursor-pointer ${
                      isCompleted
                        ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                        : "border-zinc-800 text-zinc-600 hover:text-indigo-400 hover:border-zinc-700"
                    }`}
                  >
                    <Check size={16} />
                  </button>
                  <div className="truncate cursor-pointer" onClick={() => toggleExpand(step.id)}>
                    <h3 className={`font-bold text-sm md:text-base ${isCompleted ? "text-zinc-500 line-through" : "text-white"}`}>
                      {step.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => toggleExpand(step.id)}
                  className="text-zinc-500 hover:text-white p-1 bg-zinc-900 border border-zinc-800 rounded-lg cursor-pointer"
                >
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              {/* Expansion block */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-1 border-t border-zinc-800/60 space-y-4 animate-slideDown">
                  <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">{step.description}</p>

                  {step.snippet && (
                    <div className="relative group">
                      <pre className="bg-black/50 p-4 rounded-xl border border-zinc-800/60 font-mono text-xs text-indigo-200 overflow-x-auto leading-relaxed max-w-full">
                        {step.snippet}
                      </pre>
                      <button
                        onClick={() => copySnippet(step.snippet!, idx)}
                        className="absolute right-3.5 top-3.5 p-1.5 bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                      >
                        {copiedIndex === idx ? <Check className="text-emerald-400" size={14} /> : <ClipboardList size={14} />}
                      </button>
                    </div>
                  )}

                  {step.details && step.details.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-zinc-400 block">Crucial Checklist:</span>
                      <ul className="space-y-1.5">
                        {step.details.map((detail, dIdx) => (
                          <li key={dIdx} className="text-xs text-zinc-400 flex items-start gap-2">
                            <span className="text-indigo-400 mt-1 flex-shrink-0">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
