"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 22
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  accent = "#E05A33"
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  accent?: string;
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span
        className="bp-font-display inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em]"
        style={{ borderColor: `${accent}33`, color: accent, background: `${accent}0f` }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#E05A33" }} />
        {eyebrow}
      </span>
      <h2 className="bp-font-display mt-4 text-[28px] font-bold leading-tight text-[#1A1A1A] md:text-[38px]">{title}</h2>
      {subtitle && (
        <p className={`mt-3 text-[15px] leading-relaxed text-[#6B7280] ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

export function Section({
  id,
  children,
  className = "",
  tone = "light"
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "white" | "tint";
}) {
  const tones = {
    light: "bg-[#F9F8F6]",
    white: "bg-white",
    tint: "bg-[#FDEBDD]"
  } as const;
  return (
    <section
      id={id}
      className={`scroll-mt-24 px-5 py-16 md:px-8 md:py-24 ${tones[tone]} ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}
