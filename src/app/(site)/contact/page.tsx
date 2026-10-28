import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { GlassCard, Reveal, SectionWrapper } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact FAIRA in Nellore — call, WhatsApp or send an enquiry. Free consultation for local businesses."
};

export default function ContactPage() {
  return (
    <SectionWrapper eyebrow="Contact" title="Talk to a human, not a bot" subtitle="Call, WhatsApp or fill the form — we usually reply the same day.">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-5">
          {[
            { icon: Phone, label: "Call us", value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, "")}` },
            {
              icon: MessageCircle,
              label: "WhatsApp",
              value: "Chat with FAIRA",
              href: `https://wa.me/${SITE.whatsapp}?text=Hi%20FAIRA%2C%20I%20want%20to%20discuss%20a%20project`
            },
            { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
            { icon: MapPin, label: "Location", value: SITE.city },
            { icon: Clock, label: "Hours", value: "Mon–Sat · 10:00 AM – 7:00 PM IST" }
          ].map((c, i) => (
            <Reveal key={c.label} delay={i * 0.06}>
              <GlassCard hover={!!c.href} className="flex items-center gap-4 !py-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-soft text-accent">
                  <c.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="mono-label">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="text-sm font-semibold hover:text-accent">
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold">{c.value}</p>
                  )}
                </div>
              </GlassCard>
            </Reveal>
          ))}
          <Reveal delay={0.3}>
            <div className="glass overflow-hidden rounded-2xl">
              <iframe
                title="FAIRA location — Nellore"
                src="https://www.openstreetmap.org/export/embed.html?bbox=79.55%2C14.40%2C79.65%2C14.48&layer=mapnik"
                className="h-56 w-full border-0 grayscale invert-[0.92] hue-rotate-180"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <GlassCard hover={false} className="!p-7 md:!p-9">
            <h2 className="font-display text-xl font-bold">Send an enquiry</h2>
            <p className="mt-1.5 text-sm text-ink-dim">Tell us about your business and what you need.</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
