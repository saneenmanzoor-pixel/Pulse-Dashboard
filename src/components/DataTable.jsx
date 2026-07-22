import React, { useState, useMemo, useRef, useEffect } from "react";
import { Search, ChevronDown, ChevronUp, ChevronsUpDown, ChevronLeft, ChevronRight, X, Eye, Check } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const STATUS = {
  Active:   "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-500/25",
  Pending:  "bg-amber-500/15 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border-amber-500/25",
  Canceled: "bg-rose-500/15 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 border-rose-500/25",
};

const STATUS_DOT = {
  Active:   "#10b981",
  Pending:  "#f59e0b",
  Canceled: "#f43f5e",
};

/* ─── Reusable Glass Dropdown ──────────────────────────────────────────────── */
function GlassDropdown({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const current = options.find(o => o.value === value);

  return (
    <div className="relative z-20" ref={ref}>
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center justify-between gap-2 pl-3 pr-2.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 focus:outline-none w-full sm:w-auto"
        style={{
          background: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255,255,255,0.50)",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.22)" : "1px solid rgba(255,255,255,0.60)",
          backdropFilter: "blur(8px)",
          minWidth: "120px",
        }}
      >
        <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 truncate">
          {current?.dot && (
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: current.dot }} />
          )}
          {current?.label ?? placeholder}
        </span>
        <ChevronDown size={11} className={`text-slate-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          className="absolute top-full mt-1.5 right-0 sm:left-0 p-1 rounded-2xl shadow-2xl z-50 min-w-[160px]"
          style={{
            background: isDark ? "rgba(15,23,42,0.92)" : "rgba(255,255,255,0.85)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(255,255,255,0.60)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <div className="px-2 py-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
            {placeholder}
          </div>
          <ul className="space-y-0.5">
            {options.map(opt => (
              <li key={opt.value}>
                <button
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  className="w-full flex items-center justify-between gap-2.5 px-2.5 py-2 rounded-xl text-xs font-bold text-left transition-all duration-150"
                  style={{
                    background: opt.value === value ? "rgba(0,87,255,0.10)" : "transparent",
                    color: opt.value === value ? "#0057ff" : undefined,
                  }}
                >
                  <span className="flex items-center gap-2">
                    {opt.dot && (
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: opt.dot }} />
                    )}
                    <span className={opt.value === value ? "text-blue-600" : "text-slate-700 dark:text-slate-200"}>
                      {opt.label}
                    </span>
                  </span>
                  {opt.value === value && <Check size={12} className="text-blue-500 shrink-0" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ─── DataTable ────────────────────────────────────────────────────────────── */
export default function DataTable({ data }) {
  const [search,    setSearch]    = useState("");
  const [filter,    setFilter]    = useState("All");
  const [sortKey,   setSortKey]   = useState("date");
  const [sortDir,   setSortDir]   = useState("desc");
  const [page,      setPage]      = useState(1);
  const [pageSize,  setPageSize]  = useState(5);
  const { isDark } = useTheme();

  const STATUS_OPTIONS = [
    { value: "All",      label: "All Statuses" },
    { value: "Active",   label: "Active",   dot: STATUS_DOT.Active   },
    { value: "Pending",  label: "Pending",  dot: STATUS_DOT.Pending  },
    { value: "Canceled", label: "Canceled", dot: STATUS_DOT.Canceled },
  ];

  const PAGE_OPTIONS = [
    { value: 5,  label: "5 rows"  },
    { value: 10, label: "10 rows" },
    { value: 20, label: "20 rows" },
  ];

  const requestSort = (key) => {
    setSortDir(sortKey === key && sortDir === "asc" ? "desc" : "asc");
    setSortKey(key);
    setPage(1);
  };

  const processed = useMemo(() => {
    let r = [...data];
    if (search) {
      const s = search.toLowerCase();
      r = r.filter(t => t.customerName.toLowerCase().includes(s) || t.customerEmail.toLowerCase().includes(s) || t.id.toLowerCase().includes(s));
    }
    if (filter !== "All") r = r.filter(t => t.status === filter);
    r.sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      return (typeof av === "string" ? av.localeCompare(bv) : av - bv) * (sortDir === "asc" ? 1 : -1);
    });
    return r;
  }, [data, search, filter, sortKey, sortDir]);

  const paginated  = processed.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.max(1, Math.ceil(processed.length / pageSize));

  const SortIcon = ({ k }) => {
    if (sortKey !== k) return <ChevronsUpDown size={12} className="text-slate-400" />;
    return sortDir === "asc" ? <ChevronUp size={12} className="text-blue-500" /> : <ChevronDown size={12} className="text-blue-500" />;
  };

  const pillStyle = {
    background: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255,255,255,0.50)",
    border: isDark ? "1px solid rgba(255, 255, 255, 0.23)" : "1px solid rgba(255,255,255,0.60)",
    backdropFilter: "blur(8px)",
  };

  return (
    <div className="glass-card bento-hover rounded-3xl overflow-visible z-3 flex flex-col max-h-[480px] ">
      {/* Toolbar */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.25)" }}>
        <div>
          <h2 className="text-base font-black text-slate-900 dark:text-slate-50">Transactions</h2>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-semibold">Manage invoices and subscription status</p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto flex-wrap sm:flex-nowrap items-center">
          {/* Pill search */}
          <div className="relative flex-1 sm:flex-none w-full sm:w-auto">
            <Search size={13} className="absolute left-3 top-2.5 text-slate-400 dark:text-slate-500" />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search customers…"
              className="w-full sm:w-56 pl-8 pr-7 py-1.5 rounded-full text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              style={pillStyle}
            />
            {search && (
              <button onClick={() => { setSearch(""); setPage(1); }}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X size={12} />
              </button>
            )}
          </div>

          {/* Status custom dropdown */}
          <GlassDropdown
            value={filter}
            onChange={(v) => { setFilter(v); setPage(1); }}
            options={STATUS_OPTIONS}
            placeholder="Filter Status"
          />
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto flex-1 min-h-[220px]">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500"
              style={{ background: "rgba(255, 255, 255, 0.06)", borderBottom: "1px solid rgba(194, 193, 193, 0.2)" }}>
              <th className="py-3 px-5">ID</th>
              <th className="py-3 px-5 cursor-pointer select-none" onClick={() => requestSort("customerName")}>
                <div className="flex items-center gap-1.5">Customer <SortIcon k="customerName" /></div>
              </th>
              <th className="py-3 px-5">Plan</th>
              <th className="py-3 px-5 cursor-pointer select-none" onClick={() => requestSort("date")}>
                <div className="flex items-center gap-1.5">Date <SortIcon k="date" /></div>
              </th>
              <th className="py-3 px-5 cursor-pointer select-none text-right" onClick={() => requestSort("amount")}>
                <div className="flex items-center justify-end gap-1.5">Amount <SortIcon k="amount" /></div>
              </th>
              <th className="py-3 px-5 text-center">Status</th>
              <th className="py-3 px-5 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400 dark:text-slate-500 font-semibold">
                  No records match your filters.
                </td>
              </tr>
            ) : paginated.map((row) => (
              <tr key={row.id} className="group transition-colors duration-150"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td className="py-3.5 px-5 font-mono text-slate-400 dark:text-slate-500">{row.id}</td>
                <td className="py-3.5 px-5">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0"
                      style={{ background: "linear-gradient(135deg,#0057ff,#1b22f3)" }}>
                      {row.customerName.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">{row.customerName}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{row.customerEmail}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-5 font-semibold text-slate-700 dark:text-slate-300">{row.plan}</td>
                <td className="py-3.5 px-5 font-medium text-slate-600 dark:text-slate-400">{row.date}</td>
                <td className="py-3.5 px-5 text-right font-black text-slate-900 dark:text-slate-100">
                  ${row.amount.toFixed(2)}
                </td>
                <td className="py-3.5 px-5">
                  <div className="flex justify-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-black ${STATUS[row.status] ?? ""}`}>
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: STATUS_DOT[row.status] }} />
                      {row.status}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-5">
                  <div className="flex justify-center">
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150"
                      style={{ background: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255,255,255,0.25)", border: isDark ? "1px solid rgba(255, 255, 255, 0.14)" : "1px solid rgba(255,255,255,0.35)" }}>
                      <Eye size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="block md:hidden divide-y divide-white/10 p-3 space-y-3">
        {paginated.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs font-semibold">
            No records match your filters.
          </div>
        ) : (
          paginated.map((row) => (
            <div key={row.id} className="p-3.5 rounded-2xl space-y-2.5"
              style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.15)" }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0"
                    style={{ background: "linear-gradient(135deg,#0057ff,#1b22f3)" }}>
                    {row.customerName.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-800 dark:text-slate-100 block">{row.customerName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{row.id}</span>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[9px] font-black ${STATUS[row.status] ?? ""}`}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: STATUS_DOT[row.status] }} />
                  {row.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-white/10">
                <div className="space-y-0.5">
                  <p className="text-[10px] text-slate-400 font-semibold">{row.plan} • {row.date}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{row.customerEmail}</p>
                </div>
                <div className="text-right flex items-center gap-2">
                  <span className="font-black text-sm text-slate-900 dark:text-slate-50">${row.amount.toFixed(2)}</span>
                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                    style={{ background: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255,255,255,0.25)" }}>
                    <Eye size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="px-4 sm:px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.20)" }}>
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 order-2 sm:order-1">
          {processed.length === 0 ? "0" : (page - 1) * pageSize + 1}–{Math.min(page * pageSize, processed.length)} of {processed.length} entries
        </span>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end order-1 sm:order-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Rows</span>
            <GlassDropdown
              value={pageSize}
              onChange={(v) => { setPageSize(Number(v)); setPage(1); }}
              options={PAGE_OPTIONS}
              placeholder="Rows per page"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
              className="p-1 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed text-slate-500 dark:text-slate-400 transition-colors duration-150"
              style={pillStyle}><ChevronLeft size={14} /></button>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 px-1">{page} / {totalPages}</span>
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
              className="p-1 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed text-slate-500 dark:text-slate-400 transition-colors duration-150"
              style={pillStyle}><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}