import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const TIER_META = {
  Pro:        { sub: "Teams & API",   segment: "Mid-market" },
  Enterprise: { sub: "Custom SLA",    segment: "Corporate"  },
  Starter:    { sub: "Solo creators", segment: "Personal"   },
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="glass-tooltip px-3 py-2 rounded-xl border border-white/20 shadow-xl">
        <p className="text-xs font-black text-slate-800 dark:text-slate-100">{d.name}</p>
        <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-0.5">
          {d.value}% · {TIER_META[d.name].segment}
        </p>
      </div>
    );
  }
  return null;
};

export default function DonutChartCard({ data }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const total = data.reduce((a, d) => a + d.value, 0);
  const active = activeIndex >= 0 ? data[activeIndex] : null;

  return (
    <div className="glass-card bento-hover rounded-3xl p-5 lg:p-7 flex flex-col h-full relative overflow-hidden">
      
      {/* Header */}
      <div className="mb-4 shrink-0">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
          Subscription Insights
        </span>
        <h2 className="text-base font-black text-slate-900 dark:text-slate-50 mt-0.5">
          Segment Distribution
        </h2>
      </div>

      {/* Donut Chart */}
      <div className="flex-1 relative flex items-center justify-center min-h-[180px]">
        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          <span
            className="text-3xl font-black leading-none tracking-tighter"
            style={{
              color: active ? active.color : "#0057ff",
              textShadow: active ? `0 2px 16px ${active.color}40` : "none",
              transition: "color 0.3s ease"
            }}
          >
            {active ? `${active.value}%` : `${total}%`}
          </span>
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
            {active ? active.name : "Total Active"}
          </span>
          {active && (
            <span className="text-[9px] font-semibold text-slate-400 dark:text-slate-500 mt-0.5">
              {TIER_META[active.name].sub}
            </span>
          )}
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Pie
              data={data}
              cx="50%" cy="50%"
              innerRadius={58} outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              cornerRadius={8}
              onMouseEnter={(_, i) => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(-1)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  style={{
                    filter: activeIndex === index
                      ? `drop-shadow(0 4px 14px ${entry.color}70)`
                      : "drop-shadow(0 1px 3px rgba(0,0,0,0.08))",
                    opacity: activeIndex >= 0 && activeIndex !== index ? 0.25 : 1,
                    transition: "opacity 0.3s ease, filter 0.3s ease",
                  }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-col gap-2 shrink-0">
        {data.map((tier, i) => {
          const hovered = activeIndex === i;
          return (
            <div
              key={tier.name}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(-1)}
              className="flex items-center justify-between px-3 py-2.5 rounded-2xl cursor-pointer transition-all duration-250"
              style={{
                background: hovered ? "rgba(152, 188, 255, 0.45)" : "rgba(132, 132, 132, 0.04)",
                border: `1px solid ${hovered ? `${tier.color}40` : "rgba(134, 133, 133, 0.13)"}`,
                backdropFilter: "blur(6px)",
                transform: hovered ? "translateX(2px)" : "none",
              }}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{
                    background: tier.color,
                    boxShadow: hovered ? `0 0 8px ${tier.color}` : "none",
                    transform: hovered ? "scale(1.3)" : "scale(1)",
                    transition: "all 0.2s ease"
                  }}
                />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{tier.name}</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500">· {TIER_META[tier.name].sub}</span>
              </div>
              <span
                className="text-xs font-black"
                style={{ color: tier.color }}
              >
                {tier.value}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}