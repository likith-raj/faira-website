import Link from "next/link";
import { Zap } from "lucide-react";

export default function FairaDemoBadge() {
  return (
    <Link
      href="/demos"
      aria-label="This is a FAIRA demo — see more demos"
      className="fixed bottom-4 right-4 z-[90] inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-4 py-2.5 text-xs font-semibold text-[#F9F8F6] shadow-[0_10px_40px_rgba(0,0,0,0.55)] backdrop-blur-md transition-transform hover:-translate-y-0.5"
    >
      <span className="grid h-5 w-5 place-items-center rounded-md bg-[#E05A33] text-white">
        <Zap className="h-3 w-3" strokeWidth={2.6} />
      </span>
      FAIRA Demo
    </Link>
  );
}
