import React, { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { useTheme } from "../context/ThemeContext";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-tooltip rounded-xl p-3.5 text-xs flex flex-col gap-1.5">
      <p className="font-bold text-slate-700 dark:text-slate-200 pb-1.5 mb-1" style={{ borderBottom: "1px solid rgba(255,255,255,0.25)" }}>
        {label}
      </p>
      {payload.map((e) => (
        <div key={e.name} className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full" style={{ background: e.stroke }} />
            <span className="capitalize">{e.name}</span>
          </div>
          <span className="font-black text-slate-900 dark:text-slate-100">${e.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

const TIME_RANGES = ["Day", "Week", "Month", "Year"];

export default function AreaChartCard({ data }) {
  const [timeRange, setTimeRange] = useState("Month");
  const [visible, setVisible] = useState({ Revenue: true, Expenses: true, Profit: true });

  const toggleSeries = (e) => setVisible(prev => ({ ...prev, [e.dataKey]: !prev[e.dataKey] }));
  const chartData = data[timeRange] || [];
  const { isDark } = useTheme();

  return (
    <div className="glass-card bento-hover rounded-3xl p-4 sm:p-5 lg:p-7 flex flex-col h-full min-h-[360px] sm:min-h-[400px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 shrink-0">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            Financial Analytics
          </span>
          <h2 className="text-base font-black text-slate-900 dark:text-slate-50 mt-1 leading-tight">
            Revenue & Performance
          </h2>
        </div>

        {/* Pill filter row */}
        <div className="flex items-center gap-1 p-1 rounded-full self-start sm:self-center max-w-full overflow-x-auto" 
          style={{ background: isDark ? "rgba(56, 56, 56, 0.18)" : "rgba(255,255,255,0.40)", border: isDark ? "1px solid rgba(129, 128, 128, 0.37)" : "1px solid rgba(255,255,255,0.50)", boxShadow: isDark ? "0 2px 8px rgba(56, 56, 56, 0.14)" : "0 2px 8px rgba(212, 213, 213, 0.4)", backdropFilter: "blur(8px)" }}>
          {TIME_RANGES.map(r => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className="px-2.5 sm:px-3.5 py-1 rounded-full text-xs font-bold transition-all duration-200 whitespace-nowrap"
              style={timeRange === r
                ? { background: "linear-gradient(135deg,#0057ff,#1b22f3)", cursor: 'pointer', color: "#fff", boxShadow: "0 2px 8px rgba(0,87,255,0.40)" }
                : { color: "#94a3b8", cursor: 'pointer' }
              }
            >{r}</button>
          ))}
        </div>
      </div>

      {/* Chart container with fixed minimum height for mobile */}
      <div className="flex-1 w-full min-h-[250px] sm:min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
            <defs>
              {[["Revenue","#0057ff",0.22], ["Expenses","#f43f5e",0.18], ["Profit","#10b981",0.22]].map(([name, color, op]) => (
                <linearGradient key={name} id={`gc-${name}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={op} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.10)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 600 }} dy={10} />
            <YAxis axisLine={false} tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 600 }} dx={-2}
              tickFormatter={v => `$${v >= 1000 ? `${(v/1000).toFixed(0)}k` : v}`} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(0,87,255,0.18)", strokeWidth: 1.5 }} />
            <Legend onClick={toggleSeries} iconSize={8} iconType="circle"
              verticalAlign="top" height={32}
              wrapperStyle={{ paddingBottom: 8, fontSize: 11, fontWeight: 700, cursor: "pointer" }}
              formatter={(v) => (
                <span style={{ color: visible[v] ? undefined : "#94a3b8", textDecoration: visible[v] ? "none" : "line-through" }}>
                  {v}
                </span>
              )} />
            {[
              ["Revenue", "#0057ff"],
              ["Expenses", "#f43f5e"],
              ["Profit",   "#10b981"],
            ].map(([key, color]) =>
              visible[key] && (
                <Area key={key} type="monotone" dataKey={key}
                  stroke={color} strokeWidth={2}
                  fill={`url(#gc-${key})`} fillOpacity={1}
                  activeDot={{ r: 5, strokeWidth: 0, fill: color }} />
              )
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}