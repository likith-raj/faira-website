"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, CheckCircle2, Phone, X } from "lucide-react";
import { useRef, useState } from "react";
import { RESTAURANT } from "./data";
import { C, Reveal, SectionHeading, sans, headingStyle } from "./ui";

type FormState = { name: string; phone: string; date: string; time: string; guests: string };
type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = { name: "", phone: "", date: "", time: "", guests: "2" };

const TIME_SLOTS = [
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM",
];

const labelStyle = {
  ...sans,
  display: "block",
  fontSize: 12.5,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: C.muted,
  marginBottom: 8,
};

const fieldStyle = {
  ...sans,
  width: "100%",
  padding: "13px 15px",
  borderRadius: 12,
  border: `1px solid ${C.line}`,
  background: C.bg,
  color: C.ink,
  fontSize: 14.5,
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  colorScheme: "light" as const,
};

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please tell us your name (min. 2 characters).";
  const digits = f.phone.replace(/[\s-]/g, "").replace(/^\+91/, "");
  if (!/^[6-9]\d{9}$/.test(digits)) e.phone = "Enter a valid 10-digit Indian mobile number.";
  if (!f.date) {
    e.date = "Choose a date for your visit.";
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(`${f.date}T00:00:00`) < today) e.date = "That date is already behind us — pick today or later.";
  }
  if (!f.time) e.time = "Pick a preferred time slot.";
  const g = Number(f.guests);
  if (!Number.isFinite(g) || g < 1 || g > 12) e.guests = "For 1–12 guests online; larger parties, please call us.";
  return e;
}

export default function Reservation() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const set = (key: keyof FormState) => (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [key]: ev.target.value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const focusStyle = (ev: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    ev.currentTarget.style.borderColor = "#E05A33";
    ev.currentTarget.style.boxShadow = "0 0 0 3px rgba(224,90,51,0.15)";
  };
  const blurStyle = (ev: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    ev.currentTarget.style.borderColor = C.line;
    ev.currentTarget.style.boxShadow = "none";
  };

  const showToast = (msg: string) => {
    setToast(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 5200);
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      showToast("Please fix the highlighted fields and try again.");
      return;
    }
    const digits = form.phone.replace(/[\s-]/g, "").replace(/^\+91/, "");
    showToast(
      `Table reserved for ${form.name.trim().split(" ")[0]} · ${Number(form.guests)} guest${
        Number(form.guests) > 1 ? "s" : ""
      } on ${new Date(`${form.date}T00:00:00`).toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })} at ${form.time}. We'll confirm on +91 ${digits}.`
    );
    setForm(EMPTY);
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <section id="reserve" style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px 20px" }}>
      <SectionHeading
        eyebrow="Book a table"
        title={
          <>
            Save your seat at the <span style={{ color: C.accent }}>Route</span>
          </>
        }
        lede="Weeknights walk in easy; Fridays to Sundays book out fast. Reservations held for 15 minutes past the slot."
      />

      <div style={{ display: "grid", gap: 24, marginTop: 48 }} className="sr-reserve-grid">
        <Reveal>
          <form
            onSubmit={onSubmit}
            noValidate
            style={{
              display: "grid",
              gap: 20,
              padding: "clamp(24px, 4vw, 38px)",
              borderRadius: 20,
              border: `1px solid ${C.line}`,
              background: C.bg,
              boxShadow: "0 1px 3px rgba(26,26,26,0.05)",
            }}
          >
            <div style={{ display: "grid", gap: 20 }} className="sr-form-2">
              <div>
                <label htmlFor="sr-name" style={labelStyle}>Full name</label>
                <input
                  id="sr-name"
                  type="text"
                  placeholder="e.g. Lakshmi Narayanan"
                  value={form.name}
                  onChange={set("name")}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  style={{ ...fieldStyle, borderColor: errors.name ? "#DC2626" : C.line }}
                />
                {errors.name ? <p style={{ ...sans, margin: "7px 0 0", fontSize: 12.5, color: "#DC2626" }}>{errors.name}</p> : null}
              </div>
              <div>
                <label htmlFor="sr-phone" style={labelStyle}>Mobile number</label>
                <input
                  id="sr-phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="+91 9849 240 861"
                  value={form.phone}
                  onChange={set("phone")}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  style={{ ...fieldStyle, borderColor: errors.phone ? "#DC2626" : C.line }}
                />
                {errors.phone ? <p style={{ ...sans, margin: "7px 0 0", fontSize: 12.5, color: "#DC2626" }}>{errors.phone}</p> : null}
              </div>
            </div>

            <div style={{ display: "grid", gap: 20 }} className="sr-form-3">
              <div>
                <label htmlFor="sr-date" style={labelStyle}>Date</label>
                <input
                  id="sr-date"
                  type="date"
                  min={todayStr}
                  value={form.date}
                  onChange={set("date")}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  style={{ ...fieldStyle, borderColor: errors.date ? "#DC2626" : C.line }}
                />
                {errors.date ? <p style={{ ...sans, margin: "7px 0 0", fontSize: 12.5, color: "#DC2626" }}>{errors.date}</p> : null}
              </div>
              <div>
                <label htmlFor="sr-time" style={labelStyle}>Time</label>
                <select
                  id="sr-time"
                  value={form.time}
                  onChange={set("time")}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  style={{ ...fieldStyle, borderColor: errors.time ? "#DC2626" : C.line }}
                >
                  <option value="">Select a slot…</option>
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.time ? <p style={{ ...sans, margin: "7px 0 0", fontSize: 12.5, color: "#DC2626" }}>{errors.time}</p> : null}
              </div>
              <div>
                <label htmlFor="sr-guests" style={labelStyle}>Guests</label>
                <select
                  id="sr-guests"
                  value={form.guests}
                  onChange={set("guests")}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  style={{ ...fieldStyle, borderColor: errors.guests ? "#DC2626" : C.line }}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={String(n)}>
                      {n} {n === 1 ? "guest" : "guests"}
                    </option>
                  ))}
                </select>
                {errors.guests ? <p style={{ ...sans, margin: "7px 0 0", fontSize: 12.5, color: "#DC2626" }}>{errors.guests}</p> : null}
              </div>
            </div>

            <button
              type="submit"
              className="sr-btn-primary"
              style={{
                ...sans,
                marginTop: 6,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                padding: "16px 28px",
                borderRadius: 999,
                border: "none",
                background: C.accent,
                color: "#FFFFFF",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(26,26,26,0.05)",
              }}
            >
              <CalendarCheck size={17} strokeWidth={2.4} />
              Confirm Reservation
            </button>
            <p style={{ ...sans, margin: 0, fontSize: 12.5, color: C.faint, textAlign: "center" }}>
              No advance payment · Cancellations welcome up to 2 hours before · Or call{" "}
              <a href={RESTAURANT.phoneHref} style={{ color: C.accent, textDecoration: "none", fontWeight: 600 }}>
                {RESTAURANT.phoneDisplay}
              </a>
            </p>
          </form>
        </Reveal>

        <Reveal delay={0.15}>
          <aside
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 24,
              padding: "clamp(24px, 4vw, 36px)",
              borderRadius: 20,
              border: `1px solid ${C.soft}`,
              background: C.surface,
            }}
          >
            <div>
              <p style={{ ...sans, fontSize: 12.5, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: C.accent, margin: "0 0 14px" }}>
                Good to know
              </p>
              <ul style={{ ...sans, margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 16 }}>
                {[
                  ["Tables of 6+?", "Ask for the long teak table on the first floor — mention it when booking."],
                  ["Jummabiyani day", "Fridays, the lamb biryani pot opens at 1 pm and finishes by 4. It always finishes."],
                  ["Pure veg counter", "A separate section of the kitchen runs veg-only, with its own tawa and handi."],
                  ["Parties & catering", "Birthday spreads and office biryani catering from 20 plates — call us a day ahead."],
                ].map(([h, b]) => (
                  <li key={h} style={{ borderTop: `1px solid ${C.line}`, paddingTop: 14 }}>
                    <p style={{ ...headingStyle, margin: 0, fontSize: 13.5, color: C.ink }}>{h}</p>
                    <p style={{ ...sans, margin: "6px 0 0", fontSize: 13.5, lineHeight: 1.65, color: C.muted }}>{b}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 18px",
                borderRadius: 14,
                background: C.bg,
                border: `1px solid ${C.line}`,
                boxShadow: "0 1px 3px rgba(26,26,26,0.05)",
              }}
            >
              <Phone size={18} color={C.accent} />
              <div>
                <p style={{ ...sans, margin: 0, fontSize: 12.5, color: C.faint }}>Ring us directly</p>
                <a href={RESTAURANT.phoneHref} style={{ ...sans, fontSize: 15, fontWeight: 600, color: C.ink, textDecoration: "none" }}>
                  {RESTAURANT.phoneDisplay}
                </a>
              </div>
            </div>
          </aside>
        </Reveal>
      </div>

      <AnimatePresence>
        {toast ? (
          <div
            style={{
              position: "fixed",
              left: 0,
              right: 0,
              bottom: 28,
              zIndex: 110,
              display: "flex",
              justifyContent: "center",
              padding: "0 16px",
              pointerEvents: "none",
            }}
          >
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.21, 0.6, 0.35, 1] }}
            style={{
              width: "min(100%, 560px)",
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              padding: "16px 18px",
              borderRadius: 16,
              border: `1px solid ${C.line}`,
              background: C.bg,
              boxShadow: "0 12px 32px rgba(26,26,26,0.12)",
              pointerEvents: "auto",
            }}
          >
            <CheckCircle2 size={20} color="#16A34A" style={{ flexShrink: 0, marginTop: 1 }} />
            <p style={{ ...sans, margin: 0, fontSize: 13.5, lineHeight: 1.6, color: C.ink, flex: 1 }}>{toast}</p>
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => setToast(null)}
              style={{
                display: "grid",
                placeItems: "center",
                width: 28,
                height: 28,
                flexShrink: 0,
                borderRadius: 8,
                border: "none",
                background: "transparent",
                color: C.faint,
                cursor: "pointer",
              }}
            >
              <X size={15} />
            </button>
          </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <style>{`
        @media (min-width: 620px) { .sr-form-2 { grid-template-columns: 1fr 1fr !important; } }
        @media (min-width: 720px) { .sr-form-3 { grid-template-columns: 1fr 1fr 1fr !important; } }
        @media (min-width: 980px) { .sr-reserve-grid { grid-template-columns: 7fr 4fr !important; } }
      `}</style>
    </section>
  );
}
