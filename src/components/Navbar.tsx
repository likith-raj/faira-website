"use client";
import Link from "next/link";
import { Home, LayoutGrid, Users, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-xl shadow-2xl">
        <Link href="/" className="group flex flex-col items-center gap-1 px-4 py-1 text-zinc-400 hover:text-[#E05A33] transition-colors">
          <Home className="h-5 w-5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
        </Link>
        <div className="h-8 w-[1px] bg-white/10" />
        <Link href="/services" className="group flex flex-col items-center gap-1 px-4 py-1 text-zinc-400 hover:text-[#E05A33] transition-colors">
          <LayoutGrid className="h-5 w-5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Services</span>
        </Link>
        <div className="h-8 w-[1px] bg-white/10" />
        <Link href="/about" className="group flex flex-col items-center gap-1 px-4 py-1 text-zinc-400 hover:text-[#E05A33] transition-colors">
          <Users className="h-5 w-5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">About</span>
        </Link>
        <div className="h-8 w-[1px] bg-white/10" />
        <Link href="/contact" className="group flex flex-col items-center gap-1 px-4 py-1 text-zinc-400 hover:text-[#E05A33] transition-colors">
          <MessageSquare className="h-5 w-5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Contact</span>
        </Link>
        <div className="h-8 w-[1px] bg-white/10" />
        <Link href="/quote" className="ml-2 rounded-full bg-[#E05A33] px-6 py-2 text-xs font-black uppercase tracking-wider text-white transition-transform hover:scale-105 shadow-[0_0_15px_rgba(224,90,51,0.4)]">
          Get a Quote
        </Link>
      </div>
    </motion.div>
  );
}
