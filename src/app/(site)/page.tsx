"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CAPABILITIES = [
  {
    title: "Website Development",
    desc: "Premium business websites, stores and landing pages that load fast and rank on Google.",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    alt: "Team designing a website on laptops"
  },
  {
    title: "Web Development",
    desc: "Custom dashboards, client portals and booking systems built around your daily operations.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    alt: "Analytics dashboard on screen"
  },
  {
    title: "App Development",
    desc: "Android and iOS apps that keep your customers one tap away.",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    alt: "Smartphone showing a mobile app"
  },
  {
    title: "Automation & AI",
    desc: "Repeatless workflows — automatic reports, reminders and follow-ups for your team.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    alt: "Circuit board representing automation"
  },
  {
    title: "AI Chatbots",
    desc: "WhatsApp and website assistants that reply to customers instantly, day and night.",
    img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    alt: "Connected network representing an AI assistant"
  }
];

export default function HomePage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 md:px-12 pt-24 pb-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-[95%] flex flex-col items-center rounded-3xl border border-white/10 bg-black/55 px-6 py-14 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.55)]"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-8 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#E05A33] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">Nellore - Andhra Pradesh</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light uppercase tracking-widest leading-[1.25] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
            Your Local Business. <br />
            <span className="text-[#E05A33]">Built for the Digital World.</span>
          </h1>
          <p className="mt-8 text-base md:text-lg text-zinc-300 max-w-2xl tracking-wide text-center">
            Websites, custom web apps, and mobile apps designed for Nellore businesses.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <Link href="/quote" className="bg-[#E05A33] px-10 py-5 text-sm font-bold uppercase tracking-widest text-white rounded-full hover:bg-[#C94A25] transition-all duration-300 hover:scale-[1.02] shadow-[0_0_25px_rgba(224,90,51,0.35)]">
              Get a Consultation
            </Link>
            <Link href="/demos" className="border border-white/20 bg-white/5 px-10 py-5 text-sm font-bold uppercase tracking-widest text-white rounded-full backdrop-blur-sm hover:border-[#E05A33]/60 hover:text-[#E05A33] transition-all duration-300 hover:scale-[1.02]">
              View Demos
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="py-24 px-6 md:px-16 w-full max-w-[95%] mx-auto">
        <h2 className="text-3xl md:text-5xl font-light uppercase tracking-widest text-white mb-12 [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
          Our Capabilities
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.8, ease: "easeOut" }}
              className="group relative min-h-[340px] overflow-hidden rounded-3xl border border-white/10 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-[#E05A33]/60 hover:shadow-[0_0_45px_rgba(224,90,51,0.28)]"
            >
              <Image
                src={cap.img}
                alt={cap.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/15" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <h3 className="text-xl uppercase tracking-widest mb-3 text-white">{cap.title}</h3>
                <p className="text-zinc-300 text-sm leading-relaxed">{cap.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#E05A33]">
                  Learn more <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 text-center w-full max-w-[95%] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <h2 className="text-4xl md:text-6xl font-light uppercase tracking-widest mb-10 text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">Ready to start?</h2>
          <Link href="/quote" className="inline-flex items-center gap-3 bg-white text-black px-12 py-6 text-sm font-bold uppercase tracking-widest rounded-full hover:bg-zinc-200 transition-all duration-300 hover:scale-[1.02]">
            Get a Free Quote <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
