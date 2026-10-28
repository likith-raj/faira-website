"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import { HERO_IMAGE, img } from "./data";
import { C, headingStyle, sans } from "./ui";

const rise = {
  hidden: { opacity: 0, y: 34 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: 0.15 + i * 0.12, ease: [0.21, 0.6, 0.35, 1] },
  }),
};

export default function Hero() {
  return (
    <section id="top" style={{ position: "relative", background: C.bg }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "150px 24px 90px",
          display: "grid",
          gap: 56,
          alignItems: "center",
        }}
        className="sr-hero-grid"
      >
        <div>
          <motion.p
            custom={0}
            variants={rise}
            initial="hidden"
            animate="show"
            style={{
              ...sans,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12.5,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: C.accent,
              background: C.soft,
              padding: "8px 16px",
              borderRadius: 999,
              marginBottom: 24,
            }}
          >
            <MapPin size={14} /> Nellore · Andhra Pradesh · Est. 2008
          </motion.p>

          <motion.h1
            custom={1}
            variants={rise}
            initial="hidden"
            animate="show"
            style={{
              ...headingStyle,
              fontSize: "clamp(36px, 5.6vw, 62px)",
              lineHeight: 1.1,
              color: C.ink,
              margin: 0,
              maxWidth: 640,
            }}
          >
            Authentic Flavours
            <br />
            of <span style={{ color: C.accent }}>Nellore</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={rise}
            initial="hidden"
            animate="show"
            style={{
              ...sans,
              marginTop: 24,
              maxWidth: 520,
              fontSize: 16,
              lineHeight: 1.75,
              color: C.muted,
            }}
          >
            Clay-pot biryanis, village-style chicken fry and dum-baked sweets — cooked the way the
            Andhra coast does it, on Trunk Road since 2008.
          </motion.p>

          <motion.div
            custom={3}
            variants={rise}
            initial="hidden"
            animate="show"
            style={{
              marginTop: 30,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 18px",
              borderRadius: 999,
              border: `1px solid ${C.line}`,
              background: C.bg,
              boxShadow: "0 1px 3px rgba(26,26,26,0.05)",
            }}
          >
            <Star size={15} fill={C.accent} color={C.accent} />
            <span style={{ ...sans, fontSize: 14, fontWeight: 600, color: C.ink }}>4.8</span>
            <span style={{ ...sans, fontSize: 13.5, color: C.muted }}>· 320+ Google reviews</span>
          </motion.div>

          <motion.div
            custom={4}
            variants={rise}
            initial="hidden"
            animate="show"
            style={{ marginTop: 36, display: "flex", flexWrap: "wrap", gap: 16 }}
          >
            <a
              href="#menu"
              className="sr-btn-primary"
              style={{
                ...sans,
                padding: "15px 34px",
                borderRadius: 999,
                background: C.accent,
                color: "#FFFFFF",
                fontSize: 14.5,
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 1px 3px rgba(26,26,26,0.05)",
              }}
            >
              View the Menu
            </a>
            <a
              href="#reserve"
              className="sr-btn-secondary"
              style={{
                ...sans,
                padding: "15px 34px",
                borderRadius: 999,
                border: `1px solid ${C.line}`,
                color: C.ink,
                fontSize: 14.5,
                fontWeight: 600,
                textDecoration: "none",
                background: C.bg,
              }}
            >
              Reserve a Table
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.21, 0.6, 0.35, 1] }}
          style={{ position: "relative", minWidth: 0 }}
        >
          <div
            style={{
              position: "absolute",
              inset: "20px -18px -18px 20px",
              borderRadius: 26,
              background: C.soft,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "relative",
              borderRadius: 24,
              overflow: "hidden",
              aspectRatio: "4 / 3",
              border: `1px solid ${C.line}`,
              boxShadow: "0 12px 32px rgba(26,26,26,0.08)",
            }}
          >
            <Image
              src={img(HERO_IMAGE.imageId, 1600)}
              alt={HERO_IMAGE.alt}
              fill
              priority
              sizes="(max-width: 960px) 92vw, 620px"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 32%, transparent 60%)",
              }}
            />
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 960px) { .sr-hero-grid { grid-template-columns: 1.05fr 1fr !important; } }
      `}</style>
    </section>
  );
}
