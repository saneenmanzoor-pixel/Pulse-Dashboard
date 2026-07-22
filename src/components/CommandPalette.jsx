import React, { useState, useEffect, useMemo, useRef } from "react";
import { Search, Compass, Zap, HelpCircle, Briefcase, CornerDownLeft } from "lucide-react";
import { useTheme } from "../context/ThemeContext";


export default function CommandPalette({
  isOpen, onClose, setActiveTab, toggleTheme,
  markAllRead, setActiveWorkspace, simulateSale
}) {
  const [search, setSearch]         = useState("");
  const [selected, setSelected]     = useState(0);
  const listRef                     = useRef(null);
  const { isDark } = useTheme();

  const commands = useMemo(() => [
    { id: "nav_dash",    group: "Navigation",    title: "Go to Dashboard",                   icon: <Compass size={14}/>, action: () => { setActiveTab("dashboard"); onClose(); } },
    { id: "nav_anal",    group: "Navigation",    title: "Go to Analytics",                   icon: <Compass size={14}/>, action: () => { setActiveTab("analytics"); onClose(); } },
    { id: "nav_team",    group: "Navigation",    title: "Go to Team",                        icon: <Compass size={14}/>, action: () => { setActiveTab("team");      onClose(); } },
    { id: "nav_proj",    group: "Navigation",    title: "Go to Projects",                    icon: <Compass size={14}/>, action: () => { setActiveTab("projects");  onClose(); } },
    { id: "nav_repo",    group: "Navigation",    title: "Go to Reports",                     icon: <Compass size={14}/>, action: () => { setActiveTab("reports");   onClose(); } },
    { id: "nav_sett",    group: "Navigation",    title: "Go to Settings",                    icon: <Compass size={14}/>, action: () => { setActiveTab("settings");  onClose(); } },
    { id: "act_theme",   group: "Quick Actions", title: "Toggle Light / Dark Theme",         icon: <Zap size={14}/>,     action: () => { toggleTheme();  onClose(); } },
    { id: "act_read",    group: "Quick Actions", title: "Mark all notifications as read",    icon: <Zap size={14}/>,     action: () => { markAllRead();  onClose(); } },
    { id: "act_sale",    group: "Quick Actions", title: "Simulate a live customer sale",     icon: <Zap size={14}/>,     action: () => { simulateSale(); onClose(); } },
    { id: "ws_acme",     group: "Workspaces",    title: "Switch → Acme Production",          icon: <Briefcase size={14}/>, action: () => { setActiveWorkspace("ws_1"); onClose(); } },
    { id: "ws_dev",      group: "Workspaces",    title: "Switch → Dev / Staging",            icon: <Briefcase size={14}/>, action: () => { setActiveWorkspace("ws_2"); onClose(); } },
    { id: "ws_sandbox",  group: "Workspaces",    title: "Switch → Personal Sandbox",         icon: <Briefcase size={14}/>, action: () => { setActiveWorkspace("ws_3"); onClose(); } },
    { id: "help_doc",    group: "Help",          title: "Open Documentation",                icon: <HelpCircle size={14}/>, action: () => { window.open("https://github.com","_blank"); onClose(); } },
  ], [setActiveTab, toggleTheme, markAllRead, setActiveWorkspace, simulateSale, onClose]);

  const filtered = useMemo(() =>
    search ? commands.filter(c => c.title.toLowerCase().includes(search.toLowerCase())) : commands,
    [search, commands]
  );

  useEffect(() => { setSelected(0); }, [search]);

  useEffect(() => {
    if (!isOpen) return;
    const h = (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected(p => (p+1) % filtered.length); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setSelected(p => (p-1+filtered.length) % filtered.length); }
      else if (e.key === "Enter") { e.preventDefault(); filtered[selected]?.action(); }
      else if (e.key === "Escape") { e.preventDefault(); onClose(); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [isOpen, filtered, selected, onClose]);

  useEffect(() => {
    listRef.current?.querySelector("[data-sel='true']")?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  if (!isOpen) return null;

  let currentGroup = "";
  const rows = [];
  let cmdIdx = 0;
  filtered.forEach(cmd => {
    if (cmd.group !== currentGroup) {
      currentGroup = cmd.group;
      rows.push({ isHeader: true, name: cmd.group, key: `h-${cmd.group}` });
    }
    rows.push({ ...cmd, index: cmdIdx++, isHeader: false, key: cmd.id });
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh]">
      <div className="absolute inset-0 transition-opacity duration-300" onClick={onClose}
        style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }} />

      <div className="relative w-full max-w-lg mx-4 rounded-2xl glass-panel shadow-2xl flex flex-col overflow-hidden"
        style={{ maxHeight: "480px", boxShadow: "0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.15)" }}>

        {/* Search bar */}
        <div className="flex items-center gap-3 p-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.20)" }}>
          <Search size={17} className="text-slate-400 shrink-0" />
          <input
            autoFocus value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Type a command or search…"
            className="flex-1 bg-transparent border-0 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
          />
          <kbd className="px-1.5 py-0.5 text-[10px] font-bold rounded-md text-slate-400"
            style={{ background: "rgba(255, 255, 255, 0.15)", border: "1px solid rgba(255, 255, 255, 0.24)" }}>
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-2" ref={listRef}>
          {filtered.length === 0
            ? <p className="py-8 text-center text-xs text-slate-400 dark:text-slate-500 font-semibold">No commands found for "{search}"</p>
            : rows.map(item => {
              if (item.isHeader) return (
                <div key={item.key} className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  {item.name}
                </div>
              );
              const isSel = item.index === selected;
              return (
                <button key={item.key} data-sel={isSel}
                  onClick={item.action}
                  onMouseEnter={() => setSelected(item.index)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-all duration-150 font-medium"
                  style={isSel ? {
                    background: "linear-gradient(135deg,rgba(0,87,255,0.80),rgba(27,34,243,0.80))",
                    color: "#fff",
                    boxShadow: "0 4px 16px rgba(0,87,255,0.30)"
                  } : { color:isDark? "rgba(255, 255, 255, 0.3)":"rgba(0, 0, 0, 0.74)" }}>
                  <div className="flex items-center gap-3">
                    <span style={{ opacity: isSel ? 1 : 0.5 }}>{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                  {isSel && (
                    <span className="flex items-center gap-1 text-blue-200 text-[10px] shrink-0">
                      Select <CornerDownLeft size={10} />
                    </span>
                  )}
                </button>
              );
            })}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 flex items-center justify-between text-[10px] font-bold text-slate-400 select-none"
          style={{ borderTop: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.10)" }}>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="px-1 rounded border border-white/30 bg-white/20">↑↓</span> Navigate
            </span>
            <span className="flex items-center gap-1">
              <span className="px-1 rounded border border-white/30 bg-white/20">↵</span> Select
            </span>
          </div>
          <span className="text-slate-400">Pulse v1.0</span>
        </div>
      </div>
    </div>
  );
}
