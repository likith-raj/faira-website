"use client";

import { Quote } from "lucide-react";
import { TESTIMONIALS } from "./data";
import { C, Reveal, SectionHeading, Stars, sans } from "./ui";

export default function Testimonials() {
  return (
    <section id="reviews" style={{ background: C.surface, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px 40px" }}>
      <SectionHeading
        eyebrow="Word of mouth"
        title={
          <>
            What Nellore <span style={{ color: C.accent }}>says</span>
          </>
        }
        lede="A 4.8 average across 320+ Google reviews — here are three of our favourites."
      />

      <div style={{ marginTop: 48, display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.12}>
            <figure
              style={{
                margin: 0,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                padding: "28px 26px",
                borderRadius: 18,
                border: `1px solid ${C.line}`,
                background: C.bg,
                boxShadow: "0 1px 3px rgba(26,26,26,0.05)",
              }}
            >
              <Quote size={26} color={C.accent} style={{ opacity: 0.85, marginBottom: 16 }} />
              <blockquote style={{ margin: 0, flex: 1 }}>
                <p style={{ ...sans, fontSize: 16, lineHeight: 1.7, color: C.ink }}>
                  “{t.quote}”
                </p>
              </blockquote>
              <figcaption style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 14 }}>
                <span
                  style={{
                    ...sans,
                    display: "grid",
                    placeItems: "center",
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: C.soft,
                    color: C.accent,
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                  }}
                >
                  {t.initials}
                </span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ ...sans, display: "block", fontSize: 14.5, fontWeight: 600, color: C.ink }}>
                    {t.name}
                  </span>
                  <span style={{ ...sans, display: "block", marginTop: 2, fontSize: 12, color: C.faint }}>
                    {t.role}
                  </span>
                </span>
                <span style={{ marginLeft: "auto" }}>
                  <Stars n={t.stars} />
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      </div>
    </section>
  );
}
