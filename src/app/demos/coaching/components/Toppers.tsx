"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { RESULTS, TOPPERS } from "../data";
import { Reveal, Section, SectionHeading } from "./Section";

export default function Toppers() {
  return (
    <Section id="results" tone="white">
      <SectionHeading
        eyebrow="Our Toppers"
        title={
          <>
            Ranks that came from <span className="text-[#E05A33]">consistent weeks</span>, not last-minute tricks
          </>
        }
        subtitle="A snapshot of the 2024–25 result board at the Stadium Road centre. Full merit list is displayed at the reception."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {TOPPERS.map((t, i) => (
          <motion.article
            key={t.name}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            className="relative overflow-hidden rounded-[26px] border border-[#EAEAEA] bg-white p-6 shadow-[0_26px_46px_-30px_rgba(26,26,26,0.35)]"
          >
            <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${t.tint}`} />
            <div className="flex items-center gap-4">
              <span
                className={`bp-font-display grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${t.tint} text-[22px] font-extrabold text-white shadow-[0_16px_28px_-16px_rgba(26,26,26,0.7)]`}
              >
                {t.initials}
              </span>
              <div className="min-w-0">
                <p className="bp-font-display text-[12px] font-bold uppercase tracking-[0.12em] text-[#E05A33]">
                  {t.exam}
                </p>
                <h3 className="bp-font-display truncate text-[18px] font-bold text-[#1A1A1A]">{t.name}</h3>
              </div>
            </div>

            <p className="bp-font-display mt-5 text-[38px] font-extrabold leading-none text-[#E05A33]">{t.score}</p>
            <p className="mt-1 text-[14px] font-medium text-[#6B7280]">{t.rank}</p>

            <div className="mt-5 flex items-start gap-2 border-t border-dashed border-[#EAEAEA] pt-4 text-[14px] leading-relaxed text-[#6B7280]">
              <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-[#E05A33]" strokeWidth={2.2} />
              <span>{t.now}</span>
            </div>
          </motion.article>
        ))}
      </div>

      <Reveal className="mt-10 overflow-hidden rounded-[26px] border border-[#EAEAEA] bg-[#F9F8F6]" delay={0.1}>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAEAEA] bg-white px-6 py-4">
          <h3 className="bp-font-display text-[16px] font-bold text-[#1A1A1A]">Result board — selected 2025 entries</h3>
          <p className="text-[12.5px] text-[#6B7280]">Names published with parent consent</p>
        </div>
        <ul className="grid sm:grid-cols-2">
          {RESULTS.map((r, i) => (
            <li
              key={r.name}
              className={`flex items-center justify-between gap-4 border-[#EAEAEA] px-6 py-3.5 text-[14px] ${
                i % 2 === 0 ? "sm:border-r" : ""
              } ${i < RESULTS.length - 2 ? "border-b" : ""}`}
            >
              <span className="bp-font-display font-semibold text-[#1A1A1A]">{r.name}</span>
              <span className="flex items-center gap-3 text-right">
                <span className="hidden text-[12px] font-semibold uppercase tracking-wide text-[#6B7280] sm:inline">
                  {r.exam}
                </span>
                <span className="rounded-full bg-[#FDEBDD] px-3 py-1 text-[12.5px] font-bold text-[#C94A25]">
                  {r.result}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <div className="bg-white px-6 py-4 text-center text-[14px] text-[#6B7280]">
          500+ students scored above 90 percentile in 2024 · 96% board pass rate · 42 NEET and 118 EAMCET selections
        </div>
      </Reveal>
    </Section>
  );
}
