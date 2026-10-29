"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-8 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#E05A33] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">Nellore - Andhra Pradesh</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light uppercase tracking-wider leading-tight text-white">
            Your Local Business. <br />
            <span className="text-[#E05A33] font-normal">Built for the Digital World.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-zinc-300 max-w-2xl font-light tracking-wide text-center">
            Websites, custom web apps, and mobile apps designed for Nellore businesses.
          </p>
          <div className="mt-12 flex gap-6">
            <Link href="/quote" className="bg-[#E05A33] px-10 py-5 text-sm font-bold uppercase tracking-widest text-white rounded-full hover:bg-[#C94A25] transition-all hover:scale-105 shadow-lg">
              Get a Consultation
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto w-full">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-3xl md:text-5xl font-light uppercase tracking-widest text-white">Our Capabilities</h2>
          <div className="h-[1px] flex-1 bg-white/20 ml-8 mb-4" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {["Website Development", "Web Development", "App Development", "Automation & AI", "AI Chatbots"].map((title, i) => (
            <motion.div 
              key={title}
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 p-10 hover:border-[#E05A33]/50 hover:bg-black/60 transition-all duration-500 shadow-2xl"
            >
              <div className="relative z-10">
                <h3 className="text-xl font-light uppercase tracking-widest mb-3 text-white">{title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Premium solutions designed for Nellore businesses.</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-6xl font-light uppercase tracking-widest mb-10 text-white">Ready to start?</h2>
          <Link href="/quote" className="inline-flex items-center gap-3 bg-white text-black px-12 py-6 text-sm font-bold uppercase tracking-widest rounded-full hover:bg-zinc-200 transition-all hover:scale-105">
            Get a Free Quote <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}