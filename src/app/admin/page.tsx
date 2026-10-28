"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Phone,
  Mail,
  Zap,
  LogOut,
  Search,
  X,
  Inbox,
  TrendingUp,
  Users2,
  CheckCircle2
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { AnimatePresence, motion } from "framer-motion";
import { isAdmin, logout } from "@/lib/admin-auth";
import { listEnquiries, updateEnquiry } from "@/lib/enquiries";
import { Enquiry, EnquiryStatus, SERVICE_OPTIONS, serviceLabel } from "@/lib/enquiry-types";
import { cn } from "@/lib/utils";
import { Counter, EmptyState, Skeleton, StatusBadge } from "@/components/ui";

const STATUSES: EnquiryStatus[] = ["New", "Contacted", "In Progress", "Converted", "Closed"];
const CHART_COLORS = ["#E05A33", "#A8471F", "#16A34A", "#D97706", "#F97316", "#DC2626", "#B45309", "#9CA3AF"];

export default function AdminDashboard() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [rows, setRows] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!isAdmin()) {
      router.replace("/admin/login");
      return;
    }
    setReady(true);
    listEnquiries().then((r) => {
      setRows(r);
      setLoading(false);
    });
  }, [router]);

  const filtered = useMemo(
    () =>
      rows.filter((r) => {
        const text = `${r.business_name} ${r.contact_name} ${r.phone} ${r.email} ${r.city}`.toLowerCase();
        return (
          (!q || text.includes(q.toLowerCase())) &&
          (statusFilter === "all" || r.status === statusFilter) &&
          (typeFilter === "all" || r.business_type === typeFilter)
        );
      }),
    [rows, q, statusFilter, typeFilter]
  );

  const stats = useMemo(() => {
    const weekAgo = Date.now() - 7 * 86400000;
    return {
      total: rows.length,
      newThisWeek: rows.filter((r) => new Date(r.created_at).getTime() > weekAgo).length,
      inProgress: rows.filter((r) => r.status === "In Progress" || r.status === "Contacted").length,
      converted: rows.filter((r) => r.status === "Converted").length
    };
  }, [rows]);

  const perWeek = useMemo(() => {
    const buckets: Record<string, number> = {};
    rows.forEach((r) => {
      const d = new Date(r.created_at);
      const key = `W${Math.ceil(((d.getTime() - new Date(d.getFullYear(), 0, 1).getTime()) / 86400000 + d.getDay()) / 7)}`;
      buckets[key] = (buckets[key] || 0) + 1;
    });
    return Object.entries(buckets)
      .slice(-8)
      .map(([w, n]) => ({ week: w, enquiries: n }));
  }, [rows]);

  const byService = useMemo(() => {
    const counts: Record<string, number> = {};
    rows.forEach((r) => r.service_needed.forEach((s) => (counts[serviceLabel(s)] = (counts[serviceLabel(s)] || 0) + 1)));
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [rows]);

  async function changeStatus(id: string, status: EnquiryStatus) {
    await updateEnquiry(id, { status });
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    if (selected?.id === id) setSelected({ ...selected, status });
  }

  async function saveNotes() {
    if (!selected) return;
    await updateEnquiry(selected.id, { internal_notes: notes });
    setRows((rs) => rs.map((r) => (r.id === selected.id ? { ...r, internal_notes: notes } : r)));
    setSelected({ ...selected, internal_notes: notes });
  }

  if (!ready) return null;

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-8 md:px-8">
        {/* topbar */}
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--border)] pb-5">
          <div className="flex items-center gap-3">
            <Link href="/" className="grid h-9 w-9 place-items-center rounded-lg bg-brand-gradient text-bg shadow-glow">
              <Zap className="h-4 w-4" strokeWidth={2.4} />
            </Link>
            <div>
              <h1 className="font-display text-lg font-bold leading-tight">FAIRA Admin</h1>
              <p className="mono-label">Enquiry dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/quote?source=admin-test" className="text-sm text-ink-dim hover:text-accent">
              View site form ↗
            </Link>
            <button
              onClick={() => {
                logout();
                router.replace("/admin/login");
              }}
              className="focus-ring inline-flex items-center gap-2 rounded-xl border border-[color:var(--border-strong)] px-4 py-2 text-sm hover:border-rose/50 hover:text-rose"
            >
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </div>
        </header>

        {/* stat cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Inbox, label: "Total enquiries", value: stats.total, color: "text-accent" },
            { icon: TrendingUp, label: "New this week", value: stats.newThisWeek, color: "text-mint" },
            { icon: Users2, label: "In progress", value: stats.inProgress, color: "text-amber" },
            { icon: CheckCircle2, label: "Converted", value: stats.converted, color: "text-violet" }
          ].map((s, i) =>
            loading ? (
              <Skeleton key={i} className="h-28" />
            ) : (
              <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <div className="glass flex items-center justify-between p-5">
                  <div>
                    <p className="mono-label">{s.label}</p>
                    <p className={cn("mt-2 font-display text-3xl font-bold", s.color)}>
                      <Counter value={s.value} />
                    </p>
                  </div>
                  <s.icon className={cn("h-8 w-8 opacity-60", s.color)} />
                </div>
              </motion.div>
            )
          )}
        </div>

        {/* charts */}
        <div className="mb-8 grid gap-4 lg:grid-cols-2">
          <div className="glass p-5">
            <p className="mono-label mb-4">Enquiries per week</p>
            {loading ? (
              <Skeleton className="h-56" />
            ) : (
              <ResponsiveContainer width="100%" height={224}>
                <BarChart data={perWeek}>
                  <CartesianGrid stroke="rgba(224,90,51,0.15)" vertical={false} />
                  <XAxis dataKey="week" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(224,90,51,0.06)" }} />
                  <Bar dataKey="enquiries" fill="#E05A33" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="glass p-5">
            <p className="mono-label mb-4">Service demand</p>
            {loading ? (
              <Skeleton className="h-56" />
            ) : byService.length === 0 ? (
              <EmptyState title="No service data yet" />
            ) : (
              <ResponsiveContainer width="100%" height={224}>
                <PieChart>
                  <Pie data={byService} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3} stroke="none">
                    {byService.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            )}
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {byService.map((s, i) => (
                <span key={s.name} className="flex items-center gap-1.5 text-xs text-ink-dim">
                  <i className="h-2.5 w-2.5 rounded-full" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                  {s.name} ({s.value})
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* filters */}
        <div className="glass mb-4 flex flex-wrap items-center gap-3 p-4">
          <div className="relative min-w-52 flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              className="input pl-10"
              placeholder="Search name, business, phone, city…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <select className="input !w-auto" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Filter by status">
            <option value="all">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select className="input !w-auto" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} aria-label="Filter by business type">
            <option value="all">All types</option>
            {[...new Set(rows.map((r) => r.business_type))].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* table */}
        <div className="glass overflow-hidden !p-0">
          {loading ? (
            <div className="space-y-2 p-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-6">
              <EmptyState title="No enquiries match" hint="Adjust the search or filters above." />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-[color:var(--border)] text-xs uppercase tracking-wider text-ink-faint">
                  <tr>
                    <th className="px-5 py-3.5 font-medium">Business</th>
                    <th className="px-5 py-3.5 font-medium">Contact</th>
                    <th className="px-5 py-3.5 font-medium">Services</th>
                    <th className="px-5 py-3.5 font-medium">Budget</th>
                    <th className="px-5 py-3.5 font-medium">Status</th>
                    <th className="px-5 py-3.5 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr
                      key={r.id}
                      onClick={() => {
                        setSelected(r);
                        setNotes(r.internal_notes);
                      }}
                      className="cursor-pointer border-b border-[color:var(--border)] transition-colors last:border-0 hover:bg-bg-2"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold">{r.business_name}</p>
                        <p className="text-xs text-ink-faint">{r.business_type}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p>{r.contact_name}</p>
                        <p className="text-xs text-ink-faint">{r.phone || r.email}</p>
                      </td>
                      <td className="px-5 py-4 text-ink-dim">
                        {r.service_needed.slice(0, 2).map(serviceLabel).join(", ")}
                        {r.service_needed.length > 2 && ` +${r.service_needed.length - 2}`}
                      </td>
                      <td className="px-5 py-4 text-ink-dim">{r.budget_range}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={r.status} />
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-ink-faint">
                        {new Date(r.created_at).toLocaleDateString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* detail drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-[color:var(--border)] bg-bg-2 p-6 shadow-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              aria-label="Enquiry details"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-display text-xl font-bold">{selected.business_name}</h2>
                  <p className="mono-label mt-1">{selected.business_type} · {selected.city}</p>
                </div>
                <button aria-label="Close" onClick={() => setSelected(null)} className="focus-ring rounded-lg p-2 text-ink-faint hover:text-ink">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-5 space-y-4 text-sm">
                <Field label="Contact person">{selected.contact_name}</Field>
                <Field label="Phone / email">
                  <div className="flex flex-wrap gap-2">
                    {selected.phone && (
                      <a href={`tel:${selected.phone}`} className="inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--border)] px-3 py-1.5 text-accent hover:border-accent/50">
                        <Phone className="h-3.5 w-3.5" /> {selected.phone}
                      </a>
                    )}
                    {selected.email && (
                      <a href={`mailto:${selected.email}`} className="inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--border)] px-3 py-1.5 text-accent hover:border-accent/50">
                        <Mail className="h-3.5 w-3.5" /> {selected.email}
                      </a>
                    )}
                  </div>
                </Field>
                <Field label="Services needed">
                  <div className="flex flex-wrap gap-1.5">
                    {selected.service_needed.map((s) => (
                      <span key={s} className="rounded-full bg-soft px-3 py-1 text-xs text-ink-dim">
                        {serviceLabel(s)}
                      </span>
                    ))}
                  </div>
                </Field>
                <Field label="Budget / timeline">
                  {selected.budget_range} · {selected.timeline}
                </Field>
                {selected.message && <Field label="Message">“{selected.message}”</Field>}
                <Field label="Source">{selected.source} · {new Date(selected.created_at).toLocaleString("en-IN")}</Field>
              </div>

              <div className="mt-6 border-t border-[color:var(--border)] pt-5">
                <p className="mono-label mb-3">Status</p>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => changeStatus(selected.id, s)}
                      className={cn(
                        "focus-ring rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                        selected.status === s
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-[color:var(--border)] text-ink-dim hover:border-[color:var(--border-strong)]"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="mono-label mb-2">Internal notes</p>
                <textarea
                  className="input min-h-28 resize-y"
                  placeholder="Call outcome, next steps…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <button
                  onClick={saveNotes}
                  className="focus-ring mt-3 w-full rounded-xl bg-brand-gradient py-2.5 text-sm font-bold text-bg hover:bg-[#C94A25]"
                >
                  Save notes
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

const tooltipStyle = {
  background: "#161210",
  border: "1px solid rgba(224,90,51,0.3)",
  borderRadius: 10,
  fontSize: 12,
  color: "#F9F8F6"
} as const;

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mono-label mb-1.5">{label}</p>
      <div className="text-ink">{children}</div>
    </div>
  );
}
