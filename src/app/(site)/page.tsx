"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mic, MessageSquare, Zap } from "lucide-react";
import { VoiceAgent } from "@/components/VoiceAgent";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 md:px-12 pt-20">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-5xl flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-8 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#E05A33] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">AI Agency · Nellore</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-light uppercase tracking-wider leading-tight text-white drop-shadow-lg">
            Your Business, <br />
            <span className="text-[#E05A33] font-normal">Available 24/7.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-zinc-300 max-w-2xl font-light tracking-wide text-center drop-shadow-md">
            We build human-like AI Voice and Chat Agents for Nellore businesses — answer questions, book appointments, and collect leads automatically.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <Link href="/contact" className="bg-[#E05A33] px-10 py-5 text-sm font-bold uppercase tracking-widest text-white rounded-full hover:bg-[#C94A25] transition-all hover:scale-105 shadow-[0_0_20px_rgba(224,90,51,0.5)]">
              Contact Us
            </Link>
            <Link href="/demos/voice" className="border border-white/20 px-10 py-5 text-sm font-bold uppercase tracking-widest text-white rounded-full hover:bg-white/10 transition-all flex items-center gap-2">
              <Mic size={18} /> Try Voice Demo
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }} className="mt-16 w-full max-w-3xl">
          <VoiceAgent compact />
        </motion.div>
      </section>

      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto w-full">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-3xl md:text-5xl font-light uppercase tracking-widest text-white drop-shadow-lg">What We Build</h2>
          <div className="h-[1px] flex-1 bg-white/20 ml-8 mb-4" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "AI Automation", desc: "Custom workflows, report generation, and CRM integration for your business.", icon: Zap, href: "/contact", cta: "Contact Us" },
            { title: "AI Voice Agents", desc: "Phone answering, appointment booking, and customer support — real AI that listens and replies out loud.", icon: Mic, href: "/demos/voice", cta: "Try Demo" },
            { title: "AI Chat Agents", desc: "WhatsApp automation, website chatbots, FAQ answering, and lead collection.", icon: MessageSquare, href: "/demos/chatbot", cta: "Try Demo" }
          ].map((s, i) => (
            <Link key={s.title} href={s.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative overflow-hidden rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 p-10 hover:border-[#E05A33]/50 hover:bg-black/60 transition-all duration-500 shadow-2xl h-full"
              >
                <s.icon className="h-10 w-10 text-[#E05A33] mb-6" />
                <h3 className="text-xl font-light uppercase tracking-widest mb-3 text-white">{s.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-[#E05A33] font-bold text-xs uppercase tracking-wider">
                  {s.cta} <ArrowRight size={14} />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}