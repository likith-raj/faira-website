"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = ["Services", "Demos", "About", "Contact"];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[95%] items-center justify-between px-4 md:px-12">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-base font-normal text-white">
            F
          </div>
          <span className="font-display text-lg font-normal uppercase tracking-[0.3em] text-white">
            FAIRA
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {LINKS.map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-dim transition-colors hover:text-accent"
            >
              {item}
            </Link>
          ))}
          <Link
            href="/quote"
            className="rounded-md bg-accent px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-accent-deep"
          >
            Get a consultation
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="focus-ring rounded-md p-2 text-white md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-black/80 px-4 py-4 backdrop-blur-xl md:hidden">
          {LINKS.map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm font-medium uppercase tracking-[0.18em] text-ink-dim hover:bg-white/5 hover:text-accent"
            >
              {item}
            </Link>
          ))}
          <Link
            href="/quote"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-md bg-accent px-3 py-2.5 text-center text-sm font-medium uppercase tracking-[0.18em] text-white"
          >
            Get a consultation
          </Link>
        </nav>
      )}
    </header>
  );
}
