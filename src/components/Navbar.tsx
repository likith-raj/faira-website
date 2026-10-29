"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-20 max-w-[95%] items-center justify-between px-4 md:px-12">
        <Link href="/" className="font-display text-2xl font-black uppercase tracking-[0.3em] text-white">
          FAIRA
        </Link>
        <nav className="hidden md:flex items-center gap-10">
          {["Services", "Demos", "About", "Contact"].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} className="text-xs font-bold uppercase tracking-widest text-zinc-300 hover:text-[#E05A33] transition-colors">
              {item}
            </Link>
          ))}
        </nav>
        <Link href="/quote" className="rounded-full bg-[#E05A33] px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white transition-all hover:scale-105 shadow-[0_0_15px_rgba(224,90,51,0.3)]">
          Get a Quote
        </Link>
      </div>
    </motion.header>
  );
}
