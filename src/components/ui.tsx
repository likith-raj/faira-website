"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function GlassCard({
  children,
  className,
  hover = true
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div className={cn("glass p-6", hover && "glass-hover", className)}>{children}</div>
  );
}

export function GradientButton({
  children,
  href,
  onClick,
  className,
  type = "button",
  disabled
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium uppercase tracking-[0.2em] text-white bg-accent px-8 py-4 text-sm",
    "shadow-glow transition-all duration-300 hover:bg-accent-deep hover:-translate-y-0.5",
    "focus-ring disabled:opacity-50 disabled:pointer-events-none",
    className
  );
  if (href)
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  href,
  onClick,
  className
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-ink backdrop-blur-xl",
    "transition-colors duration-300 hover:border-accent hover:text-accent focus-ring",
    className
  );
  if (href)
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function SectionWrapper({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative mx-auto w-full max-w-[90%] px-4 py-20 md:px-12 md:py-28", className)}>
      {(eyebrow || title) && (
        <Reveal className="mb-12 max-w-3xl">
          {eyebrow && <p className="mono-label mb-3 text-accent">{eyebrow}</p>}
          {title && <h2 className="font-display text-2xl font-light uppercase leading-[1.3] tracking-[0.2em] md:text-4xl">{title}</h2>}
          {subtitle && <p className="mt-3 text-lg text-ink-dim">{subtitle}</p>}
        </Reveal>
      )}
      {children}
    </section>
  );
}

export function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.4
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="font-mono"
    >
      <AnimatedNumber value={value} prefix={prefix} suffix={suffix} duration={duration} />
    </motion.span>
  );
}

function AnimatedNumber({ value, prefix, suffix, duration }: { value: number; prefix: string; suffix: string; duration: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <CountUp target={value} duration={duration} render={(v) => `${prefix}${v}${suffix}`} />
    </motion.span>
  );
}

import { useEffect, useRef, useState } from "react";

function CountUp({ target, duration, render }: { target: number; duration: number; render: (v: number) => string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !done.current) {
          done.current = true;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / (duration * 1000));
            const eased = 1 - Math.pow(1 - p, 3);
            setV(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{render(v)}</span>;
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    New: "text-accent border-accent/40 bg-accent/10",
    Contacted: "text-sky border-sky/40 bg-sky/10",
    "In Progress": "text-amber border-amber/40 bg-amber/10",
    Converted: "text-mint border-mint/40 bg-mint/10",
    Closed: "text-ink-faint border-ink/10 bg-ink/5"
  };
  return (
    <span className={cn("inline-block rounded-full border px-3 py-1 text-xs font-medium", map[status] || map.New)}>
      {status}
    </span>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-ink/[0.06]", className)} />;
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="glass flex flex-col items-center gap-2 p-12 text-center">
      <p className="font-display text-lg font-semibold">{title}</p>
      {hint && <p className="text-sm text-ink-dim">{hint}</p>}
    </div>
  );
}
