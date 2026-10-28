"use client";

import { motion } from "framer-motion";
import { Award, BookOpen } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FACULTY, type Faculty as FacultyType } from "../data";
import { Reveal, Section, SectionHeading } from "./Section";

function FacultyCard({ f, index }: { f: FacultyType; index: number }) {
  const [failed, setFailed] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="bp-card group h-full overflow-hidden rounded-[24px] border border-[#EAEAEA] bg-white"
    >
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-[#FDEBDD] to-[#F9F8F6]">
        {failed ? (
          <div className="grid h-full w-full place-items-center">
            <span className="bp-font-display grid h-20 w-20 place-items-center rounded-3xl bg-[#E05A33] text-[26px] font-extrabold text-white shadow-[0_18px_30px_-16px_rgba(224,90,51,0.9)]">
              {f.initials}
            </span>
          </div>
        ) : (
          <Image
            src={f.photo}
            alt={`${f.name} — ${f.subject} faculty at BrightPath Academy, Nellore`}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width:768px) 100vw, 33vw"
            onError={() => setFailed(true)}
          />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11.5px] font-bold uppercase tracking-wider text-[#C94A25] shadow-sm">
          {f.subject}
        </span>
      </div>

      <div className="p-5">
        <h3 className="bp-font-display text-[17.5px] font-bold text-[#1A1A1A]">{f.name}</h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-[14px] font-semibold text-[#C94A25]">
          <Award className="h-4 w-4" strokeWidth={2.2} />
          {f.credit}
        </p>
        <p className="mt-3 flex gap-2 text-[14px] leading-relaxed text-[#6B7280]">
          <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-[#E05A33]" strokeWidth={2.1} />
          <span>{f.detail}</span>
        </p>
      </div>
    </motion.article>
  );
}

export default function Faculty() {
  return (
    <Section id="faculty" tone="light">
      <SectionHeading
        eyebrow="Meet the Faculty"
        title={
          <>
            Teachers who stay back for the <span className="text-[#E05A33]">last question</span>
          </>
        }
        subtitle="24 full-time and visiting faculty. Every subject has a named owner who signs off the test papers and sits in the doubt clinic."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FACULTY.map((f, i) => (
          <FacultyCard key={f.name} f={f} index={i} />
        ))}
      </div>

      <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-[#EAEAEA] bg-white px-6 py-4 text-center text-[14px] font-medium text-[#6B7280]">
        <span>Avg. faculty experience: <strong className="bp-font-display text-[#E05A33]">10.2 years</strong></span>
        <span>Subject owners for <strong className="bp-font-display text-[#E05A33]">Physics · Chemistry · Maths · Biology · English · Quant</strong></span>
        <span>Faculty meet with parents <strong className="bp-font-display text-[#E05A33]">every first Saturday</strong></span>
      </Reveal>
    </Section>
  );
}
