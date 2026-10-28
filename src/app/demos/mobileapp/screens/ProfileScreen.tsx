import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  Copy,
  CreditCard,
  Crown,
  Headphones,
  MapPin,
  Settings,
  Star,
} from "lucide-react";

const menu = [
  { label: "Payments & UPI", icon: CreditCard, tint: "bg-[#FDEBDD] text-[#E05A33]" },
  { label: "Saved Addresses", icon: MapPin, tint: "bg-[#FDEBDD] text-[#C94A25]" },
  { label: "Support Chat", icon: Headphones, tint: "bg-[#F9F8F6] text-[#E05A33]" },
  { label: "Settings", icon: Settings, tint: "bg-[#F9F8F6] text-[#6B7280]" },
];

const stats = [
  { value: "24", label: "Bookings" },
  { value: "₹3,180", label: "Saved" },
  { value: "4.9", label: "Avg rating" },
];

export default function ProfileScreen() {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="qs-scroll flex-1 overflow-y-auto px-4 pb-4">
      {/* app header */}
      <div className="flex items-center justify-between pt-1">
        <p className="qs-heading text-[16px] font-extrabold uppercase text-[#1A1A1A]">Profile</p>
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#F9F8F6] text-[#6B7280]">
          <Settings className="h-4 w-4" />
        </span>
      </div>

      {/* user card */}
      <div className="qs-gradient-bg mt-3 rounded-2xl p-4 text-white shadow-[0_12px_28px_rgba(224,90,51,0.25)]">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white/20 text-[15px] font-extrabold ring-2 ring-white/40">
            PN
          </span>
          <div className="flex-1">
            <p className="qs-heading text-[15px] font-extrabold">Priya Nandamuri</p>
            <p className="text-[11px] text-white/85">+91 98492 11734</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/15 px-3 py-2">
          <Crown className="h-4 w-4 text-white" />
          <span className="flex-1 text-[11px] font-bold">Gold Member</span>
          <span className="text-[10px] text-white/80">since Mar 2024</span>
        </div>
      </div>

      {/* stats */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl bg-white py-2.5 text-center shadow-[0_4px_12px_rgba(26,26,26,0.04)] ring-1 ring-[#EAEAEA]"
          >
            <p className="qs-heading flex items-center justify-center gap-0.5 text-[14px] font-extrabold text-[#1A1A1A]">
              {s.label === "Avg rating" && (
                <Star className="h-3 w-3 fill-[#E05A33] text-[#E05A33]" />
              )}
              {s.value}
            </p>
            <p className="text-[9px] font-semibold uppercase tracking-wide text-[#9CA3AF]">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* menu rows */}
      <div className="mt-3 divide-y divide-[#EAEAEA] rounded-2xl bg-white shadow-[0_4px_12px_rgba(26,26,26,0.04)] ring-1 ring-[#EAEAEA]">
        {menu.map(({ label, icon: Icon, tint }) => (
          <button
            key={label}
            type="button"
            className="flex w-full items-center gap-3 px-3.5 py-3 text-left active:bg-[#F9F8F6]"
          >
            <span className={`grid h-8 w-8 place-items-center rounded-lg ${tint}`}>
              <Icon className="h-4 w-4" />
            </span>
            <span className="flex-1 text-[12px] font-semibold text-[#1A1A1A]">{label}</span>
            <ChevronRight className="h-4 w-4 text-[#9CA3AF]" />
          </button>
        ))}
      </div>

      {/* referral card */}
      <div className="mt-3 rounded-2xl border border-dashed border-[#E05A33]/40 bg-[#FDEBDD]/50 p-3.5">
        <p className="text-[12px] font-bold text-[#1A1A1A]">
          Refer a friend, get <span className="text-[#C94A25]">₹200</span> each
        </p>
        <p className="mt-0.5 text-[10px] text-[#6B7280]">
          They get ₹150 off their first QuickServe booking.
        </p>
        <div className="mt-2.5 flex items-center gap-2">
          <span className="flex-1 rounded-xl border border-[#EAEAEA] bg-white px-3 py-2 text-[11px] font-extrabold tracking-wide text-[#C94A25]">
            QS-PRIYA200
          </span>
          <button
            type="button"
            onClick={copyCode}
            className="qs-gradient-bg flex items-center gap-1.5 rounded-xl px-3 py-2 text-[11px] font-bold text-white active:scale-95"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? "done" : "copy"}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-1.5"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" strokeWidth={3} /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> Copy code
                  </>
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>
    </div>
  );
}
