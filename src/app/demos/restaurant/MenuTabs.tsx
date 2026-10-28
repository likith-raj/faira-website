"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { MENU, type MenuItem } from "./data";
import { C, DietMark, Reveal, SectionHeading, sans, headingStyle } from "./ui";

function ItemCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 + index * 0.06, ease: [0.21, 0.6, 0.35, 1] }}
      whileHover={{ y: -5, boxShadow: "0 12px 32px rgba(26,26,26,0.08)" }}
      style={{
        background: C.bg,
        border: `1px solid ${C.line}`,
        borderRadius: 16,
        padding: "22px 22px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        boxShadow: "0 1px 3px rgba(26,26,26,0.05)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <DietMark veg={item.veg} />
          <h3
            style={{
              ...headingStyle,
              margin: 0,
              fontSize: 15.5,
              lineHeight: 1.35,
              color: C.ink,
            }}
          >
            {item.name}
          </h3>
        </div>
        <span
          style={{
            ...sans,
            flexShrink: 0,
            fontSize: 15.5,
            fontWeight: 600,
            color: C.accent,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          ₹{item.price}
        </span>
      </div>
      <p style={{ ...sans, margin: 0, fontSize: 13.5, lineHeight: 1.65, color: C.muted }}>{item.desc}</p>
      {item.tag ? (
        <span
          style={{
            ...sans,
            alignSelf: "flex-start",
            marginTop: 2,
            padding: "4px 10px",
            borderRadius: 999,
            fontSize: 12.5,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: C.accent,
            background: C.soft,
            border: "1px solid #FDEBDD",
          }}
        >
          {item.tag}
        </span>
      ) : null}
    </motion.article>
  );
}

export default function MenuTabs() {
  const [active, setActive] = useState(0);
  const cat = MENU[active];

  return (
    <section id="menu" style={{ maxWidth: 1200, margin: "0 auto", padding: "110px 24px 30px" }}>
      <SectionHeading
        eyebrow="The full spread"
        title={
          <>
            Six routes through <span style={{ color: C.accent }}>one</span> kitchen
          </>
        }
        lede="Everything is cooked to order with Andhra chillies, seeraga samba rice and a lot of patience. Prices in ₹, incl. taxes."
      />

      <Reveal delay={0.1}>
        <div
          style={{
            marginTop: 44,
            display: "flex",
            gap: 8,
            justifyContent: "flex-start",
            overflowX: "auto",
            paddingBottom: 6,
            scrollbarWidth: "none",
          }}
        >
          {MENU.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(i)}
              style={{
                ...sans,
                position: "relative",
                flexShrink: 0,
                padding: "11px 22px",
                borderRadius: 999,
                border: `1px solid ${i === active ? "transparent" : C.line}`,
                background: i === active ? "transparent" : C.bg,
                color: i === active ? "#FFFFFF" : C.muted,
                fontSize: 13.5,
                fontWeight: 600,
                letterSpacing: "0.02em",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
            >
              {i === active ? (
                <motion.span
                  layoutId="menu-tab-pill"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 999,
                    background: C.accent,
                    boxShadow: "0 4px 14px rgba(224,90,51,0.25)",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              ) : null}
              <span style={{ position: "relative", zIndex: 1 }}>{c.label}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={cat.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.32, ease: "easeOut" }}
        >
          <p
            style={{
              ...sans,
              margin: "26px 0 20px",
              fontSize: 12.5,
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: C.faint,
            }}
          >
            {cat.note}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 18,
            }}
          >
            {cat.items.map((item, i) => (
              <ItemCard key={item.name} item={item} index={i} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
