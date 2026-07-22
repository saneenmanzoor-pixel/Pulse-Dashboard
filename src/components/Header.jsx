import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, Sun, Moon, Menu, LogOut, User, Settings, Shield } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Header({
  isCollapsed, setMobileOpen,
  onNotificationClick, unreadNotificationsCount, onSearchClick
}) {
  const { theme, toggleTheme } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const iconBtn = "p-2 rounded-xl transition-all duration-200 focus:outline-none flex items-center justify-center";
  const iconBtnStyle = {
    background:isDark? "rgba(57, 57, 57, 0.39)":"rgba(255,255,255,0.40)",
    border: isDark? "1px solid rgba(96, 96, 96, 0.5)":"1px solid rgba(255,255,255,0.50)",
    backdropFilter: "blur(8px)",
    cursor: "pointer"
  };
  const iconBtnDark = "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white";

  return (
    <div
      className={`fixed top-3 right-3 z-30 transition-all duration-300 ${
        isCollapsed 
          ? "left-3 lg:left-[88px]" 
          : "left-3 lg:left-[268px]"
      }`}
    >
      <header style={{ boxShadow:'0px 5px 10px rgba(0,0,0,0.05)' }}
        className="h-16 w-full flex items-center justify-between px-4 glass-header rounded-3xl border border-white/40 dark:border-white/10"
      >
        {/* Left — hamburger + pill search */}
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={() => setMobileOpen(true)}
            className={`${iconBtn} ${iconBtnDark} lg:hidden`}
            style={iconBtnStyle}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>

          {/* Desktop pill search */}
          <button
            onClick={onSearchClick}
            className="hidden md:flex flex-1 items-center  gap-2.5 h-9 pl-4 pr-3 rounded-full cursor-pointer transition-all duration-200 focus:outline-none"
            style={{
              background:isDark? "rgba(71, 71, 71, 0.34)": "rgba(255,255,255,0.55)",
              border: isDark?"1px solid rgba(87, 87, 87, 0.31)":"1px solid rgba(255,255,255,0.65)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              minWidth: "260px"
            }}
          >
            <Search size={14} className="text-slate-400 dark:text-slate-500 shrink-0" />
            <span className="text-xs text-slate-400 dark:text-slate-500 flex-1 text-left">Search workspace…</span>
            <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-bold rounded-md shrink-0"
              style={{ background:isDark? "rgba(77, 76, 76, 0.34)": "rgba(255,255,255,0.70)", border: "1px solid rgba(0,0,0,0.08)", color: "#94a3b8" }}>
              <span>⌘</span>K
            </kbd>
          </button>
          <div className="h-6 w-px me-3 hidden sm:block" style={{ background: "rgba(255,255,255,0.40)" }} />
          

          {/* Mobile search icon */}
          <button onClick={onSearchClick} className={`${iconBtn} ${iconBtnDark} md:hidden`} style={iconBtnStyle}>
            <Search size={18} />
          </button>
        </div>

        {/* Right — action icons + avatar */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Theme toggle */}
          <button onClick={toggleTheme} className={`${iconBtn} ${iconBtnDark}`} style={iconBtnStyle} aria-label="Toggle theme">
            {theme === "dark"
              ? <Sun size={17} className="text-amber-400" />
              : <Moon size={17} className="text-blue-500" />}
          </button>

          {/* Notification bell */}
          <button onClick={onNotificationClick} className={`${iconBtn} ${iconBtnDark} relative`} style={iconBtnStyle} aria-label="Notifications">
            <Bell size={17} />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center rounded-full text-[9px] font-black text-white"
                style={{ background: "linear-gradient(135deg,#0057ff,#1b22f3)", boxShadow: "0 0 8px rgba(0,87,255,0.6)" }}>
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Separator */}
          <div className="h-6 w-px mx-1 hidden sm:block" style={{ background: "rgba(255,255,255,0.40)" }} />

          {/* Profile dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2.5 pl-1.5 pr-3 py-1 rounded-full transition-all duration-200 focus:outline-none"
              style={{ background:isDark? "rgba(69, 68, 68, 0.29)":"rgba(255,255,255,0.40)",cursor:'pointer', border: isDark? "1px solid rgba(102, 101, 101, 0.55)":"1px solid rgba(255,255,255,0.55)", backdropFilter: "blur(8px)" }}
            >
              <div className="h-8 w-8 rounded-full flex items-center justify-center text-white font-black text-sm shadow-sm"
                style={{ background: "linear-gradient(135deg,#0057ff,#1b22f3)" }}>
                HI
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100">Haneen Iyad</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Admin</span>
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-panel p-1 shadow-2xl z-50"
                style={{ animation: "fadeSlideIn 0.15s ease" }}>
                <div className="px-3 py-2.5 border-b border-white/20 dark:border-white/5">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Haneen Iyad</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate mt-0.5">haneeniyad@company.com</p>
                </div>
                <div className="py-1 space-y-0.5">
                  {[
                    { icon: User, label: "My Profile" },
                    { icon: Settings, label: "Account Settings" },
                    { icon: Shield, label: "Security Logs" },
                  ].map(({ icon: Icon, label }) => (
                    <button key={label} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 text-left transition-all duration-150 hover:bg-white/40 dark:hover:bg-white/5">
                      <Icon size={13} className="text-slate-400" />{label}
                    </button>
                  ))}
                </div>
                <div className="pt-1 border-t border-white/20 dark:border-white/5">
                  <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 text-left transition-all duration-150 hover:bg-rose-500/10">
                    <LogOut size={13} />Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}