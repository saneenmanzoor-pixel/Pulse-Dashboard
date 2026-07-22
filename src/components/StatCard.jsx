import React from "react";
import { DollarSign, Users, Percent, TrendingUp, TrendingDown } from "lucide-react";

const ICON_CONFIG = {
  mrr:         { icon: DollarSign,  gradient: "linear-gradient(135deg,#5196FF,#004DFF)", glow: "rgba(0,87,255,0.35)"  },
  subscribers: { icon: Users,       gradient: "linear-gradient(135deg,#06b6d4,#0057ff)", glow: "rgba(6,182,212,0.35)"   },
  churn:       { icon: Percent,     gradient: "linear-gradient(135deg,#0BD0C9,#1C86F6)", glow: "rgba(6,182,212,0.35)"   },
  default:     { icon: TrendingUp,  gradient: "linear-gradient(135deg,#00DF88,#009BB6)", glow: "rgba(16,185,129,0.35)"  },
};

function Sparkline({ data, isGood, id }) {
  if (!data || data.length < 2) return null;
  const W = 96, H = 32, P = 2;
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - P - ((v - min) / range) * (H - P * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const line = `M ${pts.join(" L ")}`;
  const area = `${line} L ${W},${H} L 0,${H} Z`;
  const color = isGood ? "#10b981" : "#f43f5e";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-24 h-8" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`sg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.30" />
          <stop offset="100%" stopColor={color} stopOpacity="0.00" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#sg-${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function StatCard({ id, title, value, change, isPositive, sparkline, description }) {
  const cfg = ICON_CONFIG[id] ?? ICON_CONFIG.default;
  const Icon = cfg.icon;
  const isUp = change.startsWith("+");

  return (
    <div className="glass-card bento-hover rounded-3xl p-5 lg:p-4 flex flex-col justify-between h-full relative overflow-hidden">
      
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            {title}
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-50 mt-1 tracking-tight leading-none">
            {value}
          </h2>
        </div>

        {/* Icon orb */}
        <div className="h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 ml-3 shadow-md"
          style={{ background: cfg.gradient, boxShadow: `0 4px 16px ${cfg.glow}` }}>
          <Icon size={18} className="text-white" />
        </div>
      </div>

      {/* Bottom row — badge + sparkline */}
      <div className="flex items-center justify-between mt-0 pt-3" style={{ borderTop: "none" }}>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-black ${
            isPositive
              ? "bg-emerald-500/12 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
              : "bg-rose-500/12 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400"
          }`}>
            {isUp
              ? <TrendingUp size={11} />
              : <TrendingDown size={11} />}
            {change}
          </span>
          <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">{description}</span>
        </div>
        <Sparkline data={sparkline} isGood={isPositive} id={id} />
      </div>
    </div>
  );
}
