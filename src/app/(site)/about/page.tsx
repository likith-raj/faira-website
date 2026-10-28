import type { Metadata } from "next";
import Image from "next/image";
import { Target, Heart, Rocket, Users } from "lucide-react";
import { GlassCard, GradientButton, Reveal, SectionWrapper } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "FAIRA is a young digital agency in Nellore, Andhra Pradesh helping local businesses go online with websites, web apps, mobile apps and AI."
};

export default function AboutPage() {
  return (
    <SectionWrapper eyebrow="About FAIRA" title="A local team with big-agency standards">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6 text-ink-dim leading-relaxed">
          <Reveal>
            <p className="text-lg text-ink">
              FAIRA started with a simple frustration: Nellore business owners were being sold
              slow, outdated websites at confusing prices — or nothing at all.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p>
              We are a small, senior-minded team that treats every project like a product. Whether
              it&apos;s a restaurant menu site, a clinic appointment system or a full custom
              dashboard, we design first, build fast, and stay reachable after launch.
            </p>
            <p className="mt-4">
              Our signature is a premium, modern, dashboard-inspired design style — the same
              aesthetic we use in our own software tools — applied to your business so your brand
              looks established from day one.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: Target, title: "Mission", desc: "Make every local business in AP look world-class online." },
                { icon: Heart, title: "Values", desc: "Honest pricing, clear communication, design pride." },
                { icon: Rocket, title: "Approach", desc: "Small team, modern stack, fast iterations, real support." },
                { icon: Users, title: "For you", desc: "Restaurants, clinics, coaches, retailers, agencies and startups." }
              ].map((v) => (
                <GlassCard key={v.title}>
                  <v.icon className="h-6 w-6 text-accent" />
                  <p className="mt-3 font-display font-bold">{v.title}</p>
                  <p className="mt-1.5 text-sm">{v.desc}</p>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="space-y-5">
          <Reveal delay={0.1}>
            <div className="glass overflow-hidden rounded-2xl">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1522071820181-0666ce876340?w=1200&q=80"
                  alt="FAIRA team working on designs in Nellore"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <GlassCard hover={false}>
              <p className="mono-label mb-5">Our commitments to you</p>
              <ul className="space-y-4">
                {[
                  { t: "Fixed, written quotes", d: "The price we agree is the price you pay. Domain and hosting costs shown upfront at actuals." },
                  { t: "You see the work as it happens", d: "Progress demos during build, so there are no surprises at launch." },
                  { t: "Honest timelines", d: "We tell you what is realistically possible in 7 days versus 7 weeks — before you pay." },
                  { t: "Support after launch", d: "We stay reachable for edits, uptime issues and growth advice." }
                ].map((c) => (
                  <li key={c.t} className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                    <div>
                      <p className="text-sm font-bold text-ink">{c.t}</p>
                      <p className="mt-0.5 text-sm text-ink-dim">{c.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="text-center">
              <GradientButton href="/quote">Work with us in {SITE.city.split(",")[0]}</GradientButton>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionWrapper>
  );
}
