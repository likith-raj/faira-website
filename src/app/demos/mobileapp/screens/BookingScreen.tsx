import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronRight, Clock, MapPin, Sparkles } from "lucide-react";

const dates = [
  { day: "Mon", date: "22" },
  { day: "Tue", date: "23" },
  { day: "Wed", date: "24" },
  { day: "Thu", date: "25" },
  { day: "Fri", date: "26" },
];

const slots = [
  { time: "09:00 AM", full: false },
  { time: "11:00 AM", full: false },
  { time: "01:00 PM", full: true },
  { time: "03:00 PM", full: false },
  { time: "05:00 PM", full: false },
  { time: "07:00 PM", full: false },
];

const priceRows = [
  { label: "Home cleaning · 2 BHK", value: "₹299" },
  { label: "Deep scrub add-on", value: "₹60" },
  { label: "GST & service charge", value: "₹40" },
];

type ToastKind = "success" | "warn";

export default function BookingScreen() {
  const [dateIdx, setDateIdx] = useState(2);
  const [slot, setSlot] = useState<string | null>("03:00 PM");
  const [toast, setToast] = useState<{ kind: ToastKind; text: string } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const showToast = (kind: ToastKind, text: string) => {
    if (timer.current) clearTimeout(timer.current);
    setToast({ kind, text });
    timer.current = setTimeout(() => setToast(null), 2600);
  };

  const confirm = () => {
    if (!slot) {
      showToast("warn", "Please pick a time slot first");
      return;
    }
    showToast(
      "success",
      `Booked for ${dates[dateIdx].day} ${dates[dateIdx].date} Sep, ${slot} — Ravi is confirming`
    );
  };

  return (
    <div className="qs-scroll relative flex-1 overflow-y-auto px-4 pb-4">
      {/* app header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <p className="qs-heading text-[16px] font-extrabold uppercase text-[#1A1A1A]">Book a Service</p>
          <p className="text-[10px] text-[#6B7280]">Step 2 of 3 · Choose date & slot</p>
        </div>
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#FDEBDD] text-[#E05A33]">
          <Sparkles className="h-4 w-4" />
        </span>
      </div>

      {/* selected service card */}
      <div className="mt-3 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_4px_12px_rgba(26,26,26,0.04)] ring-1 ring-[#EAEAEA]">
        <span className="qs-gradient-bg grid h-10 w-10 place-items-center rounded-xl text-white">
          <Sparkles className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <p className="text-[12px] font-bold text-[#1A1A1A]">Home Cleaning · 2 BHK</p>
          <p className="text-[10px] text-[#6B7280]">2 cleaners · 3 hours · eco-friendly kit</p>
        </div>
        <span className="text-[11px] font-semibold text-[#E05A33]">Change</span>
      </div>

      {/* date chips */}
      <p className="mt-4 text-[12px] font-bold text-[#1A1A1A]">September 2025</p>
      <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
        {dates.map((d, i) => (
          <button
            key={d.day}
            type="button"
            onClick={() => setDateIdx(i)}
            className={`flex w-[52px] shrink-0 flex-col items-center rounded-2xl py-2 transition-all ${
              i === dateIdx
                ? "qs-gradient-bg text-white shadow-[0_8px_18px_rgba(224,90,51,0.28)]"
                : "bg-white text-[#6B7280] ring-1 ring-[#EAEAEA]"
            }`}
          >
            <span className="text-[9px] font-medium opacity-80">{d.day}</span>
            <span className="qs-heading text-[15px] font-extrabold">{d.date}</span>
          </button>
        ))}
      </div>

      {/* time slot grid */}
      <div className="mt-4 flex items-center gap-1.5">
        <p className="text-[12px] font-bold text-[#1A1A1A]">Pick a slot</p>
        <Clock className="h-3.5 w-3.5 text-[#9CA3AF]" />
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {slots.map((s) => {
          const selected = !s.full && slot === s.time;
          return (
            <button
              key={s.time}
              type="button"
              disabled={s.full}
              onClick={() => setSlot(selected ? null : s.time)}
              className={`rounded-xl py-2.5 text-[10px] font-bold transition-all ${
                s.full
                  ? "bg-[#F9F8F6] text-[#9CA3AF] line-through"
                  : selected
                    ? "border border-[#E05A33] bg-[#FDEBDD] text-[#C94A25] ring-2 ring-[#FDEBDD]"
                    : "bg-white text-[#6B7280] ring-1 ring-[#EAEAEA] active:scale-95"
              }`}
            >
              {s.full ? "Full" : s.time}
            </button>
          );
        })}
      </div>

      {/* address field */}
      <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_4px_12px_rgba(26,26,26,0.04)] ring-1 ring-[#EAEAEA]">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#FDEBDD] text-[#E05A33]">
          <MapPin className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9CA3AF]">
            Service address
          </p>
          <p className="truncate text-[11px] font-medium text-[#1A1A1A]">
            Door 24-6-8, Fort Asramam Rd, Nellore 524001
          </p>
        </div>
        <ChevronRight className="h-4 w-4 text-[#9CA3AF]" />
      </div>

      {/* price summary */}
      <div className="mt-4 rounded-2xl bg-white p-3.5 shadow-[0_4px_12px_rgba(26,26,26,0.04)] ring-1 ring-[#EAEAEA]">
        {priceRows.map((r) => (
          <div key={r.label} className="flex justify-between py-1 text-[11px]">
            <span className="text-[#6B7280]">{r.label}</span>
            <span className="font-semibold text-[#1A1A1A]">{r.value}</span>
          </div>
        ))}
        <div className="my-2 border-t border-dashed border-[#EAEAEA]" />
        <div className="flex justify-between">
          <span className="text-[12px] font-bold text-[#1A1A1A]">Total payable</span>
          <span className="qs-heading text-[14px] font-extrabold text-[#E05A33]">₹399</span>
        </div>
      </div>

      {/* confirm button */}
      <button
        type="button"
        onClick={confirm}
        className="qs-gradient-bg mt-4 w-full rounded-2xl py-3.5 text-[13px] font-bold text-white shadow-[0_12px_26px_rgba(224,90,51,0.3)] transition-transform active:scale-[0.98]"
      >
        Confirm Booking ₹399
      </button>

      {/* in-app snackbar */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="absolute inset-x-3 bottom-3 z-20 flex items-center gap-2.5 rounded-xl border border-[#EAEAEA] bg-white px-3.5 py-3 text-[#1A1A1A] shadow-[0_14px_34px_rgba(26,26,26,0.15)]"
          >
            <span
              className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-white ${
                toast.kind === "success" ? "bg-[#E05A33]" : "bg-[#C94A25]"
              }`}
            >
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            <p className="text-[11px] font-medium leading-snug">{toast.text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
