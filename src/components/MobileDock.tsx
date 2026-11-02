"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Mic, MessagesSquare, Phone } from "lucide-react";

const LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/demos", label: "Demos", icon: MessagesSquare },
  { href: "/demos/voice", label: "Voice AI", icon: Mic },
  { href: "/contact", label: "Contact", icon: Phone }
];

export function MobileDock() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full border border-white/10 bg-black/70 px-2 py-2 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.55)] md:hidden">
      {LINKS.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex min-w-[64px] flex-col items-center gap-1 rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${
              active ? "bg-[#E05A33]/20 text-[#E05A33]" : "text-zinc-300 hover:text-[#E05A33]"
            }`}
          >
            <link.icon size={16} />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
