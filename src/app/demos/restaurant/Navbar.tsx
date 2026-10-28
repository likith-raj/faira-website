"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Flame, Menu as MenuIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { C, sans, headingStyle } from "./ui";
import { NAV_LINKS, RESTAURANT } from "./data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.21, 0.6, 0.35, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? "rgba(255,255,255,0.98)" : C.bg,
        borderBottom: scrolled ? `1px solid ${C.line}` : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 3px rgba(26,26,26,0.05)" : "none",
        transition: "background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: scrolled ? 64 : 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "height 0.35s ease",
        }}
      >
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <span
            style={{
              display: "grid",
              placeItems: "center",
              width: 36,
              height: 36,
              borderRadius: 10,
              background: C.soft,
              color: C.accent,
            }}
          >
            <Flame size={18} strokeWidth={2.4} />
          </span>
          <span style={{ ...headingStyle, fontSize: 20, color: C.ink, letterSpacing: "0.04em" }}>
            Spice <span style={{ color: C.accent }}>Route</span>
          </span>
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="sr-nav-desktop">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                ...sans,
                fontSize: 13.5,
                fontWeight: 500,
                letterSpacing: "0.04em",
                color: C.muted,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#reserve"
            className="sr-nav-cta sr-btn-primary"
            style={{
              ...sans,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: 999,
              background: C.accent,
              color: "#FFFFFF",
              fontSize: 13.5,
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 1px 3px rgba(26,26,26,0.05)",
              whiteSpace: "nowrap",
            }}
          >
            Reserve a Table
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="sr-nav-burger"
          style={{
            display: "none",
            placeItems: "center",
            width: 42,
            height: 42,
            borderRadius: 10,
            border: `1px solid ${C.line}`,
            background: C.bg,
            color: C.ink,
            cursor: "pointer",
          }}
        >
          {open ? <X size={20} /> : <MenuIcon size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden", background: C.bg, borderBottom: `1px solid ${C.line}` }}
          >
            <div style={{ padding: "8px 24px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{
                    ...sans,
                    padding: "13px 4px",
                    fontSize: 15,
                    fontWeight: 500,
                    color: C.ink,
                    textDecoration: "none",
                    borderBottom: `1px solid ${C.line}`,
                  }}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#reserve"
                onClick={() => setOpen(false)}
                className="sr-btn-primary"
                style={{
                  ...sans,
                  marginTop: 14,
                  padding: "13px 20px",
                  borderRadius: 999,
                  textAlign: "center",
                  background: C.accent,
                  color: "#FFFFFF",
                  fontSize: 14.5,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Reserve a Table
              </a>
              <a
                href={RESTAURANT.phoneHref}
                style={{ ...sans, marginTop: 10, textAlign: "center", fontSize: 13, color: C.muted }}
              >
                Or call {RESTAURANT.phoneDisplay}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <style>{`
        @media (max-width: 860px) {
          .sr-nav-desktop { display: none !important; }
          .sr-nav-burger { display: grid !important; }
        }
      `}</style>
    </motion.header>
  );
}
