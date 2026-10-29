"use client";
import Link from "next/link";
import { SERVICES } from "@/lib/site";
import { motion } from "framer-motion";
import { ArrowRight, Globe, LayoutDashboard, Smartphone, Sparkles, MessageSquare } from "lucide-react";

const ICONS: Record<string, React.ElementType> = { Globe, LayoutDashboard, Smartphone, Sparkles, MessageSquare };

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full pb-32">
      {/* HERO */}
      <section className="min-h-[90vh] flex flex-col justify-center px-6 md:px-16 pt-20">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-8 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#E05A33] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">Nellore · Andhra Pradesh</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light uppercase tracking-[0.1em] leading-[1.1] text-white">
            Your Local Business. <br />
            <span className="text-[#E05A33] font-normal">Built for the Digital World.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-zinc-400 max-w-2xl font-light tracking-wide">
            Websites, custom web apps, and mobile apps designed for Nellore businesses.
          </p>
          <div className="mt-12 flex gap-6">
            <Link href="/quote" className="bg-[#E05A33] px-10 py-5 text-sm font-bold uppercase tracking-widest text-white rounded-full hover:bg-[#C94A25] transition-all hover:scale-105 shadow-[0_0_20px_rgba(224,90,51,0.3)]">
              Get a Consultation
            </Link>
          </div>
        </motion.div>
      </section>

      {/* MODULAR SERVICES GRID */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto w-full">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-end justify-between mb-12">
          <h2 className="text-3xl md:text-5xl font-light uppercase tracking-[0.2em] text-white">Our Capabilities</h2>
          <div className="h-[1px] flex-1 bg-white/10 ml-8 mb-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <motion.div 
                key={s.id}
                initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl bg-zinc-900/40 border border-zinc-800 p-10 hover:border-[#E05A33]/50 hover:bg-zinc-900/80 transition-all duration-500"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 group-hover:text-[#E05A33] transition-all duration-500">
                  {Icon && <Icon className="h-24 w-24" />}
                </div>
                <div className="relative z-10">
                  <span className="text-[#E05A33] mb-6 block">{Icon && <Icon className="h-8 w-8" />}</span>
                  <h3 className="text-xl font-light uppercase tracking-widest mb-3 text-white">{s.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-[80%]">{s.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-6xl font-light uppercase tracking-widest mb-10 text-white">Ready to start?</h2>
          <Link href="/quote" className="inline-flex items-center gap-3 bg-white text-black px-12 py-6 text-sm font-bold uppercase tracking-widest rounded-full hover:bg-zinc-200 transition-all hover:scale-105">
            Get a Free Quote <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
