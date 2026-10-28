import Image from "next/image";
import Link from "next/link";
import {
  Globe,
  LayoutDashboard,
  Smartphone,
  Sparkles,
  ArrowRight,
  MapPin,
  ShieldCheck,
  Timer,
  Wallet,
  Headphones,
  MessageSquare,
  FileText,
  BadgeCheck
} from "lucide-react";
import { GhostButton, GradientButton, GlassCard, Reveal, SectionWrapper } from "@/components/ui";
import { DEMOS, PRICING, PROCESS, SERVICES, SITE } from "@/lib/site";

const ICONS: Record<string, React.ElementType> = { Globe, LayoutDashboard, Smartphone, Sparkles };

export default function HomePage() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative w-full max-w-[95%] mx-auto px-4 md:px-12 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto w-full max-w-none text-center">
          <Reveal>
            <span className="mono-label inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 font-medium text-accent backdrop-blur-xl">
              <MapPin className="h-3.5 w-3.5" /> Nellore · Andhra Pradesh
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-8 w-full text-3xl md:text-5xl font-normal uppercase tracking-[0.2em] leading-[1.25] text-white">
              Your local business.{" "}
              <span className="text-accent">Built for the digital world.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed font-normal text-ink-dim">
              Websites, custom web apps and dashboards, mobile apps, plus AI automation —
              designed and delivered by a team that understands Nellore businesses.
            </p>
            <p className="mt-2 text-base text-ink-faint">{SITE.teluguLine}</p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              {["Free consultation", "Fixed pricing", "Live in 7–14 days", "Post-launch support"].map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13px] font-medium uppercase tracking-[0.15em] text-ink backdrop-blur-xl">
                  <BadgeCheck className="h-3.5 w-3.5 text-accent" /> {c}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <GradientButton href="/quote">Get a free consultation</GradientButton>
              <GhostButton href="/demos">View demo projects</GhostButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= DEMO PROJECTS — FEATURED ================= */}
      <SectionWrapper
        id="demos"
        eyebrow="Live demo projects"
        title="See what we can build for you"
        subtitle="Fully-designed sample websites and apps for restaurants, clinics, real-estate, coaching, retail — plus a live dashboard and a mobile app."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DEMOS.map((d, i) => (
            <Reveal key={d.slug} delay={i * 0.06}>
              <Link href={`/demos/${d.slug}`} className="block focus-ring rounded-[14px]">
                <GlassCard hover className="h-full overflow-hidden !p-0">
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={d.image}
                      alt={`${d.title} — ${d.type} demo`}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-white">
                      {d.type}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-sm font-normal uppercase tracking-[0.2em] text-white">{d.title}</h3>
                    <p className="mt-1.5 text-sm text-ink-dim">{d.desc}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                      View demo <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <GhostButton href="/demos">Explore all demo projects</GhostButton>
        </div>
      </SectionWrapper>

      {/* ================= SERVICES ================= */}
      <SectionWrapper eyebrow="What we do" title="Services that grow your business">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <Reveal key={s.id} delay={i * 0.08}>
                <Link href={`/services#${s.id}`} className="block focus-ring rounded-[14px]">
                  <GlassCard className="h-full">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 font-display text-sm font-normal uppercase tracking-[0.2em] text-white">{s.title}</h3>
                    <p className="mt-2 text-sm text-ink-dim">{s.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </span>
                  </GlassCard>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </SectionWrapper>

      {/* ================= WHY FAIRA ================= */}
      <SectionWrapper eyebrow="Why FAIRA" title="Built local. Built serious.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: MapPin, title: "Local understanding", desc: "We know Nellore customers, Telugu-English audiences and local competition." },
            { icon: Timer, title: "Fast delivery", desc: "Most websites go live in 7–14 days. Dashboards and apps on clear milestones." },
            { icon: Wallet, title: "Transparent pricing", desc: "Fixed quotes, no surprise bills. Domain and hosting costs shown upfront." },
            { icon: Headphones, title: "Ongoing support", desc: "After launch we stay reachable — edits, uptime and growth advice." }
          ].map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <GlassCard>
                <f.icon className="h-7 w-7 text-accent" />
                <h3 className="mt-3 font-display text-sm font-normal uppercase tracking-[0.2em] text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-ink-dim">{f.desc}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>

      {/* ================= PROCESS ================= */}
      <SectionWrapper eyebrow="How we work" title="From first call to launch — in 4 steps">
        <div className="grid gap-5 md:grid-cols-4">
          {PROCESS.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.1}>
              <div className="h-full rounded-[14px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <span className="font-mono text-2xl font-light text-accent">{p.step}</span>
                <h3 className="mt-3 font-display text-sm font-normal uppercase tracking-[0.2em] text-white">{p.title}</h3>
                <p className="mt-1.5 text-sm text-ink-dim">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>

      {/* ================= WHAT YOU GET ================= */}
      <SectionWrapper eyebrow="What you get" title="Every project, start to finish">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: MessageSquare, title: "Free consultation", desc: "A real conversation about your business — over call, WhatsApp or in person in Nellore." },
            { icon: FileText, title: "Written proposal", desc: "Scope, pages, features, timeline and price — on paper before any work starts." },
            { icon: BadgeCheck, title: "Fixed-price build", desc: "The price we quote is the price you pay. Add-ons are always discussed first." },
            { icon: Globe, title: "SEO-ready launch", desc: "Google Search Console, sitemap, fast pages and proper structure from day one." },
            { icon: ShieldCheck, title: "You own everything", desc: "Domain, hosting and code are in your name — no lock-in, ever." },
            { icon: Headphones, title: "Support after launch", desc: "Small edits, uptime checks and honest advice whenever you need us." }
          ].map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <GlassCard className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                  <f.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-sm font-normal uppercase tracking-[0.2em] text-white">{f.title}</h3>
                  <p className="mt-1 text-sm text-ink-dim">{f.desc}</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>

      {/* ================= PRICING ================= */}
      <SectionWrapper
        eyebrow="Pricing"
        title="Honest pricing, fixed quotes"
        subtitle="Domain, hosting and maintenance billed separately at actuals — always shown upfront."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {PRICING.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.07}>
              <GlassCard className="flex h-full flex-col">
                <p className="mono-label font-medium uppercase tracking-[0.2em]">{p.name}</p>
                <p className="mt-3 font-display text-lg font-light tracking-[0.1em] text-accent">{p.price}</p>
                <p className="mt-3 flex-1 text-sm text-ink-dim">{p.desc}</p>
                <Link
                  href="/quote"
                  className="mt-5 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-accent hover:underline"
                >
                  Get exact quote <ArrowRight className="h-4 w-4" />
                </Link>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>

      {/* ================= CTA BANNER ================= */}
      <SectionWrapper className="!py-14">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-r from-accent to-accent-deep px-8 py-16 text-center text-white md:px-16">
            <h2 className="font-display text-2xl md:text-4xl font-normal uppercase tracking-[0.15em] leading-[1.3] text-white">
              Ready to take your business online?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg font-normal text-white/85">
              Book a free consultation. We&apos;ll suggest exactly what your business needs — no pressure, no jargon.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                href="/quote"
                className="focus-ring inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-accent-deep transition-transform hover:-translate-y-0.5"
              >
                Get a free consultation
              </Link>
              <Link
                href="/contact"
                className="focus-ring inline-flex items-center gap-2 rounded-xl border border-white/50 px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/10"
              >
                Talk to us first
              </Link>
            </div>
          </div>
        </Reveal>
      </SectionWrapper>
    </>
  );
}
