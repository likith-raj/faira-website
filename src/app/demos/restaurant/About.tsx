"use client";

import { animate, motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ABOUT_IMAGE, STATS, img } from "./data";
import { C, Reveal, sans, headingStyle } from "./ui";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  return (
    <span
      ref={ref}
      style={{
        ...headingStyle,
        display: "block",
        fontSize: 38,
        lineHeight: 1,
        color: C.accent,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      0{suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" style={{ maxWidth: 1200, margin: "0 auto", padding: "110px 24px 30px" }}>
      <div style={{ display: "grid", gap: 56, alignItems: "center" }} className="sr-about-grid">
        <Reveal>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: "18px -18px -18px 18px",
                borderRadius: 22,
                border: `1px solid ${C.soft}`,
                background: C.soft,
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", borderRadius: 22, overflow: "hidden", aspectRatio: "4/5", maxHeight: 520 }}>
              <Image
                src={img(ABOUT_IMAGE.imageId, 1000, 1250)}
                alt={ABOUT_IMAGE.alt}
                fill
                sizes="(max-width: 900px) 92vw, 480px"
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(255,255,255,0.3), transparent 55%)",
                }}
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{
                position: "absolute",
                left: 20,
                bottom: 20,
                padding: "14px 18px",
                borderRadius: 14,
                background: C.bg,
                border: `1px solid ${C.line}`,
                boxShadow: "0 12px 32px rgba(26,26,26,0.08)",
              }}
            >
              <p style={{ ...headingStyle, margin: 0, fontSize: 14, color: C.ink }}>
                Chef Meerza Hussain
              </p>
              <p style={{ ...sans, margin: "5px 0 0", fontSize: 12.5, color: C.muted }}>
                Head chef · 22 years across the Andhra coast
              </p>
            </motion.div>
          </div>
        </Reveal>

        <div>
          <Reveal>
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
              — Our story —
            </p>
            <h2 style={{ ...headingStyle, margin: 0, fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.2, color: C.ink }}>
              A family kitchen that outgrew its courtyard
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p style={{ ...sans, marginTop: 22, fontSize: 15.5, lineHeight: 1.85, color: C.muted }}>
              Spice Route began in 2008 as a nine-table shed behind the old bus stand, run by
              Meerza Bhai's mother with one clay pot of cheka biryani and a rule that hasn't
              changed since: <em style={{ color: C.ink }}>no shortcuts with fire, no shortcuts with spice.</em>{" "}
              Today three outlets across Nellore serve the same masalas, ground every morning
              from Guntur chillies and self-produced sesame grown along the Pennar.
            </p>
            <p style={{ ...sans, marginTop: 16, fontSize: 15.5, lineHeight: 1.85, color: C.muted }}>
              Our biryanis still go on dum over charcoal, our chicken still arrives from
              village farms at Kavali, and Sunday evenings still sell out by eight. Come hungry.
            </p>
          </Reveal>

          <div
            style={{
              marginTop: 40,
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "34px 24px",
            }}
            className="sr-stats"
          >
            {STATS.map((s) => (
              <Reveal key={s.label} delay={0.05} y={18}>
                <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 18 }}>
                  <Counter value={s.value} suffix={s.suffix} />
                  <p style={{ ...sans, margin: "8px 0 0", fontSize: 13, letterSpacing: "0.04em", color: C.faint }}>
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) { .sr-about-grid { grid-template-columns: 5fr 6fr !important; } }
      `}</style>
    </section>
  );
}
