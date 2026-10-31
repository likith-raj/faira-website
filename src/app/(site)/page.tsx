"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bot, MessageSquare, Mic, Zap } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* HERO */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 md:px-12 pt-20">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-5xl flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-8 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#E05A33] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">AI Agency · Nellore</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light uppercase tracking-wider leading-tight text-white drop-shadow-lg">
            Your Business, <br />
            <span className="text-[#E05A33] font-normal">Available 24/7.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-zinc-300 max-w-2xl font-light tracking-wide text-center drop-shadow-md">
            We build human-like AI Voice and Chat Agents for Nellore businesses — answer questions, book appointments, and collect leads automatically.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <Link href="/quote" className="bg-[#E05A33] px-10 py-5 text-sm font-bold uppercase tracking-widest text-white rounded-full hover:bg-[#C94A25] transition-all hover:scale-105 shadow-[0_0_20px_rgba(224,90,51,0.5)]">
              Get a Free AI Consultation
            </Link>
            <Link href="/demos/chatbot" className="border border-white/20 px-10 py-5 text-sm font-bold uppercase tracking-widest text-white rounded-full hover:bg-white/10 transition-all">
              Talk to a Demo AI
            </Link>
          </div>
        </motion.div>
      </section>

      {/* SERVICES */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto w-full">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-3xl md:text-5xl font-light uppercase tracking-widest text-white drop-shadow-lg">What We Build</h2>
          <div className="h-[1px] flex-1 bg-white/20 ml-8 mb-4" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "AI Voice Agents", desc: "Phone answering, appointment booking, and customer support — using Whisper + Piper TTS.", icon: Mic },
            { title: "AI Chat Agents", desc: "WhatsApp automation, website chatbots, FAQ answering, and lead collection.", icon: MessageSquare },
            { title: "AI Automation", desc: "Custom workflows, report generation, and CRM integration for your business.", icon: Zap }
          ].map((s, i) => (
            <motion.div 
              key={s.title}
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 p-10 hover:border-[#E05A33]/50 hover:bg-black/60 transition-all duration-500 shadow-2xl"
            >
              <s.icon className="h-10 w-10 text-[#E05A33] mb-6" />
              <h3 className="text-xl font-light uppercase tracking-widest mb-3 text-white">{s.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto w-full">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-3xl md:text-5xl font-light uppercase tracking-widest text-white drop-shadow-lg">Pricing</h2>
          <div className="h-[1px] flex-1 bg-white/20 ml-8 mb-4" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "AI Chat Agent", price: "₹1,500 setup", maint: "₹500/month", desc: "Website chatbot, WhatsApp automation, FAQ answering." },
            { name: "AI Voice Agent", price: "₹5,000 setup", maint: "₹1,500/month", desc: "Human-like voice calls, appointment booking, customer support." },
            { name: "Custom AI Automation", price: "Quote based", maint: "", desc: "Tailored workflows, CRM integration, custom reports." }
          ].map((p, i) => (
            <motion.div 
              key={p.name}
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 p-10 hover:border-[#E05A33]/50 hover:bg-black/60 transition-all duration-500 shadow-2xl flex flex-col"
            >
              <h3 className="text-xl font-light uppercase tracking-widest mb-3 text-white">{p.name}</h3>
              <p className="text-[#E05A33] font-bold text-lg">{p.price}</p>
              {p.maint && <p className="text-zinc-400 text-sm">+ {p.maint}</p>}
              <p className="text-zinc-400 text-sm leading-relaxed mt-4 flex-1">{p.desc}</p>
              <Link href="/quote" className="mt-6 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-[#E05A33] hover:underline">
                Get a Quote <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-5xl font-light uppercase tracking-widest mb-10 text-white drop-shadow-lg">Ready to automate your business?</h2>
          <Link href="/quote" className="inline-flex items-center gap-3 bg-white text-black px-12 py-6 text-sm font-bold uppercase tracking-widest rounded-full hover:bg-zinc-200 transition-all hover:scale-105">
            Get a Free AI Consultation <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}