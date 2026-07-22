import React, { useEffect } from "react";
import { X, Bell, AlertTriangle, CheckCircle, Info, ShieldAlert, Trash2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const TYPE_CFG = {
  warning: { icon: AlertTriangle, color:"#f59e0b", bg:"rgba(245,158,11,0.12)", border:"rgba(245,158,11,0.25)" },
  error:   { icon: ShieldAlert,   color:"#f43f5e", bg:"rgba(244,63,94,0.12)",  border:"rgba(244,63,94,0.25)"  },
  success: { icon: CheckCircle,   color:"#10b981", bg:"rgba(16,185,129,0.12)", border:"rgba(16,185,129,0.25)" },
  info:    { icon: Info,          color:"#3b82f6", bg:"rgba(59,130,246,0.12)", border:"rgba(59,130,246,0.25)" },
};

export default function NotificationDrawer({ isOpen, onClose, notifications, setNotifications }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  const unread = notifications.filter(n => n.unread).length;
  const markAll = () => setNotifications(prev => prev.map(n => ({...n, unread:false})));
  const remove  = (id) => setNotifications(prev => prev.filter(n => n.id !== id));
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 transition-opacity duration-300"
        style={{ background:"rgba(0,0,0,0.40)", backdropFilter:"blur(0px)" }}
        onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-md h-full flex flex-col shadow-2xl"
        style={{
          background:isDark? "rgba(255, 255, 255, 0.11)":"rgba(255,255,255,0.80)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderLeft:isDark? "1px solid rgba(255, 255, 255, 0.18)":"1px solid rgba(255,255,255,0.55)",
          boxShadow: "-8px 0 32px rgba(0,0,0,0.12)",
        }}
        onMouseEnter={() => {}}     /* keep panel class dark-aware */
      >
        {/* This inner div handles dark mode */}
        <div className="flex-1 flex flex-col dark:bg-slate-900/30 h-full">
          {/* Header */}
          <div className="px-5 py-4 flex items-center justify-between shrink-0"
            style={{ borderBottom:"1px solid rgba(255,255,255,0.30)" }}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl" style={{ background:isDark? "rgba(255, 255, 255, 0.05)":"rgba(255,255,255,0.40)", border:isDark? "1px solid rgba(255, 255, 255, 0.21)":"1px solid rgba(255,255,255,0.50)" }}>
                <Bell size={17} className="text-slate-600 dark:text-slate-300" />
              </div>
              <div>
                <h2 className="text-sm font-black text-slate-800 dark:text-slate-200 leading-none">Notifications</h2>
                {unread > 0 && (
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 block font-semibold">
                    {unread} unread message{unread > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {unread > 0 && (
                <button onClick={markAll}
                  className="text-[11px] font-black text-blue-600 dark:text-blue-400 hover:underline">
                  Mark all read
                </button>
              )}
              <button onClick={onClose}
                className="p-1.5 rounded-[10px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all duration-150"
                style={{ background: isDark? "rgba(255, 255, 255, 0.07)":"rgba(255,255,255,0.30)", border:isDark? "1px solid rgba(255, 255, 255, 0.21)":"1px solid rgba(255,255,255,0.40)" }}>
                <X size={16} />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="h-16 w-16 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background:"rgba(255,255,255,0.30)", border:"1px solid rgba(255,255,255,0.40)" }}>
                  <Bell size={26} className="text-slate-400 dark:text-slate-500" />
                </div>
                <h3 className="text-sm font-black text-slate-700 dark:text-slate-300">All caught up!</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-[220px] leading-relaxed font-medium">
                  No new notifications right now. We'll alert you when something changes.
                </p>
              </div>
            ) : notifications.map(n => {
              const cfg = TYPE_CFG[n.type] ?? TYPE_CFG.info;
              const Icon = cfg.icon;
              return (
                <div key={n.id} className="group relative flex gap-3 p-4 rounded-2xl transition-all duration-200"
                  style={{
                    background: "rgba(255, 255, 255, 0.06)" ,
                    border: n.unread ? "1px solid rgba(2, 109, 249, 0.39)" : "1px solid rgba(151, 150, 150, 0.21)",
                    boxShadow: n.unread ? "0 4px 16px rgba(0,0,0,0.05)" : "none",
                    backdropFilter:"blur(8px)"
                  }}>
                  {n.unread && (
                    <span className="absolute top-3.5 right-10 h-2 w-2 rounded-full animate-pulse"
                      style={{ background:"linear-gradient(135deg,#0057ff,#1b22f3)" }} />
                  )}
                  <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background:cfg.bg, border:`1px solid ${cfg.border}` }}>
                    <Icon size={15} style={{ color:cfg.color }} />
                  </div>
                  <div className="flex-1 min-w-0 pr-6">
                    <p className={`text-xs leading-snug ${n.unread ? "font-black text-slate-800 dark:text-slate-200" : "font-bold text-slate-700 dark:text-slate-300"}`}>
                      {n.title}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed font-medium">{n.description}</p>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-1 block">{n.time}</span>
                  </div>
                  <button onClick={() => remove(n.id)}
                    className="absolute bottom-3.5 right-3.5 p-1 rounded-lg text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <Trash2 size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
