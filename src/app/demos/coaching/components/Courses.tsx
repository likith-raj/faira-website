"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Clock, Users, Wallet } from "lucide-react";
import { useState } from "react";
import { COURSES, FILTERS, type CourseCategory } from "../data";
import { INR } from "../utils";
import { Reveal, Section, SectionHeading } from "./Section";

const CATEGORY_TINT: Record<CourseCategory, { bg: string; fg: string }> = {
  EAMCET: { bg: "#FDEBDD", fg: "#E05A33" },
  NEET: { bg: "#FDEBDD", fg: "#C94A25" },
  JEE: { bg: "#ECFEFF", fg: "#0E7490" },
  "Bank Exams": { bg: "#F0FDF4", fg: "#15803D" },
  "School Tuitions": { bg: "#FDF4FF", fg: "#86198F" },
  "Spoken English": { bg: "#FEF9C3", fg: "#854D0E" }
};

export default function Courses({ onEnquire }: { onEnquire: (courseName: string) => void }) {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");
  const visible = active === "All" ? COURSES : COURSES.filter((c) => c.category === active);

  return (
    <Section id="courses" tone="white">
      <SectionHeading
        eyebrow="Courses & Batches"
        title={
          <>
            Pick the batch that matches <span className="text-[#E05A33]">your exam</span>
          </>
        }
        subtitle="Every programme runs on a fixed timetable with a named faculty owner, a printed test calendar and a fee that does not change mid-year."
      />

      <div className="mt-9 flex flex-wrap justify-center gap-2.5">
        {FILTERS.map((f) => {
          const isActive = active === f;
          const count = f === "All" ? COURSES.length : COURSES.filter((c) => c.category === f).length;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              aria-pressed={isActive}
              className={`bp-font-display relative rounded-full border px-4 py-2 text-[14px] font-semibold transition-all ${
                isActive
                  ? "border-transparent text-white shadow-[0_14px_26px_-14px_rgba(224,90,51,0.9)]"
                  : "border-[#EAEAEA] bg-white text-[#6B7280] hover:border-[#E05A33]/40 hover:bg-[#FDEBDD] hover:text-[#E05A33]"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="course-filter-pill"
                  className="absolute inset-0 rounded-full bg-[#E05A33]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                {f}
                <span className={`ml-1.5 text-[12px] ${isActive ? "text-[#FFD6BC]" : "text-[#6B7280]"}`}>{count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((c, i) => {
            const tint = CATEGORY_TINT[c.category];
            return (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, y: 22, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.97 }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.24) }}
                className="bp-card flex h-full flex-col rounded-[26px] border border-[#EAEAEA] bg-white p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className="bp-font-display rounded-full px-3 py-1 text-[11.5px] font-bold uppercase tracking-wider"
                    style={{ background: tint.bg, color: tint.fg }}
                  >
                    {c.category}
                  </span>
                  {c.ribbon && (
                    <span className="bp-font-display inline-flex items-center gap-1 rounded-full bg-[#FDEBDD] px-3 py-1 text-[11.5px] font-bold text-[#C94A25] ring-1 ring-[#E05A33]/30">
                      {c.ribbon}
                    </span>
                  )}
                </div>

                <h3 className="bp-font-display mt-4 text-[19px] font-bold leading-snug text-[#1A1A1A]">{c.name}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#6B7280]">{c.tagline}</p>

                <dl className="mt-4 grid gap-2 rounded-2xl bg-[#F9F8F6] p-3.5 text-[14px]">
                  <div className="flex items-center gap-2 text-[#6B7280]">
                    <Clock className="h-4 w-4 text-[#E05A33]" strokeWidth={2.2} />
                    <dt className="sr-only">Duration</dt>
                    <dd className="bp-font-display font-semibold">{c.duration}</dd>
                  </div>
                  <div className="flex items-center gap-2 text-[#6B7280]">
                    <Users className="h-4 w-4 text-[#E05A33]" strokeWidth={2.2} />
                    <dt className="sr-only">Batch size</dt>
                    <dd className="bp-font-display font-semibold">Max {c.batchSize} students</dd>
                  </div>
                  <div className="flex items-center gap-2 text-[#6B7280]">
                    <Wallet className="h-4 w-4 text-[#E05A33]" strokeWidth={2.2} />
                    <dt className="sr-only">Batch timing</dt>
                    <dd>{c.timing}</dd>
                  </div>
                </dl>

                <ul className="mt-4 flex-1 space-y-2">
                  {c.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-[14px] leading-relaxed text-[#6B7280]">
                      <span className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-[#FDEBDD]">
                        <Check className="h-3 w-3 text-[#C94A25]" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-end justify-between gap-3 border-t border-dashed border-[#EAEAEA] pt-4">
                  <div>
                    <p className="bp-font-display text-[24px] font-extrabold leading-none text-[#E05A33]">
                      {INR(c.fee)}
                    </p>
                    <p className="mt-1 text-[11.5px] text-[#6B7280]">{c.feeNote}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onEnquire(c.name)}
                    className="bp-font-display group inline-flex items-center gap-1.5 rounded-full border-2 border-[#E05A33]/25 px-4 py-2.5 text-[14px] font-semibold text-[#E05A33] transition-all hover:bg-[#E05A33] hover:text-white"
                  >
                    Enquire
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.4} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <Reveal className="mx-auto mt-10 max-w-3xl rounded-2xl border border-[#E05A33]/30 bg-[#FDEBDD] px-5 py-4 text-center text-[14px] leading-relaxed text-[#C94A25]">
        Sibling and repeat-student concessions of up to 15% apply. Fees are payable in three instalments — no lump sum
        required at admission.
      </Reveal>
    </Section>
  );
}
