"use client";

import Image from "next/image";
import { SIGNATURES, img } from "./data";
import { C, Reveal, SectionHeading, sans, headingStyle } from "./ui";

export default function Signature() {
  return (
    <section
      id="signature"
      style={{ background: C.surface, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px 40px" }}>
      <SectionHeading
        eyebrow="Cooked for the few, famous for all"
        title={
          <>
            The three dishes people <span style={{ color: C.accent }}>drive</span> for
          </>
        }
        lede="If it's your first visit, this is the order our regulars would put in front of you."
      />

      <div style={{ marginTop: 48, display: "grid", gap: 22, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        {SIGNATURES.map((dish, i) => (
          <Reveal key={dish.name} delay={i * 0.12}>
            <article
              className="sr-sig-card"
              style={{
                position: "relative",
                borderRadius: 20,
                overflow: "hidden",
                aspectRatio: "4 / 5",
                border: `1px solid ${C.line}`,
                background: C.bg,
                boxShadow: "0 1px 3px rgba(26,26,26,0.05)",
              }}
            >
              <Image
                src={img(dish.imageId, 900, 1125)}
                alt={dish.alt}
                fill
                sizes="(max-width: 768px) 92vw, 360px"
                style={{ objectFit: "cover", transition: "transform 0.7s cubic-bezier(0.21,0.6,0.35,1)" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(255,255,255,0.98) 6%, rgba(255,255,255,0.88) 32%, rgba(255,255,255,0.1) 68%, transparent 100%)",
                }}
              />
              <span
                style={{
                  ...sans,
                  position: "absolute",
                  top: 18,
                  left: 18,
                  padding: "7px 14px",
                  borderRadius: 999,
                  fontSize: 12.5,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  background: C.soft,
                  border: "1px solid #FDEBDD",
                  color: C.accent,
                }}
              >
                {dish.tag}
              </span>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 24 }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                  <h3 style={{ ...headingStyle, margin: 0, fontSize: 18, color: C.ink }}>{dish.name}</h3>
                  <span style={{ ...sans, fontSize: 17, fontWeight: 600, color: C.accent }}>₹{dish.price}</span>
                </div>
                <p style={{ ...sans, margin: "10px 0 0", fontSize: 13.5, lineHeight: 1.6, color: C.muted }}>
                  {dish.desc}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <style>{`
        .sr-sig-card { transition: box-shadow 0.3s ease; }
        .sr-sig-card:hover img { transform: scale(1.04); }
        .sr-sig-card:hover { box-shadow: 0 12px 32px rgba(26,26,26,0.08) !important; }
      `}</style>
      </div>
    </section>
  );
}
