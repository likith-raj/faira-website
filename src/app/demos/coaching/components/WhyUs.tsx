"use client";

import { motion } from "framer-motion";
import {
  BookOpenCheck,
  ClipboardCheck,
  Languages,
  MessagesSquare,
  ShieldCheck,
  Users,
  type LucideIcon
} from "lucide-react";
import { WHY_US } from "../data";
import { Reveal, Section, SectionHeading } from "./Section";

const ICONS: Record<string, LucideIcon> = {
  MessagesSquare,
  ClipboardCheck,
  Users,
  Languages
};

const EXTRAS = [
  { icon: BookOpenCheck, text: "Free study-room access for enrolled students, 6 AM – 9 PM" },
  { icon: ShieldCheck, text: "Fees protected by a written batch-completion guarantee" }
];

export default function WhyUs() {
  return (
    <Section id="why-us" tone="tint">
      <SectionHeading
        eyebrow="Why BrightPath"
        title={
          <>
            The four things Nellore parents <span className="text-[#E05A33]">tell their friends about</span>
          </>
        }
        subtitle="Coaching works when the week is structured. Here is exactly how ours runs, batch by batch."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {WHY_US.map((w, i) => {
          const Icon = ICONS[w.icon] ?? Users;
          return (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bp-card flex h-full flex-col rounded-[24px] border border-white bg-white p-6 shadow-[0_20px_38px_-28px_rgba(26,26,26,0.4)]"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#FDEBDD] text-[#E05A33]">
                <Icon className="h-6 w-6" strokeWidth={2.1} />
              </span>
              <h3 className="bp-font-display mt-4 text-[17px] font-bold text-[#1A1A1A]">{w.title}</h3>
              <p className="mt-2 flex-1 text-[14px] leading-relaxed text-[#6B7280]">{w.desc}</p>
              <p className="bp-font-display mt-4 inline-flex w-fit rounded-full bg-[#FDEBDD] px-3 py-1 text-[12px] font-bold text-[#C94A25]">
                {w.meta}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {EXTRAS.map(({ icon: Icon, text }, i) => (
          <Reveal key={text} delay={0.1 + i * 0.06}>
            <div className="flex items-center gap-3 rounded-2xl border border-[#E05A33]/15 bg-white px-5 py-4 text-[14px] font-medium text-[#1A1A1A]">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#E05A33] text-white">
                <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
              </span>
              {text}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
