"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[95%] items-center justify-between px-4 md:px-12">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-display text-xl font-black uppercase tracking-[0.3em] text-white">FAIRA</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {["Services", "Demos", "About", "Contact"].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#E05A33]">{item}</Link>
          ))}
        </nav>
        <Link href="/quote" className="hidden md:inline-flex bg-[#E05A33] px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white rounded hover:bg-[#C94A25]">Get a Consultation</Link>
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-black/90 p-4 flex flex-col gap-4 border-b border-white/10">
          {["Services", "Demos", "About", "Contact"].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} className="text-sm font-bold uppercase tracking-widest text-gray-300" onClick={() => setIsOpen(false)}>{item}</Link>
          ))}
          <Link href="/quote" className="bg-[#E05A33] text-center px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white rounded" onClick={() => setIsOpen(false)}>Get a Consultation</Link>
        </div>
      )}
    </header>
  );
}
