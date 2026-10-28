import {
  ArrowRight,
  Bug,
  ChevronRight,
  Percent,
  Plus,
  Refrigerator,
  Search,
  Sparkles,
  Tag,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";

const categories = [
  { name: "Cleaning", icon: Sparkles, tint: "bg-[#FDEBDD] text-[#E05A33]" },
  { name: "Plumbing", icon: Wrench, tint: "bg-[#FDEBDD] text-[#C94A25]" },
  { name: "Electrical", icon: Zap, tint: "bg-[#FDEBDD] text-[#E05A33]" },
  { name: "Appliance", icon: Refrigerator, tint: "bg-[#F9F8F6] text-[#C94A25]" },
  { name: "Pest Control", icon: Bug, tint: "bg-[#FDEBDD] text-[#E05A33]" },
  { name: "More", icon: Plus, tint: "bg-[#F9F8F6] text-[#6B7280]" },
];

const offers = [
  {
    title: "Deep Cleaning Pro",
    meta: "Peoples Colony · 20% off today",
    icon: Percent,
    tint: "bg-[#FDEBDD] text-[#E05A33]",
    badge: "-20%",
  },
  {
    title: "Same-day Plumbing",
    meta: "Chebrole · ₹100 off first visit",
    icon: Tag,
    tint: "bg-[#FDEBDD] text-[#C94A25]",
    badge: "₹100",
  },
  {
    title: "AC Service Combo",
    meta: "Kakarlapada · 2 units @ ₹799",
    icon: Truck,
    tint: "bg-[#F9F8F6] text-[#E05A33]",
    badge: "₹799",
  },
];

export default function HomeScreen() {
  return (
    <div className="qs-scroll flex-1 overflow-y-auto px-4 pb-4">
      {/* app header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <p className="text-[11px] font-medium text-[#6B7280]">Good morning,</p>
          <p className="qs-heading text-[17px] font-extrabold text-[#1A1A1A]">Hi, Priya</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-[#6B7280] shadow-sm ring-1 ring-[#EAEAEA]">
            Nellore
          </span>
          <span className="qs-gradient-bg grid h-9 w-9 place-items-center rounded-full text-[11px] font-bold text-white ring-2 ring-[#FDEBDD]">
            PN
          </span>
        </div>
      </div>

      {/* search bar */}
      <div className="mt-3 flex items-center gap-2 rounded-2xl bg-white px-3.5 py-3 shadow-[0_6px_18px_rgba(26,26,26,0.05)] ring-1 ring-[#EAEAEA]">
        <Search className="h-4 w-4 text-[#E05A33]" />
        <span className="text-[12px] text-[#9CA3AF]">Search cleaning, plumber, AC service…</span>
      </div>

      {/* categories */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-[12px] font-bold text-[#1A1A1A]">Our Services</p>
        <span className="text-[10px] font-semibold text-[#E05A33]">See all</span>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {categories.map(({ name, icon: Icon, tint }) => (
          <div
            key={name}
            className="flex flex-col items-center gap-1.5 rounded-2xl bg-white p-3 shadow-[0_4px_12px_rgba(26,26,26,0.04)] ring-1 ring-[#EAEAEA]"
          >
            <span className={`grid h-9 w-9 place-items-center rounded-xl ${tint}`}>
              <Icon className="h-[18px] w-[18px]" />
            </span>
            <span className="text-[10px] font-semibold text-[#1A1A1A]">{name}</span>
          </div>
        ))}
      </div>

      {/* promo card */}
      <div className="qs-gradient-bg mt-4 rounded-2xl p-4 text-white shadow-[0_12px_28px_rgba(224,90,51,0.25)]">
        <p className="qs-heading text-[15px] font-extrabold uppercase leading-tight">
          Book in 30 seconds
        </p>
        <p className="mt-1 text-[11px] leading-snug text-white/90">
          Pick a service, choose a slot — a verified pro reaches your door the same day.
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-[#E05A33]">
          Book now <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>

      {/* nearby offers */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-[12px] font-bold text-[#1A1A1A]">Nearby offers</p>
        <span className="text-[10px] font-semibold text-[#E05A33]">12 live now</span>
      </div>
      <div className="mt-2 space-y-2">
        {offers.map(({ title, meta, icon: Icon, tint, badge }) => (
          <div
            key={title}
            className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_4px_12px_rgba(26,26,26,0.04)] ring-1 ring-[#EAEAEA]"
          >
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${tint}`}>
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-bold text-[#1A1A1A]">{title}</p>
              <p className="truncate text-[10px] text-[#6B7280]">{meta}</p>
            </div>
            <span className="rounded-lg bg-[#FDEBDD] px-2 py-1 text-[10px] font-extrabold text-[#C94A25]">
              {badge}
            </span>
            <ChevronRight className="h-4 w-4 text-[#9CA3AF]" />
          </div>
        ))}
      </div>
    </div>
  );
}
