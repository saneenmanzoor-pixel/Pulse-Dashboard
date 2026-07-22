import React from "react";
import { UserPlus, CreditCard, UserMinus, Mail, RotateCw, AlertCircle } from "lucide-react";

const ACTIVITY_CONFIG = {
  subscribe: { icon: UserPlus,   bg: "rgba(16,185,129,0.15)",  color: "#10b981" },
  payment:   { icon: CreditCard, bg: "rgba(0,87,255,0.15)",  color: "#0057ff" },
  cancel:    { icon: UserMinus,  bg: "rgba(244,63,94,0.15)",   color: "#f43f5e" },
  invite:    { icon: Mail,       bg: "rgba(59,130,246,0.15)",  color: "#3b82f6" },
  update:    { icon: RotateCw,   bg: "rgba(6,182,212,0.15)",   color: "#06b6d4" },
  default:   { icon: AlertCircle,bg: "rgba(148,163,184,0.15)", color: "#94a3b8" },
};

export default function ActivityFeed({ activities }) {
  return (
    <div className="glass-card bento-hover rounded-3xl p-5 lg:p-7 flex flex-col max-h-[480px]">
      <div className="shrink-0 mb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
          Audit Logs
        </span>
        <h2 className="text-base font-black text-slate-900 dark:text-slate-50 mt-1">
          Live Activity Feed
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto scroll-smooth min-h-0">
        {activities.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-400 dark:text-slate-500 text-xs font-semibold">
            No activity logged yet.
          </div>
        ) : (
          <div className="relative pl-8 space-y-4 py-1"
            style={{ border: "none" }}>
            {activities.map((act) => {
              const cfg = ACTIVITY_CONFIG[act.type] ?? ACTIVITY_CONFIG.default;
              const Icon = cfg.icon;
              return (
                <div key={act.id} className="relative group" style={{ animation: "fadeSlideIn 0.3s ease" }}>
                  {/* Timeline node */}
                  <div className="absolute -left-[32px] top-0 h-7 w-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                    style={{ background: cfg.bg, border: `1.5px solid ${cfg.color}40`, boxShadow:'0px 5px 10px rgba(0,0,0,0.05)'}}>
                    <Icon size={13} style={{ color: cfg.color }} />
                  </div>

                  <div>
                    <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 font-medium ms-1">
                      <span className="font-black text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-150 mr-1">
                        {act.user}
                      </span>
                      {act.message}
                    </p>
                    <span className="text-[10px] font-bold ms-1 text-slate-400 dark:text-slate-500 mt-1 block">{act.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
