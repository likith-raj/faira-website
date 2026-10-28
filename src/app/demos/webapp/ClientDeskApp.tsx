"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Inbox,
  FolderKanban,
  BarChart3,
  Settings,
  Search,
  Sparkles,
  ChevronRight,
  Phone,
  Building2,
  CalendarDays,
  ArrowUpRight,
  SlidersHorizontal,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  CLIENTS,
  ENQUIRIES,
  ENQUIRIES_PER_WEEK,
  REVENUE_6_MONTHS,
  CLIENT_TYPE_SPLIT,
  CLIENT_TYPE_COLORS,
  STATUS_STYLES,
  formatINR,
  initials,
  type Enquiry,
  type EnquiryStatus,
} from "./data";

type View = "Dashboard" | "Clients" | "Enquiries" | "Projects" | "Reports" | "Settings";

const NAV: { label: View; icon: typeof LayoutDashboard }[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Clients", icon: Users },
  { label: "Enquiries", icon: Inbox },
  { label: "Projects", icon: FolderKanban },
  { label: "Reports", icon: BarChart3 },
  { label: "Settings", icon: Settings },
];

const ALL_STATUSES: EnquiryStatus[] = ["New", "Contacted", "In Progress", "Converted"];

/* ---------- small building blocks ---------- */

function useCountUp(target: number, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

function StatCard({ label, target, prefix, suffix, trend, delay }: { label: string; target: number; prefix?: string; suffix?: string; trend: string; delay: number }) {
  const value = useCountUp(target);
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45 }}
      className="cd-panel rounded-xl p-4"
    >
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">{label}</p>
      <p className="cd-mono mt-2 text-2xl font-bold text-[#1A1A1A]">
        {prefix}
        {value.toLocaleString("en-IN")}
        {suffix}
      </p>
      <p className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-[#16A34A]">
        <ArrowUpRight className="h-3 w-3" /> {trend}
      </p>
    </motion.div>
  );
}

function ChartTooltip({ active, payload, label, formatter }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[#EAEAEA] bg-white px-3 py-2 shadow-[0_12px_32px_rgba(26,26,26,0.08)]">
      <p className="text-[11px] font-semibold text-[#6B7280]">{label}</p>
      {payload.map((e: any, i: number) => (
        <p key={i} className="cd-mono text-sm font-bold text-[#1A1A1A]" style={{ color: e.color ?? e.payload?.fill ?? "#E05A33" }}>
          {formatter ? formatter(e.value) : e.value}
        </p>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: EnquiryStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap"
      style={{ background: s.bg, color: s.color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.dot }} />
      {status}
    </span>
  );
}

function SectionTitle({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <h3 className="cd-display text-sm font-bold tracking-wide text-[#1A1A1A]">{children}</h3>
      {right}
    </div>
  );
}

function EnquiryFilters({
  query,
  setQuery,
  status,
  setStatus,
  total,
  shown,
}: {
  query: string;
  setQuery: (v: string) => void;
  status: "All" | EnquiryStatus;
  setStatus: (v: "All" | EnquiryStatus) => void;
  total: number;
  shown: number;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="cd-mono text-[11px] text-[#6B7280]">
        {shown}/{total} shown
      </span>
      <label className="relative">
        <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9CA3AF]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search business, contact, service…"
          className="w-56 rounded-lg border border-[#EAEAEA] bg-white py-1.5 pl-8 pr-3 text-xs text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:border-[#E05A33] focus:outline-none"
        />
      </label>
      <label className="relative">
        <SlidersHorizontal className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9CA3AF]" />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "All" | EnquiryStatus)}
          className="appearance-none rounded-lg border border-[#EAEAEA] bg-white py-1.5 pl-8 pr-6 text-xs text-[#1A1A1A] focus:border-[#E05A33] focus:outline-none"
        >
          <option>All</option>
          {ALL_STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <ChevronRight className="pointer-events-none absolute right-1.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rotate-90 text-[#9CA3AF]" />
      </label>
    </div>
  );
}

function useEnquiryFilter(list: Enquiry[], query: string, status: "All" | EnquiryStatus) {
  return useMemo(
    () =>
      list.filter((e) => {
        const q = query.trim().toLowerCase();
        const matchesQ =
          !q ||
          e.business.toLowerCase().includes(q) ||
          e.contact.toLowerCase().includes(q) ||
          e.service.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q) ||
          e.phone.includes(q);
        const matchesS = status === "All" || e.status === status;
        return matchesQ && matchesS;
      }),
    [list, query, status]
  );
}

function EnquiryTable({ rows, dense }: { rows: Enquiry[]; dense?: boolean }) {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#EAEAEA] bg-[#F9F8F6] py-10 text-center text-xs text-[#6B7280]">
        No enquiries match your filters.
      </div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-[#EAEAEA]">
      <table className="w-full min-w-[720px] text-left text-xs">
        <thead>
          <tr className="border-b border-[#EAEAEA] bg-[#F9F8F6] text-[10px] uppercase tracking-wider text-[#6B7280]">
            <th className="px-4 py-3 font-semibold">Enquiry</th>
            <th className="px-4 py-3 font-semibold">Service requested</th>
            <th className="px-4 py-3 font-semibold">Source</th>
            <th className="px-4 py-3 font-semibold">City</th>
            <th className="px-4 py-3 text-right font-semibold">Estimate</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            {!dense && <th className="px-4 py-3 font-semibold">Received</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((e) => (
            <tr key={e.id} className="border-b border-[#EAEAEA] transition-colors last:border-0 hover:bg-[#FDEBDD]/40">
              <td className="px-4 py-3">
                <p className="font-semibold text-[#1A1A1A]">{e.business}</p>
                <p className="mt-0.5 text-[11px] text-[#6B7280]">
                  {e.contact} · <span className="cd-mono">{e.phone}</span>
                </p>
              </td>
              <td className="px-4 py-3 text-[#6B7280]">{e.service}</td>
              <td className="px-4 py-3 text-[#6B7280]">{e.source}</td>
              <td className="px-4 py-3 text-[#6B7280]">{e.city}</td>
              <td className="cd-mono px-4 py-3 text-right font-semibold text-[#1A1A1A]">{formatINR(e.amount)}</td>
              <td className="px-4 py-3">
                <StatusBadge status={e.status} />
              </td>
              {!dense && <td className="px-4 py-3 text-[#6B7280]">{e.date}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- views ---------- */

function DashboardView() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | EnquiryStatus>("All");
  const rows = useEnquiryFilter(ENQUIRIES, query, status);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Total Clients" target={148} trend="12 new this month" delay={0} />
        <StatCard label="Open Enquiries" target={23} trend="8 from WhatsApp" delay={0.06} />
        <StatCard label="Active Projects" target={9} trend="3 shipping in Nov" delay={0.12} />
        <StatCard label="Revenue this month" target={186400} prefix="₹" trend="+8.5% vs Sep" delay={0.18} />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="cd-panel rounded-xl p-4 lg:col-span-3">
          <SectionTitle right={<span className="cd-mono text-[11px] text-[#6B7280]">May – Oct 2026</span>}>
            Revenue (₹ INR)
          </SectionTitle>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_6_MONTHS} margin={{ top: 6, right: 6, left: -14, bottom: 0 }}>
                <defs>
                  <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E05A33" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#E05A33" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#EAEAEA" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "#1A1A1A", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fill: "#1A1A1A", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `${Math.round(v / 1000)}k`}
                />
                <Tooltip content={<ChartTooltip formatter={(v: number) => formatINR(v)} />} cursor={{ stroke: "#E05A33", strokeOpacity: 0.3 }} />
                <Area type="monotone" dataKey="revenue" stroke="#E05A33" strokeWidth={2.5} fill="url(#revFill)" dot={{ r: 3, fill: "#E05A33", stroke: "#FFFFFF" }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="cd-panel rounded-xl p-4 lg:col-span-2">
          <SectionTitle>Clients by type</SectionTitle>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CLIENT_TYPE_SPLIT}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="58%"
                  outerRadius="88%"
                  paddingAngle={3}
                  stroke="#FFFFFF"
                  strokeWidth={2}
                >
                  {CLIENT_TYPE_SPLIT.map((s) => (
                    <Cell key={s.name} fill={CLIENT_TYPE_COLORS[s.name as keyof typeof CLIENT_TYPE_COLORS]} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip formatter={(v: number) => `${v} clients`} />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1.5">
            {CLIENT_TYPE_SPLIT.map((s) => (
              <span key={s.name} className="inline-flex items-center gap-1.5 text-[11px] text-[#6B7280]">
                <span className="h-2 w-2 rounded-full" style={{ background: CLIENT_TYPE_COLORS[s.name as keyof typeof CLIENT_TYPE_COLORS] }} />
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="cd-panel rounded-xl p-4">
        <SectionTitle right={<span className="cd-mono text-[11px] text-[#6B7280]">last 8 weeks</span>}>
          Enquiries per week
        </SectionTitle>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ENQUIRIES_PER_WEEK} margin={{ top: 6, right: 6, left: -22, bottom: 0 }}>
              <CartesianGrid stroke="#EAEAEA" vertical={false} />
              <XAxis dataKey="week" tick={{ fill: "#1A1A1A", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#1A1A1A", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<ChartTooltip formatter={(v: number) => `${v} enquiries`} />} cursor={{ fill: "rgba(224,90,51,0.06)" }} />
              <Bar dataKey="count" fill="#E05A33" radius={[5, 5, 0, 0]} maxBarSize={26} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="cd-panel rounded-xl p-4">
        <SectionTitle right={<EnquiryFilters query={query} setQuery={setQuery} status={status} setStatus={setStatus} total={ENQUIRIES.length} shown={rows.length} />}>
          Recent enquiries
        </SectionTitle>
        <EnquiryTable rows={rows.slice(0, 7)} dense />
      </div>
    </div>
  );
}

function ClientsView() {
  const [query, setQuery] = useState("");
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CLIENTS;
    return CLIENTS.filter(
      (c) =>
        c.business.toLowerCase().includes(q) ||
        c.owner.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.type.toLowerCase().includes(q) ||
        c.phone.includes(q)
    );
  }, [query]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SectionTitle>
          <span className="text-base">Clients</span>
        </SectionTitle>
        <label className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 10 active clients…"
            className="w-64 rounded-lg border border-[#EAEAEA] bg-white py-2 pl-9 pr-3 text-xs text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:border-[#E05A33] focus:outline-none"
          />
        </label>
      </div>

      {rows.length === 0 ? (
        <div className="cd-panel rounded-xl border-dashed py-12 text-center text-sm text-[#6B7280]">
          No clients match “{query}”.
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {rows.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
              className="cd-panel group rounded-xl p-4"
            >
              <div className="flex items-start gap-3">
                <span
                  className="cd-display grid h-11 w-11 shrink-0 place-items-center rounded-lg text-sm font-bold text-[#C94A25]"
                  style={{ background: "#FDEBDD" }}
                >
                  {initials(c.business)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#1A1A1A]">{c.business}</p>
                  <p className="mt-0.5 text-[11px] text-[#6B7280]">
                    {c.owner} · <span style={{ color: CLIENT_TYPE_COLORS[c.type] }}>{c.type}</span>
                  </p>
                </div>
                <span className="cd-mono ml-auto shrink-0 text-[10px] text-[#9CA3AF]">{c.id}</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-[#6B7280]">
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5" /> {c.city}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" /> <span className="cd-mono">{c.phone}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FolderKanban className="h-3.5 w-3.5" /> {c.openProjects} open project{c.openProjects === 1 ? "" : "s"}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" /> since {c.since}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-[#EAEAEA] pt-2.5 text-[11px]">
                <span className="text-[#9CA3AF]">Last contact</span>
                <span className="font-semibold text-[#1A1A1A]">{c.lastContact}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function EnquiriesView() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | EnquiryStatus>("All");
  const rows = useEnquiryFilter(ENQUIRIES, query, status);
  const pipelineValue = ENQUIRIES.filter((e) => e.status !== "Converted").reduce((s, e) => s + e.amount, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {ALL_STATUSES.map((s, i) => {
          const count = ENQUIRIES.filter((e) => e.status === s).length;
          return <StatCard key={s} label={`${s} · ${count}`} target={count} trend={s === "Converted" ? "closed-won" : "needs follow-up"} delay={i * 0.05} />;
        })}
      </div>
      <div className="cd-panel rounded-xl p-4">
        <SectionTitle
          right={
            <div className="flex flex-wrap items-center gap-2">
              <span className="cd-mono text-[11px] text-[#6B7280]">Pipeline value {formatINR(pipelineValue)}</span>
              <EnquiryFilters query={query} setQuery={setQuery} status={status} setStatus={setStatus} total={ENQUIRIES.length} shown={rows.length} />
            </div>
          }
        >
          All enquiries
        </SectionTitle>
        <EnquiryTable rows={rows} />
      </div>
    </div>
  );
}

function PlaceholderView({ view }: { view: View }) {
  const icon = NAV.find((n) => n.label === view)?.icon ?? Settings;
  const Icon = icon;
  return (
    <div className="cd-panel flex min-h-[380px] flex-col items-center justify-center rounded-xl p-10 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#FDEBDD] text-[#E05A33]">
        <Icon className="h-7 w-7" />
      </span>
      <h3 className="cd-display mt-4 text-lg font-bold text-[#1A1A1A]">{view} module</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-[#6B7280]">
        This is where your <strong className="text-[#1A1A1A]">{view.toLowerCase()}</strong> workspace would live in your
        custom build — wired to your real data, your logo and your team’s roles. In this demo Dashboard, Clients and
        Enquiries are fully interactive.
      </p>
      <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#EAEAEA] bg-[#FDEBDD] px-4 py-1.5 text-xs font-semibold text-[#C94A25]">
        <Sparkles className="h-3.5 w-3.5" /> Included in your FAIRA build
      </span>
    </div>
  );
}

/* ---------- app shell ---------- */

export default function ClientDeskApp() {
  const [view, setView] = useState<View>("Dashboard");
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#EAEAEA] bg-white shadow-[0_12px_32px_rgba(26,26,26,0.08)]">
      {/* browser chrome */}
      <div className="flex items-center gap-3 border-b border-[#EAEAEA] bg-[#F9F8F6] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex max-w-sm flex-1 items-center justify-center gap-2 rounded-md border border-[#EAEAEA] bg-white px-3 py-1">
          <svg viewBox="0 0 24 24" className="h-3 w-3 text-[#16A34A]" fill="currentColor" aria-hidden>
            <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm3 8H9V7a3 3 0 1 1 6 0v3z" />
          </svg>
          <span className="cd-mono text-[11px] text-[#6B7280]">app.faira.in/client-desk</span>
        </div>
        <span className="hidden rounded-full bg-[rgba(22,163,74,0.10)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#16A34A] sm:inline">
          Live demo
        </span>
      </div>

      {/* app body */}
      <div className="flex min-h-[620px] flex-col md:flex-row">
        {/* sidebar */}
        <aside className="flex shrink-0 flex-col border-b border-[#EAEAEA] bg-[#F9F8F6] p-3 md:w-52 md:border-b-0 md:border-r">
          <div className="mb-4 flex items-center gap-2 px-1.5 py-1">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#E05A33] text-sm font-black text-white">F</span>
            <div>
              <p className="cd-display text-[13px] font-bold leading-tight text-[#1A1A1A]">ClientDesk</p>
              <p className="text-[10px] tracking-wide text-[#6B7280]">by FAIRA · Nellore</p>
            </div>
          </div>
          <nav className="flex gap-1 overflow-x-auto md:flex-col">
            {NAV.map(({ label, icon: Icon }) => {
              const active = view === label;
              return (
                <button
                  key={label}
                  onClick={() => {
                    setView(label);
                    mainRef.current?.scrollTo({ top: 0 });
                  }}
                  className={`relative flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                    active ? "text-[#C94A25]" : "text-[#6B7280] hover:bg-white hover:text-[#1A1A1A]"
                  }`}
                >
                  {active && (
                    <span className="absolute inset-0 rounded-lg bg-[#FDEBDD]" />
                  )}
                  <Icon className="relative h-4 w-4" />
                  <span className="relative">{label}</span>
                </button>
              );
            })}
          </nav>
          <div className="mt-auto hidden items-center gap-2.5 rounded-lg border border-[#EAEAEA] bg-white p-2.5 md:flex">
            <span className="cd-display grid h-8 w-8 place-items-center rounded-md bg-[#FDEBDD] text-xs font-bold text-[#E05A33]">SK</span>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold text-[#1A1A1A]">Sai Kumar</p>
              <p className="text-[10px] text-[#6B7280]">Admin · FAIRA Studio</p>
            </div>
          </div>
        </aside>

        {/* main */}
        <div ref={mainRef} className="cd-grid-bg min-w-0 flex-1 overflow-x-hidden p-4 md:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="cd-display text-lg font-bold text-[#1A1A1A]">{view}</h2>
              <p className="text-[11px] text-[#6B7280]">
                Wednesday, 28 Oct 2026 · {ENQUIRIES.filter((e) => e.status === "New").length} new enquiries today
              </p>
            </div>
            <span className="hidden items-center gap-1.5 rounded-full border border-[#EAEAEA] bg-white px-3 py-1.5 text-[11px] text-[#6B7280] sm:inline-flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E05A33]" /> Sample data — click around
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {view === "Dashboard" && <DashboardView />}
              {view === "Clients" && <ClientsView />}
              {view === "Enquiries" && <EnquiriesView />}
              {(view === "Projects" || view === "Reports" || view === "Settings") && <PlaceholderView view={view} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
