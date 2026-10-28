"use client";

import { motion } from "framer-motion";
import { BookOpenCheck, CalendarClock, Languages, Sparkles, Trophy } from "lucide-react";
import Image from "next/image";
import { scrollToSection } from "../utils";

const HERO_IMAGE = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80&auto=format&fit=crop";
const CLASSROOM_IMAGE = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80&auto=format&fit=crop";

const TRUST = [
  { icon: Languages, label: "Telugu + English medium" },
  { icon: BookOpenCheck, label: "Batches of 18–45 only" },
  { icon: CalendarClock, label: "Mock tests every Sunday" },
  { icon: Trophy, label: "Rank cards in 48 hours" }
];

export default function Hero() {
  return (
    <section id="hero" className="bp-grid-bg relative overflow-hidden bg-white px-5 pb-20 pt-12 md:px-8 md:pb-28 md:pt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#E05A33]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-6rem] left-[-4rem] h-72 w-72 rounded-full bg-[#FDEBDD] blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
          <span className="bp-font-display inline-flex items-center gap-2 rounded-full border border-[#E05A33]/30 bg-[#FDEBDD] px-4 py-2 text-[14px] font-semibold text-[#C94A25]">
            <Sparkles className="h-4 w-4" strokeWidth={2.3} />
            500+ Distinctions in 2024
          </span>

          <h1 className="bp-font-display mt-6 text-[38px] font-extrabold leading-[1.08] tracking-tight text-[#1A1A1A] sm:text-[52px] lg:text-[58px]">
            Your Path to{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#E05A33]">Success</span>
              <span className="absolute inset-x-0 bottom-1.5 z-0 h-3 rounded-full bg-[#E05A33]/25" />
            </span>{" "}
            Starts Here
          </h1>

          <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-[#6B7280]">
            BrightPath Academy has coached Nellore students for EAMCET, NEET, JEE and bank exams since 2014. Small
            batches, daily doubt-clearing and weekly mock tests — taught in the language you think in.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={() => scrollToSection("courses")}
              className="bp-font-display inline-flex items-center gap-2 rounded-full bg-[#E05A33] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_18px_34px_-16px_rgba(224,90,51,0.95)] transition-all hover:-translate-y-0.5 hover:bg-[#C94A25]"
            >
              Explore Courses
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("enquiry")}
              className="bp-font-display inline-flex items-center gap-2 rounded-full border-2 border-[#E05A33]/25 bg-white px-6 py-3.5 text-[15px] font-semibold text-[#E05A33] transition-all hover:-translate-y-0.5 hover:border-[#E05A33] hover:bg-[#FDEBDD]"
            >
              Book Free Counselling
            </button>
          </div>

          <div className="mt-10 grid gap-x-6 gap-y-3 border-t border-[#EAEAEA] pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-[14px] font-medium text-[#6B7280]">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#FDEBDD] text-[#E05A33]">
                  <Icon className="h-4 w-4" strokeWidth={2.2} />
                </span>
                {label}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 22 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -right-3 -top-3 hidden h-40 w-40 rounded-[28px] bg-[#E05A33]/15 sm:block" />
          <div className="absolute -bottom-5 -left-4 hidden h-32 w-32 rounded-[24px] bg-[#E05A33]/10 sm:block" />

          <div className="relative overflow-hidden rounded-[32px] border border-[#EAEAEA] bg-white shadow-[0_38px_70px_-34px_rgba(26,26,26,0.4)]">
            <div className="relative h-[330px] w-full sm:h-[420px]">
              <Image
                src={HERO_IMAGE}
                alt="BrightPath Academy students studying together at the Nellore coaching centre"
                fill
                priority
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 46vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/70 via-[#1A1A1A]/10 to-transparent" />
            </div>

            <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
              <div className="rounded-2xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
                <p className="bp-font-display text-[14px] font-bold text-[#1A1A1A]">Evening batch in progress</p>
                <p className="text-[11.5px] text-[#6B7280]">MPC · 6th Floor, Stadium Road</p>
              </div>
              <div className="relative hidden h-20 w-28 overflow-hidden rounded-2xl border-2 border-white/70 shadow-lg sm:block">
                <Image
                  src={CLASSROOM_IMAGE}
                  alt="BrightPath students revising together in the self-study room"
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute -left-2 top-8 rounded-2xl border border-[#EAEAEA] bg-white px-4 py-3 shadow-[0_20px_38px_-22px_rgba(26,26,26,0.55)] sm:-left-6"
          >
            <p className="bp-font-display text-[22px] font-extrabold leading-none text-[#E05A33]">99.86</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-[#6B7280]">EAMCET pct · 2025</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1.2 }}
            className="absolute -right-1 bottom-24 rounded-2xl border border-[#EAEAEA] bg-white px-4 py-3 shadow-[0_20px_38px_-22px_rgba(26,26,26,0.55)] sm:-right-5"
          >
            <p className="bp-font-display text-[22px] font-extrabold leading-none text-[#E05A33]">42</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-[#6B7280]">NEET selections</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
