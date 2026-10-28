import { motion } from "framer-motion";
import {
  Bug,
  Check,
  ChevronRight,
  Clock,
  PhoneCall,
  Refrigerator,
  Sparkles,
  Truck,
  Wrench,
} from "lucide-react";

const steps = [
  { label: "Confirmed", state: "done" },
  { label: "On the way", state: "active" },
  { label: "Done", state: "upcoming" },
] as const;

const pastOrders = [
  {
    title: "Bathroom Deep Clean",
    meta: "18 Sep · Swamy Pro, 4.9 rating",
    amount: "₹549",
    icon: Sparkles,
    tint: "bg-[#FDEBDD] text-[#E05A33]",
  },
  {
    title: "AC Service · 2 units",
    meta: "02 Sep · CoolCare Partners",
    amount: "₹899",
    icon: Refrigerator,
    tint: "bg-[#F9F8F6] text-[#C94A25]",
  },
  {
    title: "Kitchen Pipe Leak",
    meta: "26 Aug · Sunil Plumbing",
    amount: "₹249",
    icon: Wrench,
    tint: "bg-[#FDEBDD] text-[#C94A25]",
  },
  {
    title: "Pest Control · 1 BHK",
    meta: "12 Aug · ShieldPest Nellore",
    amount: "₹449",
    icon: Bug,
    tint: "bg-[#FDEBDD] text-[#E05A33]",
  },
];

export default function OrdersScreen() {
  return (
    <div className="qs-scroll flex-1 overflow-y-auto px-4 pb-4">
      {/* app header */}
      <div className="flex items-center justify-between pt-1">
        <p className="qs-heading text-[16px] font-extrabold uppercase text-[#1A1A1A]">My Orders</p>
        <span className="rounded-full bg-[#FDEBDD] px-2.5 py-1 text-[10px] font-bold text-[#C94A25]">
          1 active
        </span>
      </div>

      {/* live tracker card */}
      <div className="mt-3 rounded-2xl bg-white p-4 shadow-[0_8px_22px_rgba(26,26,26,0.06)] ring-1 ring-[#EAEAEA]">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-bold text-[#1A1A1A]">Order #QS-2291</p>
          <span className="flex items-center gap-1.5 rounded-full bg-[#FDEBDD] px-2 py-1 text-[9px] font-extrabold uppercase tracking-wide text-[#C94A25]">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-[#E05A33]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            Live
          </span>
        </div>
        <p className="mt-0.5 text-[10px] text-[#6B7280]">Home Cleaning · 2 BHK · ₹399</p>

        {/* stepper */}
        <div className="mt-4 flex items-center">
          {steps.map((s, i) => (
            <div key={s.label} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center">
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full text-white ${
                    s.state === "done"
                      ? "qs-gradient-bg"
                      : s.state === "active"
                        ? "bg-[#E05A33] ring-4 ring-[#FDEBDD]"
                        : "bg-[#EAEAEA] text-[#9CA3AF] ring-0"
                  }`}
                >
                  {s.state === "done" ? (
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  ) : s.state === "active" ? (
                    <Truck className="h-3.5 w-3.5" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#9CA3AF]" />
                  )}
                </span>
                <span
                  className={`mt-1.5 whitespace-nowrap text-[9px] font-bold ${
                    s.state === "upcoming" ? "text-[#9CA3AF]" : "text-[#1A1A1A]"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="mx-1.5 -mt-3.5 h-[3px] flex-1 overflow-hidden rounded-full bg-[#EAEAEA]">
                  <div
                    className={`h-full rounded-full ${
                      s.state === "done" ? "qs-gradient-bg w-full" : "w-0"
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* pro + ETA */}
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#F9F8F6] p-2.5">
          <span className="qs-gradient-bg grid h-9 w-9 place-items-center rounded-full text-[11px] font-bold text-white">
            RK
          </span>
          <div className="flex-1">
            <p className="text-[11px] font-bold text-[#1A1A1A]">Ravi Kumar · Cleaning Pro</p>
            <p className="flex items-center gap-1 text-[10px] font-medium text-[#C94A25]">
              <Clock className="h-3 w-3" /> Arriving in 12 mins
            </p>
          </div>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-[#EAEAEA] text-[#E05A33]">
            <PhoneCall className="h-4 w-4" />
          </span>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#F9F8F6]">
          <motion.div
            className="qs-gradient-bg h-full rounded-full"
            initial={{ width: "10%" }}
            animate={{ width: "66%" }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <button
          type="button"
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#FDEBDD] bg-[#FDEBDD]/60 py-2.5 text-[11px] font-bold text-[#C94A25] active:scale-[0.98]"
        >
          Track on map <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* past orders */}
      <p className="mt-4 text-[12px] font-bold text-[#1A1A1A]">Past orders</p>
      <div className="mt-2 space-y-2">
        {pastOrders.map(({ title, meta, amount, icon: Icon, tint }) => (
          <div
            key={title}
            className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_4px_12px_rgba(26,26,26,0.04)] ring-1 ring-[#EAEAEA]"
          >
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${tint}`}>
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-bold text-[#1A1A1A]">{title}</p>
              <p className="truncate text-[10px] text-[#6B7280]">{meta}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-extrabold text-[#1A1A1A]">{amount}</p>
              <p className="text-[9px] font-bold text-[#E05A33]">Rebook</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
