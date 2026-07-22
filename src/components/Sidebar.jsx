import React from "react";
import {
  LayoutDashboard, BarChart3, Users, FolderKanban,
  FileText, Settings, ChevronLeft, ChevronRight, Sparkles,
  Activity
} from "lucide-react";
import WorkspaceSwitcher from "./WorkspaceSwitcher";
import { useTheme } from "../context/ThemeContext";

export default function Sidebar({
  isCollapsed, setIsCollapsed,
  mobileOpen, setMobileOpen,
  activeTab, setActiveTab,
  activeWorkspace, setActiveWorkspace
}) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard",  icon: LayoutDashboard },
    { id: "analytics", label: "Analytics",  icon: BarChart3       },
    { id: "team",      label: "Team",        icon: Users           },
    { id: "projects",  label: "Projects",    icon: FolderKanban    },
    { id: "reports",   label: "Reports",     icon: FileText        },
    { id: "settings",  label: "Settings",    icon: Settings        },
  ];

  const sidebarWidth = isCollapsed ? "lg:w-[72px]" : "lg:w-60";
  const { isDark } = useTheme();

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Floating Curved Outer Wrapper */}
      <div 
        className={`fixed top-3 bottom-3 ms-4 z-40 w-60 transition-all duration-300 ${sidebarWidth} ${
          mobileOpen ? "translate-x-0" : "-translate-x-[calc(100%+1.25rem)] lg:translate-x-0"
        }`}
      >
        <aside style={{ boxShadow:'0px 5px 10px rgba(0,0,0,0.05)', background:isDark? "rgba(134, 132, 132, 0.21)":"rgba(252, 249, 249, 0.7)"}}
          className="h-full flex flex-col glass-sidebar rounded-3xl overflow-hidden border border-white/40 dark:border-white/10"
        >
          {/* Brand */}
          <div className="h-16 flex items-center justify-between px-4 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.18)" }}>
            <div className="flex items-center gap-3 overflow-visible">
              <div className="h-9 w-9 rounded-xl shrink-0 flex items-center justify-center text-white font-black text-base shadow-lg"
                style={{ background: "linear-gradient(135deg, #0057ff 0%, #1b22f3 100%)", boxShadow: "0 4px 16px rgba(0,87,255,0.45)" }}>
                <Activity />
              </div>
              {(!isCollapsed || mobileOpen) && (
                <div className="flex flex-col leading-none">
                  <span className="text-sm font-black text-slate-800 dark:text-slate-100 tracking-tight">Pulse</span>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">Workspace</span>
                </div>
              )}
            </div>
            {(!isCollapsed || mobileOpen) && (
              <Sparkles size={12} className="text-blue-500 dark:text-blue-400 animate-pulse shrink-0" />
            )}
          </div>

          {/* Workspace switcher */}
          {(!isCollapsed || mobileOpen)
            ? <WorkspaceSwitcher activeWorkspace={activeWorkspace} setActiveWorkspace={setActiveWorkspace} />
            : (
              <div className="flex justify-center py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.14)" }}>
                <div className="h-8 w-8 rounded-lg flex items-center justify-center text-xs font-black text-white"
                  style={{ background: "linear-gradient(135deg, #0057ff 0%, #1b22f3 100%)" }}>W</div>
              </div>
            )
          }

          {/* Navigation */}
          <nav className="flex-1 px-2.5 py-3 space-y-0.5 overflow-y-auto">
            {menuItems.map(({ id, label, icon: Icon }) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => { setActiveTab(id); setMobileOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative focus:outline-none ${
                    active
                      ? "text-white shadow-md"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                  style={active ? {
                    background: "linear-gradient(135deg, rgba(0,87,255,0.85) 0%, rgba(27,34,243,0.85) 100%)",
                    boxShadow: "0 4px 16px rgba(0,87,255,0.35), inset 0 1px 0 rgba(255,255,255,0.20)",cursor:'pointer'
                  } : {
                    background: "transparent", cursor:'pointer'
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.25)"; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
                >
                  <Icon size={17} className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${active ? "text-white" : "text-slate-500 dark:text-slate-400"}`} />
                  {(!isCollapsed || mobileOpen) && <span className="truncate">{label}</span>}

                  {/* Collapsed tooltip */}
                  {isCollapsed && !mobileOpen && (
                    <div className="absolute left-full ml-3 px-2.5 py-1.5 text-xs font-semibold text-white rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap z-50"
                      style={{ background: "rgba(15,23,42,0.90)", backdropFilter: "blur(8px)", boxShadow: "0 4px 16px rgba(0,0,0,0.25)" }}>
                      {label}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Collapse toggle */}
          <div className="p-2.5 hidden lg:block shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.14)" }}>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full flex items-center justify-center p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-all duration-200 focus:outline-none"
              style={{ background:isDark? "rgba(70, 70, 70, 0.2)":"rgba(255,255,255,0.20)", border:'1px solid rgba(101, 101, 101, 0.2)'}}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.35)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.20)"}
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}