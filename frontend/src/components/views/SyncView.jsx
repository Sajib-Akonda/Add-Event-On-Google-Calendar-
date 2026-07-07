import React from "react";

export default function SyncView() {
  return (
    <div className="w-full max-w-5xl mx-auto pb-24">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Engine Telemetry</h2>
        <p className="text-slate-500 dark:text-slate-400">Live feed of local LLM extraction and Google API handshakes.</p>
      </div>

      <div className="w-full bg-slate-900 dark:bg-slate-950 rounded-3xl shadow-2xl overflow-hidden border border-slate-700">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-700">
          <div className="w-3 h-3 rounded-full bg-rose-500"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span className="ml-2 text-xs font-mono text-slate-400">local-llm-runner.exe</span>
        </div>
        
        {/* Terminal Body */}
        <div className="p-6 font-mono text-sm h-[400px] overflow-y-auto space-y-2">
          <p className="text-slate-400">[{new Date().toLocaleTimeString()}] <span className="text-blue-400">[INFO]</span> Initializing AutoPrep Local Engine v1.0...</p>
          <p className="text-slate-400">[{new Date().toLocaleTimeString()}] <span className="text-blue-400">[INFO]</span> Connecting to Google API via credentials.json: <span className="text-emerald-400">SUCCESS</span></p>
          <p className="text-slate-400">[{new Date().toLocaleTimeString()}] <span className="text-purple-400">[FETCH]</span> Polling Inbox for new unread messages...</p>
          <p className="text-slate-400">[{new Date().toLocaleTimeString()}] <span className="text-amber-400">[LLM]</span> Analyzing 3 new threads using local inference...</p>
          <p className="text-slate-400">[{new Date().toLocaleTimeString()}] <span className="text-emerald-400">[SUCCESS]</span> 1 scheduling intent found. Added to Pending Queue.</p>
          <p className="text-slate-400 flex items-center gap-2 mt-4">
            <span className="w-2 h-4 bg-emerald-400 animate-pulse"></span>
            Awaiting user input...
          </p>
        </div>
      </div>
    </div>
  );
}