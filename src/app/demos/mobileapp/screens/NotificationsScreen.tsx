import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  ClipboardList,
  Crown,
  MessageSquare,
  Percent,
  Truck,
} from "lucide-react";

type Notif = {
  id: number;
  icon: typeof Truck;
  tint: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
};

const initial: Notif[] = [
  {
    id: 1,
    icon: CheckCircle2,
    tint: "bg-[#FDEBDD] text-[#E05A33]",
    title: "Booking #QS-2291 confirmed",
    body: "Ravi Kumar accepted your 3:00 PM cleaning slot for Thu 24 Sep.",
    time: "9:41 AM",
    unread: true,
  },
  {
    id: 2,
    icon: Truck,
    tint: "bg-[#FDEBDD] text-[#C94A25]",
    title: "Your pro is on the way",
    body: "Ravi crossed Nellore Bypass signal — ETA 12 minutes.",
    time: "9:38 AM",
    unread: true,
  },
  {
    id: 3,
    icon: Percent,
    tint: "bg-[#F9F8F6] text-[#E05A33]",
    title: "20% off ends tonight",
    body: "Monsoon deep-clean offer for Somwar Peta & Fort Asramam.",
    time: "8:15 AM",
    unread: true,
  },
  {
    id: 4,
    icon: ClipboardList,
    tint: "bg-[#FDEBDD] text-[#C94A25]",
    title: "Invoice QS-2178 is ready",
    body: "Pay ₹549 from Payments before 30 Sep to avoid late fees.",
    time: "Mon",
    unread: false,
  },
  {
    id: 5,
    icon: MessageSquare,
    tint: "bg-[#F9F8F6] text-[#6B7280]",
    title: "How was Sunil's plumbing fix?",
    body: "Rate last week's job and help neighbours choose pros.",
    time: "Mon",
    unread: false,
  },
  {
    id: 6,
    icon: Crown,
    tint: "bg-[#FDEBDD] text-[#E05A33]",
    title: "You've reached Gold tier",
    body: "Unlock priority booking, 5% cashback and free re-visits.",
    time: "18 Sep",
    unread: false,
  },
];

export default function NotificationsScreen() {
  const [notifs, setNotifs] = useState(initial);
  const allRead = notifs.every((n) => !n.unread);

  return (
    <div className="qs-scroll flex-1 overflow-y-auto px-4 pb-4">
      {/* app header */}
      <div className="flex items-center justify-between pt-1">
        <p className="qs-heading text-[16px] font-extrabold uppercase text-[#1A1A1A]">Notifications</p>
        <button
          type="button"
          onClick={() => setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })))}
          disabled={allRead}
          className={`text-[10px] font-bold ${
            allRead ? "text-[#9CA3AF]" : "text-[#E05A33] active:text-[#C94A25]"
          }`}
        >
          Mark all read
        </button>
      </div>

      {/* bell summary chip */}
      <div className="mt-3 flex items-center gap-2 rounded-2xl bg-white p-3 shadow-[0_4px_12px_rgba(26,26,26,0.04)] ring-1 ring-[#EAEAEA]">
        <span className="qs-gradient-bg grid h-8 w-8 place-items-center rounded-xl text-[12px] font-extrabold text-white">
          {notifs.filter((n) => n.unread).length || "0"}
        </span>
        <p className="text-[11px] font-medium text-[#6B7280]">
          {allRead
            ? "You're all caught up. Fresh updates land here first."
            : `${notifs.filter((n) => n.unread).length} new updates about your bookings and offers.`}
        </p>
      </div>

      <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">Today</p>
      <div className="mt-2 space-y-2">
        {notifs.slice(0, 3).map((n) => (
          <NotifRow key={n.id} n={n} onTap={() =>
            setNotifs((prev) => prev.map((x) => (x.id === n.id ? { ...x, unread: false } : x)))
          } />
        ))}
      </div>

      <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">Earlier</p>
      <div className="mt-2 space-y-2">
        {notifs.slice(3).map((n) => (
          <NotifRow key={n.id} n={n} onTap={() =>
            setNotifs((prev) => prev.map((x) => (x.id === n.id ? { ...x, unread: false } : x)))
          } />
        ))}
      </div>
    </div>
  );
}

function NotifRow({ n, onTap }: { n: Notif; onTap: () => void }) {
  const { icon: Icon } = n;
  return (
    <button
      type="button"
      onClick={onTap}
      className="flex w-full gap-3 rounded-2xl bg-white p-3 text-left shadow-[0_4px_12px_rgba(26,26,26,0.04)] ring-1 ring-[#EAEAEA] active:scale-[0.99]"
    >
      <span className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-xl ${n.tint}`}>
        <Icon className="h-4 w-4" />
        <AnimatePresence>
          {n.unread && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#E05A33] ring-2 ring-white"
            />
          )}
        </AnimatePresence>
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-2">
          <span className={`truncate text-[11px] ${n.unread ? "font-extrabold" : "font-bold"} text-[#1A1A1A]`}>
            {n.title}
          </span>
          <span className="shrink-0 text-[9px] font-medium text-[#9CA3AF]">{n.time}</span>
        </span>
        <span className="mt-0.5 block text-[10px] leading-snug text-[#6B7280]">{n.body}</span>
      </span>
    </button>
  );
}
