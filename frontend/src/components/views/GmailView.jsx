import React from "react";

export default function GmailView() {
  // Mock data to visualize the design before we connect the real Python backend
  const scannedEmails = [
    {
      id: 1,
      sender: "Sarah Jenkins",
      subject: "Fwd: Project Kickoff & Lunch",
      snippet: "Hey, are we still on for lunch tomorrow at 1 PM to discuss...",
      hasEvent: true,
      timeAgo: "10 min ago"
    },
    {
      id: 2,
      sender: "IT Support",
      subject: "Mandatory Password Update",
      snippet: "Please update your password by the end of the week using the link...",
      hasEvent: false,
      timeAgo: "1 hour ago"
    },
    {
      id: 3,
      sender: "Alex Mercer",
      subject: "Flight Details - Q4 Conference",
      snippet: "Attached is the itinerary. Flight departs Friday at 8:30 AM EST...",
      hasEvent: true,
      timeAgo: "3 hours ago"
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto pb-24">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Inbox Radar</h2>
          <p className="text-slate-500 dark:text-slate-400">Scanning recent emails for scheduling context...</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md hover:bg-white dark:hover:bg-slate-800 transition-all text-sm font-medium text-slate-700 dark:text-slate-200">
          <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Rescan Inbox
        </button>
      </div>

      {/* Glassmorphic Email List Container */}
      <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-xl rounded-3xl overflow-hidden">
        <ul className="divide-y divide-slate-200/50 dark:divide-slate-700/50">
          {scannedEmails.map((email) => (
            <li 
              key={email.id} 
              className="p-6 transition-all duration-300 hover:bg-white/60 dark:hover:bg-slate-800/60 group cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                
                {/* Left Side: Avatar & Content */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-bold text-lg border border-indigo-200/50 dark:border-indigo-700/50">
                    {email.sender.charAt(0)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {email.sender}
                      </p>
                      {/* AI Status Badge */}
                      {email.hasEvent ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-emerald-100/80 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Event Found
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                          Standard
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 truncate">
                      {email.subject}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                      {email.snippet}
                    </p>
                  </div>
                </div>

                {/* Right Side: Time & Action */}
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                    {email.timeAgo}
                  </span>
                  {email.hasEvent && (
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-lg border border-indigo-200 dark:border-indigo-500/30 hover:bg-indigo-100 dark:hover:bg-indigo-500/20">
                      Review Invite
                    </button>
                  )}
                </div>

              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}