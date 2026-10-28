"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Building2 } from "lucide-react";
import { saveEnquiry } from "@/lib/enquiries";
import { BUDGETS, BUSINESS_TYPES, SERVICE_OPTIONS, TIMELINES } from "@/lib/enquiry-types";
import { cn, isValidEmail, isValidPhone } from "@/lib/utils";
import { GlassCard, GradientButton, Reveal, SectionWrapper } from "./ui";

const stepMotion = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 })
};

export default function QuoteWizard({ initialService }: { initialService?: string }) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const [data, setData] = useState(() => {
    const pre =
      initialService && SERVICE_OPTIONS.some((s) => s.id === initialService) ? [initialService] : [];
    return {
      business_type: "",
      business_name: "",
      service_needed: pre,
      budget_range: "",
      timeline: "",
      contact_name: "",
      phone: "",
      email: "",
      city: "Nellore",
      message: ""
    };
  });

  const patch = (p: Partial<typeof data>) => setData((d) => ({ ...d, ...p }));

  const STEPS = [
    { label: "Business", ok: () => !!data.business_type && !!data.business_name.trim() },
    { label: "Needs", ok: () => data.service_needed.length > 0 },
    { label: "Budget", ok: () => !!data.budget_range && !!data.timeline },
    { label: "Contact", ok: () => !!data.contact_name.trim() && (isValidPhone(data.phone) || isValidEmail(data.email)) }
  ];

  function next() {
    setError("");
    if (!STEPS[step].ok()) {
      setError(
        step === 0
          ? "Select a business type and enter your business name."
          : step === 1
          ? "Select at least one service you need."
          : step === 2
          ? "Pick a budget range and timeline."
          : "Enter your name and a valid phone (+91) or email."
      );
      return;
    }
    setDir(1);
    setStep((s) => s + 1);
  }

  function back() {
    setDir(-1);
    setStep((s) => Math.max(0, s - 1));
  }

  async function submit() {
    if (!STEPS[3].ok()) {
      setError("Enter your name and a valid phone (+91) or email.");
      return;
    }
    setBusy(true);
    await saveEnquiry({ ...data, source: "quote-page" });
    setBusy(false);
    setDone(true);
  }

  const toggleService = (id: string) =>
    patch({
      service_needed: data.service_needed.includes(id)
        ? data.service_needed.filter((s) => s !== id)
        : [...data.service_needed, id]
    });

  if (done)
    return (
      <SectionWrapper className="text-center !py-32">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <CheckCircle2 className="mx-auto h-16 w-16 text-mint" />
          <h1 className="mt-6 font-display text-3xl font-bold">Enquiry received!</h1>
          <p className="mx-auto mt-3 max-w-md text-ink-dim">
            Thanks {data.contact_name.split(" ")[0]}! Our team will call or WhatsApp{" "}
            <span className="text-ink">{data.phone || data.email}</span> within 24 hours with next steps
            and an exact quote.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <GradientButton href="/demos">Browse demos while you wait</GradientButton>
          </div>
        </motion.div>
      </SectionWrapper>
    );

  return (
    <SectionWrapper
      eyebrow="Get a quote"
      title="4 quick steps to your free consultation"
      subtitle="Takes less than 2 minutes. No obligation — we'll suggest the best option for your business."
      className="max-w-3xl"
    >
      {/* progress */}
      <Reveal>
        <ol className="mb-8 flex items-center justify-between" aria-label="Form progress">
          {STEPS.map((s, i) => (
            <li key={s.label} className="flex flex-1 items-center">
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-full border text-sm font-bold transition-colors",
                  i < step
                    ? "border-mint/50 bg-mint/15 text-mint"
                    : i === step
                    ? "border-accent bg-accent/15 text-accent"
                    : "border-[color:var(--border)] text-ink-faint"
                )}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span className={cn("ml-2 hidden text-sm sm:block", i === step ? "text-ink" : "text-ink-faint")}>
                {s.label}
              </span>
              {i < 3 && <span className="mx-3 h-px flex-1 bg-[color:var(--border)]" />}
            </li>
          ))}
        </ol>
      </Reveal>

      <GlassCard hover={false} className="overflow-hidden !p-7 md:!p-9">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={stepMotion}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {step === 0 && (
              <div>
                <h2 className="flex items-center gap-2 font-display text-xl font-bold">
                  <Building2 className="h-5 w-5 text-accent" /> What kind of business is yours?
                </h2>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {BUSINESS_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => patch({ business_type: t })}
                      className={cn(
                        "focus-ring rounded-xl border px-4 py-3.5 text-sm font-medium transition-colors",
                        data.business_type === t
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-[color:var(--border)] bg-white/[0.04] text-ink-dim hover:border-[color:var(--border-strong)]"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <label className="mt-6 block">
                  <span className="mono-label">Business name</span>
                  <input
                    className="input mt-2"
                    placeholder="e.g. Spice Route Restaurant"
                    value={data.business_name}
                    onChange={(e) => patch({ business_name: e.target.value })}
                  />
                </label>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="font-display text-xl font-bold">What do you need?</h2>
                <p className="mt-1 text-sm text-ink-dim">Pick as many as apply.</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {SERVICE_OPTIONS.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleService(s.id)}
                      className={cn(
                        "focus-ring flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-colors",
                        data.service_needed.includes(s.id)
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-[color:var(--border)] bg-white/[0.04] text-ink-dim hover:border-[color:var(--border-strong)]"
                      )}
                    >
                      <span
                        className={cn(
                          "grid h-5 w-5 shrink-0 place-items-center rounded-md border",
                          data.service_needed.includes(s.id) ? "border-accent bg-accent text-white" : "border-[color:var(--border-strong)]"
                        )}
                      >
                        {data.service_needed.includes(s.id) && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                      </span>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-7">
                <div>
                  <h2 className="font-display text-xl font-bold">Your budget range</h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {BUDGETS.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => patch({ budget_range: b })}
                        className={cn(
                          "focus-ring rounded-xl border px-4 py-3.5 text-sm font-semibold transition-colors",
                          data.budget_range === b
                            ? "border-mint bg-mint/10 text-mint"
                            : "border-[color:var(--border)] bg-white/[0.04] text-ink-dim hover:border-[color:var(--border-strong)]"
                        )}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-base font-bold">How soon do you want it?</h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {TIMELINES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => patch({ timeline: t })}
                        className={cn(
                          "focus-ring rounded-full border px-4 py-2 text-sm transition-colors",
                          data.timeline === t
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-[color:var(--border)] text-ink-dim hover:border-[color:var(--border-strong)]"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="font-display text-xl font-bold">How do we reach you?</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <input className="input" placeholder="Your name *" value={data.contact_name} onChange={(e) => patch({ contact_name: e.target.value })} />
                  <input className="input" placeholder="Phone (+91) *" value={data.phone} onChange={(e) => patch({ phone: e.target.value })} inputMode="tel" />
                  <input className="input" type="email" placeholder="Email" value={data.email} onChange={(e) => patch({ email: e.target.value })} />
                  <input className="input" placeholder="City" value={data.city} onChange={(e) => patch({ city: e.target.value })} />
                </div>
                <textarea
                  className="input mt-4 min-h-28 resize-y"
                  placeholder="Anything else we should know? (optional)"
                  value={data.message}
                  onChange={(e) => patch({ message: e.target.value })}
                />
              </div>
            )}

            {error && <p className="mt-4 rounded-lg border border-rose/40 bg-rose/10 px-4 py-2.5 text-sm text-rose">{error}</p>}

            <div className="mt-8 flex items-center justify-between">
              {step > 0 ? (
                <button type="button" onClick={back} className="focus-ring inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm text-ink-dim hover:text-ink">
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              ) : (
                <span />
              )}
              {step < 3 ? (
                <GradientButton onClick={next}>
                  Continue <ArrowRight className="h-4 w-4" />
                </GradientButton>
              ) : (
                <GradientButton onClick={submit} disabled={busy}>
                  {busy ? "Sending…" : "Submit enquiry"}
                </GradientButton>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </GlassCard>
    </SectionWrapper>
  );
}
