import React, { useState, useRef, useEffect } from "react";
import { ChevronsUpDown, Check, Plus, Briefcase } from "lucide-react";
import { switcherWorkspaces } from "../data/mockData";
import { useTheme } from "../context/ThemeContext";


export default function WorkspaceSwitcher({ activeWorkspace, setActiveWorkspace }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const { isDark } = useTheme();
  

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setIsOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const current = switcherWorkspaces.find(ws => ws.id === activeWorkspace) ?? switcherWorkspaces[0];

  return (
    <div className="relative z-50 px-3 py-3 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.14)" }} ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 p-2 rounded-xl focus:outline-none transition-all duration-200"
        style={{
          background:isDark? "rgba(53, 53, 53, 0.28)":"rgba(255,255,255,0.28)",
          border:isDark? "1px solid rgba(88, 88, 88, 0.38)":"1px solid rgba(255,255,255,0.38)",
          backdropFilter: "blur(8px)",cursor:'pointer'
        }}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="h-7 w-7 rounded-lg flex items-center justify-center text-white shrink-0"
            style={{ background: "linear-gradient(135deg,#0057ff,#1b22f3)", boxShadow: "0 2px 8px rgba(0,87,255,0.40)" }}>
            <Briefcase size={13} />
          </div>
          <div className="overflow-hidden text-left">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate leading-snug">{current.name}</p>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-500/12 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
              {current.plan}
            </span>
          </div>
        </div>
        <ChevronsUpDown size={14} className="text-slate-400 shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute left-3 right-3 mt-1.5 p-1 rounded-xl glass-panel shadow-xl z-50">
          <div className="px-2 py-1.5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Switch Workspace
          </div>
          <ul className="space-y-0.5 max-h-52 overflow-y-auto">
            {switcherWorkspaces.map(ws => (
              <li key={ws.id}>
                <button
                  onClick={() => { setActiveWorkspace(ws.id); setIsOpen(false); }}
                  className="w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-all duration-150"
                  style={{
                    background: ws.id === activeWorkspace ? "rgba(27,34,243,0.15)" : "transparent",
                    color: ws.id === activeWorkspace ? "#576df8" : undefined,
                  }}
                  onMouseEnter={e => { if (ws.id !== activeWorkspace) e.currentTarget.style.background = "rgba(255,255,255,0.25)"; }}
                  onMouseLeave={e => { if (ws.id !== activeWorkspace) e.currentTarget.style.background = "transparent"; }}
                >
                  <div>
                    <span className="font-bold block">{ws.name}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">{ws.plan} Plan</span>
                  </div>
                  {ws.id === activeWorkspace && <Check size={13} className="text-blue-600 dark:text-blue-400" />}
                </button>
              </li>
            ))}
          </ul>
          <div className="pt-1 mt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.20)" }}>
            <button className="w-full flex items-center justify-center gap-1.5 p-2 rounded-lg text-xs font-bold text-slate-500 dark:text-slate-400 transition-all duration-150 hover:bg-white/20">
              <Plus size={13} />New Workspace
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
