"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Mic, Zap } from "lucide-react";

export default function DemosPage() {
  const demos = [
    {
      slug: "/demos/chatbot",
      title: "FAIRA AI Chat Assistant",
      desc: "Live AI chatbot that answers customer questions about our services, pricing, and voice agents.",
      icon: Bot,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full text-center"
      >
        <h1 className="text-4xl md:text-6xl font-light uppercase tracking-widest mb-6 text-white">
          Live AI Demos
        </h1>
        <p className="text-lg text-zinc-400 mb-12">
          Talk to our AI Chat Agent and see how it answers real business questions.
        </p>

        <div className="grid md:grid-cols-1 gap-6 max-w-2xl mx-auto">
          {demos.map((demo) => (
            <Link
              key={demo.slug}
              href={demo.slug}
              className="group block p-10 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl hover:border-[#E05A33]/50 hover:bg-black/60 transition-all duration-500 text-left"
            >
              <demo.icon className="h-10 w-10 text-[#E05A33] mb-6" />
              <h2 className="text-2xl font-light uppercase tracking-widest text-white mb-2">
                {demo.title}
              </h2>
              <p className="text-zinc-400 mb-4">{demo.desc}</p>
              <span className="text-[#E05A33] font-bold uppercase tracking-wider flex items-center gap-2">
                Try the Demo <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}