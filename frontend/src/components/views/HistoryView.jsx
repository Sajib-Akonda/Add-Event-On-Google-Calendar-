import React from "react";

export default function HistoryView() {
  return (
    <div className="w-full max-w-5xl mx-auto pb-24">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Sync History</h2>
        <p className="text-slate-500 dark:text-slate-400">Record of all events successfully processed and scheduled.</p>
      </div>

      <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-xl rounded-3xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/50">
              <th className="p-4 pl-6">Event Name</th>
              <th className="p-4">Date scheduled</th>
              <th className="p-4">Extracted From</th>
              <th className="p-4 pr-6 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {/* Table Row 1 */}
            <tr className="hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors">
              <td className="p-4 pl-6 font-medium text-slate-900 dark:text-white">Dentist Appointment</td>
              <td className="p-4 text-slate-500 dark:text-slate-400 text-sm">Jul 12, 2026</td>
              <td className="p-4 text-slate-500 dark:text-slate-400 text-sm">dr.smith@dental.com</td>
              <td className="p-4 pr-6 text-right">
                <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">
                  Synced
                </span>
              </td>
            </tr>
            {/* Table Row 2 */}
            <tr className="hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors">
              <td className="p-4 pl-6 font-medium text-slate-900 dark:text-white">Q3 Planning Meeting</td>
              <td className="p-4 text-slate-500 dark:text-slate-400 text-sm">Jul 15, 2026</td>
              <td className="p-4 text-slate-500 dark:text-slate-400 text-sm">boss@company.com</td>
              <td className="p-4 pr-6 text-right">
                <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">
                  Synced
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}