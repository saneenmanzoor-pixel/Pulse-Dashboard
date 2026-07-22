import React, { useState, useEffect, useCallback } from "react";
import Sidebar            from "./components/Sidebar";
import Header             from "./components/Header";
import StatCard           from "./components/StatCard";
import AreaChartCard      from "./components/AreaChartCard";
import DonutChartCard     from "./components/DonutChartCard";
import DataTable          from "./components/DataTable";
import ActivityFeed       from "./components/ActivityFeed";
import CommandPalette     from "./components/CommandPalette";
import NotificationDrawer from "./components/NotificationDrawer";
import {
  kpiData, revenueData, subscriptionBreakdown,
  initialTransactions, initialActivities, systemNotifications
} from "./data/mockData";
import { useTheme } from "./context/ThemeContext";
import {
  Sparkles, Play, Pause, Plus, RefreshCw, Shield, User,
  Download, FileText, TrendingUp, ArrowUpRight
} from "lucide-react";

/* ─── Helpers ───────────────────────────────────────────────────────────── */
const NAMES  = ["Emma Watson","Alex Rivera","Sophia Patel","Kenji Sato","Carlos Ruiz","Amina Diop","Hans Meier","Zoe Lin"];
const EMAILS = ["emma@watson.co","alex@rivera.dev","spatel@tech.in","kenji@sato.jp","carlos@ruiz.es","diop@amina.sn","hans@meier.de","zoe@lin.cn"];
const PLANS  = [{ name:"Starter",amount:49},{ name:"Pro",amount:149},{ name:"Enterprise",amount:1200}];

/* ─── Bento Hero Banner ──────────────────────────────────────────────────── */
function HeroBanner({ kpis, isSimulating, setIsSimulating, simulateSale }) {
  const { isDark } = useTheme();

  const pill = (label, value) => (
    <div className="flex-1 min-w-[90px] sm:flex-initial flex flex-col px-3 sm:px-4 py-2 rounded-2xl"
      style={{ 
        background: "rgba(255, 255, 255, 0.08)", 
        border: isDark ? "1px solid rgba(76, 75, 75, 0.35)" : "1px solid rgba(255, 255, 255, 0.2)", 
        backdropFilter: "blur(10px)" 
      }}>
      <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">{label}</span>
      <span className="text-base sm:text-lg font-black text-white leading-snug mt-0.5" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.25)" }}>{value}</span>
    </div>
  );

  const mrr = kpis.find(k => k.id === "mrr");
  const subs = kpis.find(k => k.id === "subscribers");
  const churn = kpis.find(k => k.id === "churn");

  return (
    <div className="relative rounded-3xl overflow-hidden bento-hover transition-all duration-300"
      style={{
        minHeight: 200,
        background: isDark
          ? "linear-gradient(135deg, rgba(15, 15, 15, 0.34) 0%, rgba(31, 41, 55, 0.36) 50%, rgba(17, 24, 39, 0.67) 100%)"
          : "linear-gradient(135deg, rgba(0,87,255,1.0) 0%, rgba(27, 34, 243, 0.85) 40%, rgba(0,31,170,1.0) 100%)",
        backdropFilter: isDark ? "blur(16px)" : "none",
        WebkitBackdropFilter: isDark ? "blur(16px)" : "none",
        border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "none",
        boxShadow: isDark
          ? "0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)"
          : "0 16px 48px rgba(0,87,255,0.35), inset 0 1px 0 rgba(255,255,255,0.25)"
      }}>
      {/* Decorative blobs */}
      <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full opacity-15 pointer-events-none"
        style={{ background: isDark ? "radial-gradient(circle,#9ca3af 0%,transparent 70%)" : "radial-gradient(circle,#c4b5fd 0%,transparent 70%)" }} />

      {/* Content */}
      <div className="relative z-10 p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="w-full sm:w-auto">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className={`text-white/80 ${isSimulating ? "animate-pulse" : ""}`} />
            <span className="text-xs font-bold text-white/70 uppercase tracking-widest">Live Dashboard Simulator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight"
            style={{ textShadow: "0 4px 16px rgba(0,0,0,0.20)" }}>
            Pulse Workspace
          </h1>
          <p className="text-xs sm:text-sm text-white/70 mt-1.5 font-medium">
            {isSimulating ? "Converting customers & updating metrics in real-time." : "Simulator paused — stats are static."}
          </p>

          {/* Quick metric pills */}
          <div className="flex flex-wrap gap-2 sm:gap-2.5 mt-4 w-full">
            {mrr   && pill("MRR",         mrr.value)}
            {subs  && pill("Subscribers", subs.value)}
            {churn && pill("Churn",       churn.value)}
          </div>
        </div>

        {/* Simulator controls */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0 justify-stretch sm:justify-start">
          <button onClick={() => setIsSimulating(v => !v)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 rounded-full text-xs font-black transition-all duration-200"
            style={{
              background: isSimulating ? "rgba(255, 255, 255, 0.07)" : "rgba(255,255,255,0.90)",
              color: isSimulating ? "#fff" : (isDark ? "#111827" : "#0057ff"),
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)"
            }}>
            {isSimulating ? <><Pause size={13}/>Pause</> : <><Play size={13}/>Resume</>}
          </button>
          <button onClick={simulateSale}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 rounded-full text-xs font-black text-white transition-all duration-200 whitespace-nowrap"
            style={{ background: "rgba(255, 255, 255, 0.07)", border: "1px solid rgba(255, 255, 255, 0.2)", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
            <Plus size={13}/>Trigger Sale
          </button>
        </div>
      </div>
    </div>
  );
}
  

/* ─── Sub-page stubs ─────────────────────────────────────────────────────── */
function AnalyticsPage({ revenue, tiers }) {
  const metricCard = (label, val, color) => (
    <div className="glass-card bento-hover rounded-2xl p-5 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl" style={{ background: color }} />
      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">{label}</span>
      <p className="text-2xl font-black mt-2 leading-none" style={{ background: color, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{val}</p>
    </div>
  );
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {metricCard("Total Profit","$29,505","linear-gradient(135deg,#10b981,#06b6d4)")}
        {metricCard("Monthly Burn","$12,645","linear-gradient(135deg,#f43f5e,#f97316)")}
        {metricCard("LTV (Avg.)","$1,084","linear-gradient(135deg,#0057ff,#1b22f3)")}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2"><AreaChartCard data={revenue} /></div>
        <div><DonutChartCard data={tiers} /></div>
      </div>
    </div>
  );
}

function TeamPage() {
  const team = [
    {name:"John Doe",      email:"john.doe@company.com",  role:"Owner / Product Lead",     status:"Active",   av:"JD"},
    {name:"Sarah Jenkins", email:"sarah.j@acme.corp",      role:"Billing Manager",           status:"Active",   av:"SJ"},
    {name:"Marcus Vance",  email:"marcus@vance.io",        role:"Developer Coordinator",     status:"Active",   av:"MV"},
    {name:"Chloe Dupont",  email:"c.dupont@designlab.fr",  role:"UI Designer",               status:"Invited",  av:"CD"},
    {name:"Elena Rostova", email:"elena@rostova.co",        role:"Data Analyst",              status:"Inactive", av:"ER"},
  ];
  const statusStyle = { Active:"text-emerald-600 dark:text-emerald-400 bg-emerald-500/12 border-emerald-500/25", Invited:"text-amber-600 dark:text-amber-400 bg-amber-500/12 border-amber-500/25", Inactive:"text-slate-500 bg-slate-500/10 border-slate-500/20" };
  return (
    <div className="glass-card bento-hover rounded-2xl overflow-hidden">
      <div className="p-6 flex justify-between items-center" style={{ borderBottom:"1px solid rgba(255,255,255,0.20)" }}>
        <div>
          <h2 className="text-base font-black text-slate-900 dark:text-slate-50">Team Roster</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 font-semibold">Manage roles and collaborator permissions</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black text-white"
          style={{ background:"linear-gradient(135deg,#0057ff,#1b22f3)", boxShadow:"0 4px 16px rgba(0,87,255,0.35)" }}>
          <Plus size={13}/>Invite
        </button>
      </div>
      <div className="divide-y" style={{ "--tw-divide-opacity":1 }}>
        {team.map(m => (
          <div key={m.email} className="px-6 py-4 flex items-center justify-between flex-wrap gap-4 text-xs transition-all duration-150"
            style={{ borderBottom:"1px solid rgba(255,255,255,0.12)" }}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.12)"}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl flex items-center justify-center text-white text-xs font-black shrink-0"
                style={{ background:"linear-gradient(135deg,#0057ff,#1b22f3)" }}>{m.av}</div>
              <div>
                <p className="font-black text-slate-800 dark:text-slate-200">{m.name}</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">{m.email}</p>
              </div>
            </div>
            <span className="font-semibold text-slate-600 dark:text-slate-400">{m.role}</span>
            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-black ${statusStyle[m.status]}`}>{m.status}</span>
              <button className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline">Manage</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsPage() {
  const projects = [
    {name:"OAuth Integration",   status:"Active",    progress:80,  team:["JD","MV"], tag:"Security",        grad:"linear-gradient(135deg,#0057ff,#1b22f3)"},
    {name:"Database Migration",  status:"Active",    progress:45,  team:["MV","ER"], tag:"Infrastructure",   grad:"linear-gradient(135deg,#06b6d4,#0057ff)"},
    {name:"UI Design System",    status:"Completed", progress:100, team:["JD","CD"], tag:"Design",           grad:"linear-gradient(135deg,#10b981,#06b6d4)"},
    {name:"Billing Webhooks",    status:"Planning",  progress:5,   team:["SJ","MV"], tag:"Fintech",          grad:"linear-gradient(135deg,#f97316,#f43f5e)"},
  ];
  return (
    <div className="space-y-5">
      <div className="glass-card bento-hover rounded-2xl p-5 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-slate-900 dark:text-slate-50">Active Projects</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5">Core pipelines and work streams</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black text-white"
          style={{ background:"linear-gradient(135deg,#0057ff,#1b22f3)", boxShadow:"0 4px 16px rgba(0,87,255,0.30)" }}>
          <Plus size={13}/>New Project
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
        {projects.map(p => (
          <div key={p.name} className="glass-card bento-hover rounded-2xl p-5 flex flex-col justify-between min-h-[180px] relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[2.5px] rounded-t-2xl" style={{ background: p.grad }} />
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black text-white"
                  style={{ background: p.grad }}>{p.tag}</span>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">{p.status}</span>
              </div>
              <h3 className="text-sm font-black text-slate-900 dark:text-slate-100">{p.name}</h3>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1.5">
                <span>Progress</span><span>{p.progress}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background:"rgba(255,255,255,0.25)" }}>
                <div className="h-full rounded-full" style={{ width:`${p.progress}%`, background: p.grad }} />
              </div>
              <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop:"1px solid rgba(255,255,255,0.18)" }}>
                <div className="flex -space-x-2">
                  {p.team.map((t,i) => (
                    <div key={i} className="h-6 w-6 rounded-full border-2 flex items-center justify-center text-[9px] font-black text-white"
                      style={{ borderColor:"rgba(255,255,255,0.40)", background:"linear-gradient(135deg,#0057ff,#1b22f3)" }}>{t}</div>
                  ))}
                </div>
                <button className="text-[10px] font-black text-blue-600 dark:text-blue-400 flex items-center gap-0.5 hover:underline">
                  Open<ArrowUpRight size={11}/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsPage() {
  const reports = [
    {title:"Q3 Financial Report",             size:"2.4 MB", type:"PDF",  date:"Jul 15, 2026"},
    {title:"Monthly Cohort Retention",         size:"4.8 MB", type:"CSV",  date:"Jul 01, 2026"},
    {title:"Server Load & Performance Log",    size:"850 KB", type:"TXT",  date:"Jul 20, 2026"},
    {title:"SaaS Sales Audit Registry",        size:"1.2 MB", type:"XLSX", date:"Jul 10, 2026"},
  ];
  const typeColor = {PDF:"#f43f5e", CSV:"#10b981", TXT:"#94a3b8", XLSX:"#0057ff"};
  return (
    <div className="glass-card bento-hover rounded-2xl overflow-hidden">
      <div className="p-6" style={{ borderBottom:"1px solid rgba(255,255,255,0.20)" }}>
        <h2 className="text-base font-black text-slate-900 dark:text-slate-50">Reports Directory</h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5">Export transaction logs and analytics</p>
      </div>
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {reports.map(r => (
          <div key={r.title} className="flex items-center justify-between p-4 rounded-xl"
            style={{ background:"rgba(255,255,255,0.20)", border:"1px solid rgba(255,255,255,0.30)", backdropFilter:"blur(6px)" }}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl"
                style={{ background:`${typeColor[r.type]}20`, border:`1px solid ${typeColor[r.type]}30` }}>
                <FileText size={16} style={{ color: typeColor[r.type] }} />
              </div>
              <div>
                <p className="text-xs font-black text-slate-800 dark:text-slate-200 leading-snug">{r.title}</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{r.date} · {r.size} · {r.type}</p>
              </div>
            </div>
            <button className="p-2 rounded-xl text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150"
              style={{ background:"rgba(255,255,255,0.30)", border:"1px solid rgba(255,255,255,0.40)" }}>
              <Download size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsPage({ isSimulating, setIsSimulating, activeWorkspace }) {
  const { theme, toggleTheme } = useTheme();
  const row = (icon, title, desc, right) => (
    <div className="flex items-center justify-between p-4 rounded-2xl"
      style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.25)" }}>
      <div className="flex items-center gap-3">
        <span className="text-slate-400 dark:text-slate-500">{icon}</span>
        <div>
          <p className="text-xs font-black text-slate-800 dark:text-slate-200">{title}</p>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{desc}</p>
        </div>
      </div>
      {right}
    </div>
  );

  const pillBtn = (label, onClick, danger) => (
    <button onClick={onClick}
      className="px-3 py-1.5 rounded-full text-xs font-black transition-all duration-150"
      style={danger
        ? { background:"rgba(244,63,94,0.12)", color:"#f43f5e", border:"1px solid rgba(244,63,94,0.20)" }
        : { background:"rgba(255,255,255,0.40)", color:"#0057ff", border:"1px solid rgba(255,255,255,0.55)", backdropFilter:"blur(6px)" }}>
      {label}
    </button>
  );

  return (
    <div className="glass-card bento-hover rounded-2xl p-6 space-y-3 max-w-2xl">
      <div className="mb-6">
        <h2 className="text-base font-black text-slate-900 dark:text-slate-50">Workspace Settings</h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 font-semibold">Configure appearance and system preferences</p>
      </div>
      {row(<User size={16}/>, "Theme Mode", "Toggle interface lighting profiles",
        pillBtn(theme === "dark" ? "Switch to Light" : "Switch to Dark", toggleTheme))}
      {row(<RefreshCw size={16}/>, "Dashboard Simulator", "Simulate customer conversions every 15s",
        pillBtn(isSimulating ? "Deactivate" : "Activate", () => setIsSimulating(v => !v), isSimulating))}
      {row(<Shield size={16}/>, "Two-Factor Auth (2FA)", "SMS / Authenticator sign-in verification",
        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-wider">Enabled</span>)}
    </div>
  );
}

/* ─── Main App ───────────────────────────────────────────────────────────── */
export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { isDark } = useTheme();

  // Layout
  const [isCollapsed,        setIsCollapsed]        = useState(false);
  const [mobileOpen,         setMobileOpen]          = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen]  = useState(false);
  const [notificationOpen,   setNotificationOpen]    = useState(false);
  const [activeTab,          setActiveTab]            = useState("dashboard");
  const [activeWorkspace,    setActiveWorkspace]      = useState("ws_1");
  const [isSimulating,       setIsSimulating]         = useState(true);

  // Data
  const [notifications,    setNotifications]    = useState(systemNotifications);
  const [transactions,     setTransactions]     = useState(initialTransactions);
  const [activities,       setActivities]       = useState(initialActivities);
  const [kpis,             setKpis]             = useState(kpiData);
  const [revenue,          setRevenue]          = useState(revenueData);
  const [subscriptionTiers,setSubscriptionTiers] = useState(subscriptionBreakdown);

  // Cmd+K shortcut
  useEffect(() => {
    const h = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen(v => !v);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const simulateSale = useCallback(() => {
    const i = Math.floor(Math.random() * NAMES.length);
    const p = PLANS[Math.floor(Math.random() * PLANS.length)];
    const name = NAMES[i], email = EMAILS[i];
    const { name: plan, amount } = p;
    const date = new Date().toISOString().split("T")[0];

    setTransactions(prev => [{ id:`tx_${Date.now().toString().slice(-5)}`, customerName:name, customerEmail:email, amount, status:"Active", date, plan }, ...prev]);
    setActivities(prev => [{ id:`act_${Date.now()}`, type: plan==="Enterprise"?"subscribe":"payment", user:name, message: plan==="Enterprise"?`subscribed to ${plan} Plan`:`paid invoice of $${amount}`, time:"Just now" }, ...prev.slice(0,14)]);
    setNotifications(prev => [{ id:`not_${Date.now()}`, title:`Sale: $${amount}`, description:`${name} joined the ${plan} plan.`, time:"Just now", unread:true, type:"success" }, ...prev]);
    setKpis(prev => prev.map(k => {
      if (k.id==="mrr") { const v=parseInt(k.value.replace(/[^0-9]/g,""))+amount; return {...k, value:`$${v.toLocaleString()}`, sparkline:[...k.sparkline.slice(1),v], change:"+12.9%"}; }
      if (k.id==="subscribers") { const v=parseInt(k.value.replace(/[^0-9]/g,""))+1; return {...k, value:v.toLocaleString(), sparkline:[...k.sparkline.slice(1),v], change:"+8.5%"}; }
      return k;
    }));
    setSubscriptionTiers(prev => prev.map(t => t.name===plan ? {...t, value:Math.min(60,t.value+1)} : t));
    setRevenue(prev => {
      const upd = arr => { if(!arr.length) return arr; const c=[...arr]; c[c.length-1]={...c[c.length-1], Revenue:c[c.length-1].Revenue+amount, Profit:c[c.length-1].Profit+amount*0.7}; return c; };
      return { Day:upd(prev.Day), Week:upd(prev.Week), Month:upd(prev.Month), Year:upd(prev.Year) };
    });
  }, []);

  // Auto-simulate
  useEffect(() => {
    if (!isSimulating) return;
    const t = setInterval(simulateSale, 15000);
    return () => clearInterval(t);
  }, [isSimulating, simulateSale]);

  const markAllRead = () => setNotifications(prev => prev.map(n => ({...n, unread:false})));

  const PAGE_TITLES = {
    dashboard: "Command Dashboard",
    analytics: "Performance Analytics",
    team:      "Workspace Members",
    projects:  "Project Pipelines",
    reports:   "Financial Reports",
    settings:  "Account Settings",
  };

  const sidebarOffset = isCollapsed ? "lg:pl-[88px]" : "lg:pl-[268px]";

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${theme === "dark" ? "dark mesh-bg" : "light-mesh-bg"}`}>
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}
        mobileOpen={mobileOpen}   setMobileOpen={setMobileOpen}
        activeTab={activeTab}     setActiveTab={setActiveTab}
        activeWorkspace={activeWorkspace} setActiveWorkspace={setActiveWorkspace}
      />

      {/* Main content */}
      <div className={`min-h-screen flex flex-col pt-[90px] pb-3 lg:pb-3 transition-all duration-300 pl-3 pr-3 lg:pl-5 lg:pr-3 ${sidebarOffset}`}>
        {/* Header */}
        <Header
          isCollapsed={isCollapsed}
          setMobileOpen={setMobileOpen}
          onNotificationClick={() => setNotificationOpen(true)}
          unreadNotificationsCount={notifications.filter(n => n.unread).length}
          onSearchClick={() => setCommandPaletteOpen(true)}
        />

        {/* Page */}
        <main className="flex-1 w-full space-y-3 lg:space-y-5">
          {/* Page title row */}
          <div className="flex flex-col sm:flex-row mb-2 ms-2 sm:items-center justify-between gap-3 pt-1 pb-1">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-50 leading-none">
                {PAGE_TITLES[activeTab]}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1.5">
                Pulse SaaS — real-time business intelligence
              </p>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest self-start sm:self-center px-3 py-1.5 rounded-full text-slate-500 dark:text-slate-400"
              style={{ background: isDark? "rgba(63, 62, 62, 0.27)":"rgba(255,255,255,0.35)", border:isDark? "1px solid rgba(128, 126, 126, 0.45)":"1px solid rgba(255,255,255,0.45)", backdropFilter:"blur(8px)" }}>
              WS: <span className="text-blue-600 dark:text-blue-400 font-mono">{activeWorkspace}</span>
            </div>
          </div>

          {/* ── DASHBOARD ── */}
          {activeTab === "dashboard" && (
            <div className="space-y-3 lg:space-y-3">
              {/* Hero bento tile */}
              <HeroBanner kpis={kpis} isSimulating={isSimulating} setIsSimulating={setIsSimulating} simulateSale={simulateSale} />

              {/* KPI stat cards row — 4 cols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-3">
                {kpis.map(k => <StatCard key={k.id} {...k} />)}
              </div>

              {/* Charts row — 8+4 grid, equal height */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-3 lg:items-stretch lg:min-h-[440px]">
                <div className="lg:col-span-8 flex flex-col"><AreaChartCard data={revenue} /></div>
                <div className="lg:col-span-4 flex flex-col"><DonutChartCard data={subscriptionTiers} /></div>
              </div>

              {/* Data + activity — 8+4 grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-3 lg:items-stretch">
                <div className="lg:col-span-8 flex flex-col"><DataTable data={transactions} /></div>
                <div className="lg:col-span-4 flex flex-col"><ActivityFeed activities={activities} /></div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && <AnalyticsPage revenue={revenue} tiers={subscriptionTiers} />}
          {activeTab === "team"      && <TeamPage />}
          {activeTab === "projects"  && <ProjectsPage />}
          {activeTab === "reports"   && <ReportsPage />}
          {activeTab === "settings"  && <SettingsPage isSimulating={isSimulating} setIsSimulating={setIsSimulating} activeWorkspace={activeWorkspace} />}
        </main>
      </div>

      {/* Overlays */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        setActiveTab={setActiveTab}
        toggleTheme={toggleTheme}
        markAllRead={markAllRead}
        setActiveWorkspace={setActiveWorkspace}
        simulateSale={simulateSale}
      />
      <NotificationDrawer
        isOpen={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        notifications={notifications}
        setNotifications={setNotifications}
      />
    </div>
  );
}
