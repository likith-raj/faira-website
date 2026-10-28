import type { Metadata } from "next";
import {
  Globe,
  LayoutDashboard,
  Smartphone,
  Sparkles,
  Check,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { GlassCard, GradientButton, Reveal, SectionWrapper } from "@/components/ui";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website development, custom web apps and dashboards, Android/iOS mobile apps, and automation & AI integration for local businesses in Nellore."
};

const SECTIONS = [
  {
    id: "website",
    icon: Globe,
    title: "Website Development",
    tagline: "Business sites, e-commerce and landing pages that convert visitors into customers.",
    includes: [
      "Premium responsive design (mobile-first)",
      "SEO setup so customers find you on Google",
      "Contact & lead forms with WhatsApp buttons",
      "CMS / blog so you can update content yourself",
      "E-commerce catalogs with online ordering",
      "Booking / reservation pages"
    ],
    ideal: "Restaurants, clinics, shops, coaching centres, real-estate agencies.",
    price: "Starting ₹1,500"
  },
  {
    id: "webapp",
    icon: LayoutDashboard,
    title: "Web Development — Custom Apps & Dashboards",
    tagline: "Software that runs your daily operations, not just shows your logo.",
    includes: [
      "Admin dashboards with live stats & charts",
      "Client portals and member logins",
      "Booking & lead-management systems",
      "Inventory and stock tracking",
      "CRM-lite for follow-ups and pipeline",
      "Third-party API integrations (payments, SMS, maps)"
    ],
    ideal: "Growing businesses drowning in spreadsheets and WhatsApp chats.",
    price: "Starting ₹1,500"
  },
  {
    id: "mobileapp",
    icon: Smartphone,
    title: "App Development (Android & iOS)",
    tagline: "Mobile apps your customers actually keep on their home screen.",
    includes: [
      "Business apps, booking apps & delivery apps",
      "Loyalty / rewards and push notifications",
      "Customer portals with order history",
      "One codebase — React Native / Flutter",
      "Play Store & App Store publishing support"
    ],
    ideal: "Businesses ready to go mobile with an existing customer base.",
    price: "Starting ₹1,500"
  },
  {
    id: "automation",
    icon: Sparkles,
    title: "Automation & AI Integration",
    tagline: "Let software answer, follow up and report — while you run the business.",
    includes: [
      "WhatsApp automation & auto-replies",
      "AI chatbots trained on your business info",
      "Automatic enquiry routing & reminders",
      "Report automation (daily/weekly summaries)",
      "AI content tools for menus, posts and offers"
    ],
    ideal: "Any business losing leads because replies come too late.",
    price: "Starting ₹1,500"
  }
];

const FAQS = [
  {
    q: "How long does a website take?",
    a: "A standard business website goes live in 7–14 days. Booking systems and custom web apps take 3–6 weeks depending on scope."
  },
  {
    q: "Do you handle domain and hosting?",
    a: "Yes — we buy and configure domain + hosting in your name and explain the exact yearly cost upfront. It is billed separately at actuals."
  },
  {
    q: "Can you build just a mobile app?",
    a: "Yes. We build Android + iOS apps with React Native or Flutter, including Play Store / App Store publishing."
  },
  {
    q: "What about after-launch changes?",
    a: "Every project includes a support period. After that, small edits and maintenance plans are available at simple monthly pricing."
  },
  {
    q: "Do you work with businesses outside Nellore?",
    a: "Absolutely — most work happens over calls. Nellore businesses get the added benefit of in-person visits."
  },
  {
    q: "Will my website show up on Google?",
    a: "We do SEO fundamentals on every site: fast loading, proper structure, meta tags, sitemap and Google Search Console setup. Ongoing SEO is available as an add-on."
  }
];

export default function ServicesPage() {
  return (
    <>
      <SectionWrapper eyebrow="Services" title="Everything your business needs to go digital" subtitle="Four service lines, one partner. Pick one — or let us suggest the right mix on a free call.">
        {/* anchor nav */}
        <Reveal className="mb-12 flex flex-wrap gap-3">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border border-[color:var(--border-strong)] bg-soft px-4 py-2 text-sm text-ink-dim transition-colors hover:border-accent/60 hover:text-accent"
            >
              {s.title.split("—")[0].trim()}
            </a>
          ))}
        </Reveal>

        <div className="space-y-8">
          {SECTIONS.map((s, i) => (
            <Reveal key={s.id} delay={0.05}>
              <GlassCard hover={false} className="!p-8 md:!p-10">
                <div id={s.id} className="scroll-mt-24 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-soft text-accent">
                        <s.icon className="h-6 w-6" />
                      </span>
                      <span className="mono-label">0{i + 1}</span>
                    </div>
                    <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl">{s.title}</h2>
                    <p className="mt-2 text-ink-dim">{s.tagline}</p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl border border-[color:var(--border)] bg-[#FAF9F7] p-4">
                        <p className="mono-label mb-2">Ideal for</p>
                        <p className="text-sm text-ink-dim">{s.ideal}</p>
                      </div>
                      <div className="rounded-xl border border-[color:var(--border)] bg-[#FAF9F7] p-4">
                        <p className="mono-label mb-2">Pricing</p>
                        <p className="text-sm font-semibold text-mint">{s.price}</p>
                      </div>
                    </div>

                    <GradientButton href="/quote" className="mt-7">
                      Discuss this service <ArrowRight className="h-4 w-4" />
                    </GradientButton>
                  </div>

                  <div>
                    <p className="mono-label mb-4">What&apos;s included</p>
                    <ul className="space-y-3">
                      {s.includes.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-ink-dim">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper eyebrow="FAQ" title="Questions business owners ask" className="!pt-4">
        <div className="grid gap-4 md:grid-cols-2">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <details className="glass group rounded-xl p-5 open:pb-6">
                <summary className="focus-ring cursor-pointer list-none rounded font-semibold marker:hidden">
                  <span className="mr-2 text-accent group-open:rotate-90 inline-block transition-transform">▸</span>
                  {f.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-dim">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <p className="text-ink-dim">
            Still unsure?{" "}
            <Link href="/contact" className="text-accent hover:underline">
              Ask us directly
            </Link>{" "}
            — we reply the same day.
          </p>
        </Reveal>
      </SectionWrapper>
    </>
  );
}
