"use client";

import { Flame, Instagram, Facebook, MapPin, Phone } from "lucide-react";
import { HOURS, NAV_LINKS, RESTAURANT } from "./data";
import { C, sans, headingStyle } from "./ui";

export default function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.line}`, background: C.surface, marginTop: 90 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px 30px" }}>
        <div style={{ display: "grid", gap: 44 }} className="sr-foot-grid">
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "grid", placeItems: "center", width: 34, height: 34, borderRadius: 9, background: C.soft, color: C.accent }}>
                <Flame size={17} strokeWidth={2.4} />
              </span>
              <span style={{ ...headingStyle, fontSize: 18, color: C.ink, letterSpacing: "0.04em" }}>
                Spice <span style={{ color: C.accent }}>Route</span>
              </span>
            </div>
            <p style={{ ...sans, marginTop: 16, fontSize: 13.5, lineHeight: 1.75, color: C.muted, maxWidth: 300 }}>
              Clay-pot biryanis, village fries and dum-baked sweets on Trunk Road since 2008.
              Dine in, take away or WhatsApp your order.
            </p>
            <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Phone, label: "Phone" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href={label === "Phone" ? RESTAURANT.phoneHref : "#top"}
                  aria-label={label}
                  className="sr-foot-social"
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    border: `1px solid ${C.line}`,
                    background: C.bg,
                    color: C.muted,
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer">
            <p style={{ ...sans, margin: "0 0 18px", fontSize: 12, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: C.faint }}>
              Explore
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 12 }}>
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} style={{ ...sans, fontSize: 14, color: C.muted, textDecoration: "none" }}>
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#signature" style={{ ...sans, fontSize: 14, color: C.muted, textDecoration: "none" }}>
                  Signature dishes
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <p style={{ ...sans, margin: "0 0 18px", fontSize: 12, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: C.faint }}>
              Kitchen hours
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 10 }}>
              {HOURS.map((h) => (
                <li key={h.day} style={{ ...sans, fontSize: 13.5, color: C.muted }}>
                  {h.day}
                  <span style={{ display: "block", color: C.ink, fontWeight: 500 }}>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p style={{ ...sans, margin: "0 0 18px", fontSize: 12, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: C.faint }}>
              Visit / Order
            </p>
            <address style={{ ...sans, fontStyle: "normal", fontSize: 13.5, lineHeight: 1.8, color: C.muted }}>
              <MapPin size={14} color={C.accent} style={{ marginRight: 6, verticalAlign: -2 }} />
              {RESTAURANT.addressLines.map((l) => (
                <span key={l} style={{ display: "block" }}>{l}</span>
              ))}
              <span style={{ display: "block", marginTop: 12 }}>
                <Phone size={13} color={C.accent} style={{ marginRight: 6, verticalAlign: -1 }} />
                <a href={RESTAURANT.phoneHref} style={{ color: C.accent, textDecoration: "none", fontWeight: 600 }}>
                  {RESTAURANT.phoneDisplay}
                </a>
              </span>
            </address>
          </div>
        </div>

        <div
          style={{
            marginTop: 54,
            paddingTop: 24,
            borderTop: `1px solid ${C.line}`,
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p style={{ ...sans, margin: 0, fontSize: 12.5, color: C.faint }}>
            © 2026 Spice Route · Nellore. All flavours reserved.
          </p>
          <p style={{ ...sans, margin: 0, fontSize: 12.5, color: C.faint }}>
            Fieri Guntur Mirchi Award '24 · Best Biryani, Coastal Andhra
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 760px) { .sr-foot-grid { grid-template-columns: 2fr 1fr 1.2fr 1.4fr !important; } }
        .sr-foot-social:hover { color: #E05A33 !important; border-color: #E05A33 !important; }
      `}</style>
    </footer>
  );
}
