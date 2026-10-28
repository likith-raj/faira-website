"use client";

import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CENTRE, NAV_LINKS } from "../data";
import { scrollToSection } from "../utils";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header className="sticky top-0 z-[80]">
      <div className="hidden border-b border-[#EAEAEA] bg-[#F9F8F6] px-5 py-2 text-[12.5px] text-[#6B7280] md:block md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <p>
            Admissions open for the 2026–27 academic year · Free counselling every Saturday, 10 AM – 1 PM
          </p>
          <a
            href={`tel:${CENTRE.phoneHref}`}
            className="inline-flex items-center gap-1.5 font-medium text-[#E05A33] hover:text-[#C94A25]"
          >
            <Phone className="h-3.5 w-3.5" /> {CENTRE.phoneDisplay}
          </a>
        </div>
      </div>

      <div
        className={`border-b bg-[#F9F8F6]/95 backdrop-blur transition-shadow ${
          scrolled ? "border-[#EAEAEA] shadow-[0_8px_26px_-18px_rgba(26,26,26,0.4)]" : "border-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-8">
          <button
            type="button"
            onClick={() => go("hero")}
            className="flex items-center gap-2.5 text-left"
            aria-label="BrightPath Academy — go to top of page"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#E05A33] to-[#C94A25] text-white shadow-[0_10px_22px_-12px_rgba(224,90,51,0.9)]">
              <GraduationCap className="h-6 w-6" strokeWidth={2.1} />
            </span>
            <span className="leading-tight">
              <span className="bp-font-display block text-[17px] font-extrabold tracking-tight text-[#1A1A1A]">
                BrightPath <span className="text-[#E05A33]">Academy</span>
              </span>
              <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-[#6B7280]">
                Stadium Road · Nellore
              </span>
            </span>
          </button>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => go(l.id)}
                className="bp-font-display bp-underline rounded-lg px-3.5 py-2 text-[14.5px] font-semibold text-[#6B7280] transition-colors hover:text-[#E05A33]"
              >
                {l.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => go("enquiry")}
              className="bp-font-display ml-3 rounded-full bg-[#E05A33] px-5 py-2.5 text-[14.5px] font-semibold text-white shadow-[0_14px_28px_-14px_rgba(224,90,51,0.95)] transition-all hover:-translate-y-0.5 hover:bg-[#C94A25]"
            >
              Enroll Now
            </button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-xl border border-[#EAEAEA] text-[#1A1A1A] lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.24, ease: "easeInOut" }}
              className="overflow-hidden border-t border-[#EAEAEA] bg-white lg:hidden"
            >
              <div className="mx-auto max-w-7xl px-5 py-4">
                <div className="grid gap-1.5">
                  {NAV_LINKS.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => go(l.id)}
                      className="bp-font-display rounded-xl px-3 py-2.5 text-left text-[15px] font-semibold text-[#1A1A1A] hover:bg-[#FDEBDD] hover:text-[#E05A33]"
                    >
                      {l.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => go("enquiry")}
                    className="bp-font-display mt-1 rounded-xl bg-[#E05A33] px-3 py-3 text-[15px] font-bold text-white"
                  >
                    Enroll Now
                  </button>
                  <a
                    href={`tel:${CENTRE.mobileHref}`}
                    className="bp-font-display mt-1 inline-flex items-center justify-center gap-2 rounded-xl border border-[#EAEAEA] px-3 py-2.5 text-[14px] font-semibold text-[#1A1A1A]"
                  >
                    <Phone className="h-4 w-4 text-[#E05A33]" /> {CENTRE.mobileDisplay}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
