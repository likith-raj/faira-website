"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

/** FAIRA light corporate palette. */
export const C = {
  bg: "#FFFFFF",
  surface: "#F9F8F6",
  soft: "#FDEBDD",
  line: "#EAEAEA",
  accent: "#E05A33",
  accentHover: "#C94A25",
  ink: "#1A1A1A",
  muted: "#6B7280",
  faint: "#6B7280",
} as const;

/** Display type: Inter, used with uppercase + 0.03em tracking + weight 600 for headings. */
export const display: CSSProperties = { fontFamily: "'Inter', system-ui, sans-serif" };
export const sans: CSSProperties = { fontFamily: "'Inter', system-ui, sans-serif" };

export const headingStyle: CSSProperties = {
  ...display,
  textTransform: "uppercase",
  letterSpacing: "0.03em",
  fontWeight: 600,
};

/** Scroll-triggered reveal wrapper. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.6, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Eyebrow + uppercase Inter title + optional lede, centred or left. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal
      style={{
        maxWidth: align === "center" ? 640 : undefined,
        marginLeft: align === "center" ? "auto" : undefined,
        marginRight: align === "center" ? "auto" : undefined,
        textAlign: align,
      }}
    >
      <p
        style={{
          ...sans,
          fontSize: 12.5,
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: C.accent,
          marginBottom: 14,
        }}
      >
        — {eyebrow} —
      </p>
      <h2
        style={{
          ...headingStyle,
          fontSize: "clamp(28px, 4vw, 40px)",
          lineHeight: 1.18,
          color: C.ink,
          margin: 0,
        }}
      >
        {title}
      </h2>
      {lede ? (
        <p style={{ ...sans, marginTop: 16, fontSize: 16, lineHeight: 1.7, color: C.muted }}>{lede}</p>
      ) : null}
    </Reveal>
  );
}

/** Veg / non-veg square indicator as used across Indian menus. */
export function DietMark({ veg }: { veg: boolean }) {
  const color = veg ? "#16A34A" : "#DC2626";
  return (
    <span
      aria-label={veg ? "Vegetarian" : "Non-vegetarian"}
      title={veg ? "Vegetarian" : "Non-vegetarian"}
      style={{
        display: "inline-grid",
        placeItems: "center",
        width: 16,
        height: 16,
        border: `1.6px solid ${color}`,
        borderRadius: 3,
        flexShrink: 0,
        background: C.soft,
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
    </span>
  );
}

/** Small star row for ratings. */
export function Stars({ n }: { n: number }) {
  return (
    <span aria-label={`${n} out of 5 stars`} style={{ color: C.accent, fontSize: 14, letterSpacing: 2 }}>
      {"★".repeat(n)}
      <span style={{ color: C.line }}>{"★".repeat(5 - n)}</span>
    </span>
  );
}
