"use client";

import { Clock, ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react";
import { HOURS, RESTAURANT } from "./data";
import { C, Reveal, SectionHeading, sans, headingStyle } from "./ui";

export default function Location() {
  return (
    <section id="location" style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px 40px" }}>
      <SectionHeading
        eyebrow="Find us"
        title={
          <>
            Right on <span style={{ color: C.accent }}>Trunk Road</span>
          </>
        }
        lede="Free parking behind the building from 7 pm. Auto-rickshaws know us as “the biryani building”."
      />

      <div style={{ display: "grid", gap: 22, marginTop: 48 }} className="sr-loc-grid">
        <Reveal>
          <div style={{ height: "100%", display: "flex", flexDirection: "column", gap: 22 }}>
            <div
              style={{
                flex: 1,
                padding: "clamp(22px, 3.5vw, 30px)",
                borderRadius: 18,
                border: `1px solid ${C.line}`,
                background: C.bg,
                boxShadow: "0 1px 3px rgba(26,26,26,0.05)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <MapPin size={17} color={C.accent} />
                <h3 style={{ ...headingStyle, margin: 0, fontSize: 15, color: C.ink }}>Address</h3>
              </div>
              <address style={{ ...sans, fontStyle: "normal", fontSize: 14.5, lineHeight: 1.85, color: C.muted }}>
                {RESTAURANT.addressLines.map((l) => <span key={l} style={{ display: "block" }}>{l}</span>)}
              </address>
              <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 8 }}>
                <a href={RESTAURANT.phoneHref} style={{ ...sans, display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: C.accent, textDecoration: "none" }}>
                  <Phone size={14} color={C.accent} /> {RESTAURANT.phoneDisplay}
                </a>
                <a href={`mailto:${RESTAURANT.email}`} style={{ ...sans, display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: C.muted, textDecoration: "none" }}>
                  <ExternalLink size={14} color={C.accent} /> {RESTAURANT.email}
                </a>
              </div>
            </div>

            <div
              style={{
                padding: "clamp(22px, 3.5vw, 30px)",
                borderRadius: 18,
                border: `1px solid ${C.line}`,
                background: C.bg,
                boxShadow: "0 1px 3px rgba(26,26,26,0.05)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <Clock size={17} color={C.accent} />
                <h3 style={{ ...headingStyle, margin: 0, fontSize: 15, color: C.ink }}>Kitchen hours</h3>
              </div>
              <table style={{ ...sans, width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <tbody>
                  {HOURS.map((h) => (
                    <tr key={h.day} style={{ borderBottom: `1px solid ${C.line}` }}>
                      <td style={{ padding: "11px 0", color: C.muted }}>{h.day}</td>
                      <td style={{ padding: "11px 0", color: C.ink, fontWeight: 600, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                        {h.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ ...sans, margin: "14px 0 0", fontSize: 12.5, color: C.faint }}>
                Last kitchen order 20 minutes before closing · Full bar of coolers till close
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div style={{ height: "100%", display: "flex", flexDirection: "column", gap: 22 }}>
            <div
              aria-label="Map showing Spice Route on Trunk Road, Nellore"
              style={{
                position: "relative",
                flex: 1,
                minHeight: 300,
                borderRadius: 18,
                overflow: "hidden",
                border: `1px solid ${C.line}`,
                background:
                  "radial-gradient(60% 45% at 62% 40%, rgba(224,90,51,0.1), transparent 60%), repeating-linear-gradient(0deg, transparent 0 46px, rgba(26,26,26,0.05) 46px 47px), repeating-linear-gradient(90deg, transparent 0 46px, rgba(26,26,26,0.05) 46px 47px), #F9F8F6",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "12%",
                  right: "8%",
                  top: "44%",
                  height: 3,
                  borderRadius: 3,
                  background: "linear-gradient(90deg, rgba(224,90,51,0.5), rgba(224,90,51,0.15))",
                  transform: "rotate(-7deg)",
                }}
              />
              <span style={{ ...sans, position: "absolute", left: "14%", top: "50%", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(224,90,51,0.85)", transform: "rotate(-7deg)" }}>
                Trunk Road
              </span>
              <div style={{ position: "absolute", left: "58%", top: "28%", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: "50% 50% 50% 4px", transform: "rotate(-45deg)", background: C.accent, boxShadow: "0 10px 26px rgba(224,90,51,0.35)" }}>
                  <MapPin size={18} color="#FFFFFF" style={{ transform: "rotate(45deg)" }} />
                </span>
                <span style={{ ...sans, fontSize: 12.5, fontWeight: 600, color: C.ink, background: C.bg, border: `1px solid ${C.line}`, padding: "5px 10px", borderRadius: 8, boxShadow: "0 1px 3px rgba(26,26,26,0.05)" }}>
                  Spice Route — Sunna Peta
                </span>
              </div>
              <a
                href="https://maps.google.com/?q=Trunk+Road+Nellore"
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...sans, position: "absolute", right: 14, bottom: 14, display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 14px", borderRadius: 999, fontSize: 12.5, fontWeight: 600, color: C.ink, background: C.bg, border: `1px solid ${C.line}`, textDecoration: "none" }}
              >
                Open in Google Maps <ExternalLink size={12} />
              </a>
            </div>

            <a
              href={RESTAURANT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="sr-btn-primary"
              style={{
                ...sans,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                padding: "16px 28px",
                borderRadius: 999,
                background: C.accent,
                color: "#FFFFFF",
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 1px 3px rgba(26,26,26,0.05)",
              }}
            >
              <MessageCircle size={18} strokeWidth={2.4} />
              WhatsApp to Order
            </a>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (min-width: 920px) { .sr-loc-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  );
}
