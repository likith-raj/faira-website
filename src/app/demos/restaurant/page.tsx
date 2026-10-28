"use client";

import FairaDemoBadge from "@/components/FairaDemoBadge";
import About from "./About";
import Footer from "./Footer";
import Gallery from "./Gallery";
import Hero from "./Hero";
import Location from "./Location";
import MenuTabs from "./MenuTabs";
import Navbar from "./Navbar";
import Reservation from "./Reservation";
import Signature from "./Signature";
import Testimonials from "./Testimonials";
import { C, sans } from "./ui";

const STRIP = [
  "Seeraga samba rice",
  "Charcoal dum, every pot",
  "Guntur chillies, stone-ground",
  "Village chicken from Kavali",
  "Ghee from our own dairy",
];

export default function SpiceRoutePage() {
  return (
    <main style={{ position: "relative" }}>
      <Navbar />
      <Hero />

      <div style={{ borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, background: C.surface }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px 34px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {STRIP.map((s, i) => (
            <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: 34, ...sans, fontSize: 13, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: C.muted }}>
              {i > 0 ? <span style={{ color: C.accent }}>✦</span> : null}
              {s}
            </span>
          ))}
        </div>
      </div>

      <MenuTabs />
      <Signature />
      <Gallery />
      <About />
      <Testimonials />
      <Reservation />
      <Location />
      <Footer />
      <FairaDemoBadge />
    </main>
  );
}
