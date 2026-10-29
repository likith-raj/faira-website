"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = ["Services", "Demos", "About", "Contact"];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 max-w-[95%] items-center justify-between px-4 md:px-12">
          <Link href="/" className="font-display text-xl uppercase tracking-[0.3em] text-white">
            FAIRA
          </Link>
          <nav className="hidden md:flex items-center gap-10">
            {LINKS.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-xs font-bold uppercase tracking-widest text-zinc-300 hover:text-[#E05A33] transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
          <Link
            href="/quote"
            className="hidden md:inline-flex rounded-full bg-[#E05A33] px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white transition-all hover:scale-105 shadow-[0_0_15px_rgba(224,90,51,0.3)]"
          >
            Get a Quote
          </Link>
        </div>
      </motion.header>

      {/* Mobile floating dock */}
      <div className="fixed bottom-5 inset-x-0 z-50 flex justify-end px-5 md:hidden">
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute right-5 bottom-[72px] w-[calc(100%-2.5rem)] max-w-sm rounded-3xl border border-white/10 bg-black/80 p-4 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.6)]"
          >
            {LINKS.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-widest text-zinc-200 hover:bg-white/5 hover:text-[#E05A33]"
              >
                {item}
              </Link>
            ))}
            <Link
              href="/quote"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-xl bg-[#E05A33] px-4 py-3 text-center text-sm font-black uppercase tracking-widest text-white"
            >
              Get a Quote
            </Link>
          </motion.nav>
        )}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E05A33]/50 bg-black/70 text-[#E05A33] backdrop-blur-xl shadow-[0_0_25px_rgba(224,90,51,0.35)] transition-transform active:scale-90"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
    </>
  );
}
