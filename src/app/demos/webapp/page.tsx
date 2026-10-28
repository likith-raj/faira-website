"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap,
  ArrowRight,
  Activity,
  CalendarClock,
  Users,
  Boxes,
  FileDown,
  ShieldCheck,
  MousePointerClick,
} from "lucide-react";
import FairaDemoBadge from "@/components/FairaDemoBadge";
import ClientDeskApp from "./ClientDeskApp";

const FEATURES = [
  {
    icon: Activity,
    title: "Live dashboards",
    desc: "Revenue, footfall and job status on one screen — refreshed as your team works, with ₹ INR totals your CA will recognise.",
  },
  {
    icon: CalendarClock,
    title: "Booking & scheduling",
    desc: "Table reservations, clinic slots, batch timings and staff rosters — booked from WhatsApp or your website, no double-entries.",
  },
  {
    icon: Users,
    title: "CRM & follow-ups",
    desc: "Every enquiry tracked from first “Hi sir” to converted deal, with reminders so no customer from Nellore to Vijayawada slips away.",
  },
  {
    icon: Boxes,
    title: "Inventory",
    desc: "Stock levels, purchase orders and low-inventory alerts per outlet — built for kitchens, clinics, retail counters and coaching centres.",
  },
  {
    icon: FileDown,
    title: "Reports & exports",
    desc: "One-click monthly PDF/Excel reports: sales by item, dues by client, enquiry-to-close rates. Share straight to your family group.",
  },
  {
    icon: ShieldCheck,
    title: "Multi-user roles",
    desc: "Owner, manager, cashier, reception — each sees only what they should. Full activity logs so nothing happens off-record.",
  },
];

export default function WebAppDemoPage() {
  return (
    <>
      <FairaDemoBadge />

      {/* navbar */}
      <header className="sticky top-0 z-40 border-b border-[#EAEAEA] bg-[#F9F8F6]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#FDEBDD] text-[#E05A33]">
              <Zap className="h-4 w-4" strokeWidth={2.6} />
            </span>
            <span className="cd-display text-sm font-bold tracking-tight">
              ClientDesk <span className="text-[#6B7280] font-semibold">by FAIRA</span>
            </span>
          </div>
          <nav className="flex items-center gap-1 sm:gap-2">
            <a href="#live-demo" className="hidden rounded-lg px-3 py-2 text-xs font-semibold text-[#6B7280] transition-colors hover:text-[#1A1A1A] sm:block">
              Live Demo
            </a>
            <a href="#features" className="hidden rounded-lg px-3 py-2 text-xs font-semibold text-[#6B7280] transition-colors hover:text-[#1A1A1A] sm:block">
              Features
            </a>
            <Link
              href="/quote?service=webapp"
              className="rounded-lg bg-[#E05A33] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#C94A25]"
            >
              Request App
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 pb-24">
        {/* hero */}
        <section className="pt-16 pb-10 text-center sm:pt-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#EAEAEA] bg-[#FDEBDD] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#C94A25]">
              <MousePointerClick className="h-3.5 w-3.5" /> Interactive product demo
            </span>
            <h1 className="cd-display mx-auto mt-5 max-w-3xl text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl">
              Custom Web Apps That{" "}
              <span className="text-[#E05A33]">
                Run Your Business
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#6B7280] sm:text-base">
              Stop running your restaurant, clinic or coaching centre on notebooks, spreadsheets and scattered WhatsApp
              chats. FAIRA builds custom dashboards like the one below — your clients, enquiries, bookings and ₹ revenue
              in one place, designed for how Indian businesses actually operate. Everything on this page is a working
              demo: click the sidebar, search clients, filter enquiries.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/quote?service=webapp"
                className="inline-flex items-center gap-2 rounded-xl bg-[#E05A33] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#C94A25]"
              >
                Request a Similar App <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#live-demo"
                className="inline-flex items-center gap-2 rounded-xl border border-[#EAEAEA] bg-white px-6 py-3 text-sm font-semibold text-[#1A1A1A] transition-colors hover:border-[#E05A33] hover:text-[#E05A33]"
              >
                Try the demo below ↓
              </a>
            </div>
          </motion.div>
        </section>

        {/* the centerpiece */}
        <section id="live-demo" className="scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
          >
            <ClientDeskApp />
          </motion.div>
          <p className="mt-4 text-center text-xs text-[#9CA3AF]">
            Sample screen for demonstration — all businesses, enquiries and ₹ amounts shown are illustrative.
          </p>
        </section>

        {/* feature grid */}
        <section id="features" className="mt-24 scroll-mt-20">
          <div className="text-center">
            <h2 className="cd-display text-2xl font-extrabold sm:text-3xl">What goes inside your app</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-[#6B7280]">
              Every FAIRA web app ships with these modules — switched on, tuned and branded for your business.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <div className="cd-panel group h-full rounded-xl p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#FDEBDD] text-[#E05A33] transition-transform group-hover:scale-110">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <h3 className="cd-display mt-4 text-base font-bold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA band */}
        <section className="mt-24">
          <div className="relative overflow-hidden rounded-2xl border border-[#EAEAEA] bg-[#F9F8F6] p-8 text-center sm:p-12">
            <div className="cd-grid-bg absolute inset-0 opacity-40" />
            <div className="relative">
              <h2 className="cd-display text-2xl font-extrabold sm:text-3xl">Want this for your business?</h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-[#6B7280]">
                Tell us what you manage today — orders, patients, batches, stock — and FAIRA will build your version of
                ClientDesk in 3–4 weeks.
              </p>
              <Link
                href="/quote?service=webapp"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#E05A33] px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-[#C94A25]"
              >
                Request a similar app <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-4 text-xs text-[#9CA3AF]">
                Or explore our other demos at{" "}
                <Link href="/demos" className="font-semibold text-[#E05A33] hover:text-[#C94A25] hover:underline">
                  faira.in/demos
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
