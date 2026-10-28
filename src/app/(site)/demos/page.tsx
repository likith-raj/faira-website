import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GlassCard, Reveal, SectionWrapper } from "@/components/ui";
import { DEMOS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Demos",
  description: "Seven fully-designed demo websites and apps by FAIRA — restaurant, clinic, real estate, coaching, retail, custom web app and mobile app."
};

export default function DemosPage() {
  return (
    <SectionWrapper
      eyebrow="Demo gallery"
      title="Real designs. Real features. See them live."
      subtitle="Every demo below is a complete, working design built by FAIRA — click through to explore. Sample businesses and prices are illustrative."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {DEMOS.map((d, i) => (
          <Reveal key={d.slug} delay={i * 0.06}>
            <Link href={`/demos/${d.slug}`} className="block focus-ring rounded-[14px]">
              <GlassCard hover className="group h-full overflow-hidden !p-0">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={d.image}
                    alt={`${d.title} — ${d.type} demo by FAIRA`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/90 to-transparent" />
                  <span
                    className="absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold text-white"
                    style={{ background: d.accent }}
                  >
                    {d.type}
                  </span>
                </div>
                <div className="p-5">
                  <h2 className="font-display text-lg font-bold">{d.title}</h2>
                  <p className="mt-1.5 text-sm text-ink-dim">{d.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    View Demo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </GlassCard>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 text-center text-sm text-ink-faint">
        Like something? Mix and match — we build custom versions for your business.{" "}
        <Link href="/quote" className="text-accent hover:underline">
          Get a quote →
        </Link>
      </Reveal>
    </SectionWrapper>
  );
}
