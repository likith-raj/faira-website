"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
} from "framer-motion";
import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  CheckCircle2,
  ChevronDown,
  MapPin,
  Menu,
  Phone,
  Ruler,
  Search,
  Sparkles,
  TrainFront,
  TrendingUp,
  Trees,
  X,
} from "lucide-react";
import FairaDemoBadge from "@/components/FairaDemoBadge";

/* ---------------------------------- data ---------------------------------- */

type PropertyCategory = "plot" | "apartment" | "villa" | "commercial";

interface Property {
  id: string;
  category: PropertyCategory;
  title: string;
  location: string;
  price: string;
  priceLakh: number; // numeric price in ₹ lakh for budget filtering
  beds?: number;
  baths?: number;
  area: string;
  image: string;
  tag?: string;
}

const PROPERTIES: Property[] = [
  {
    id: "p-1",
    category: "plot",
    title: "Gated Community Plot — 2400 SQFT",
    location: "Palla Thotta",
    price: "₹45 Lakh",
    priceLakh: 45,
    area: "2400 sqft · East-facing",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop",
    tag: "BMRDA approved",
  },
  {
    id: "p-2",
    category: "apartment",
    title: "3BHK Luxury Apartment, KRPA Tower",
    location: "Link Road",
    price: "₹98 Lakh",
    priceLakh: 98,
    beds: 3,
    baths: 3,
    area: "1,850 sqft carpet",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
    tag: "Ready to move",
  },
  {
    id: "p-3",
    category: "villa",
    title: "Independent 4BHK Villa with Pool",
    location: "Trunk Road",
    price: "₹2.1 Cr",
    priceLakh: 210,
    beds: 4,
    baths: 5,
    area: "4,600 sqft · 30-cent plot",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop",
    tag: "Signature collection",
  },
  {
    id: "p-4",
    category: "commercial",
    title: "Retail Showroom Space, Ground Floor",
    location: "Darnasi",
    price: "₹1.35 Cr",
    priceLakh: 135,
    area: "1,200 sqft · Main road facing",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    tag: "2.5% annual escalation",
  },
  {
    id: "p-5",
    category: "plot",
    title: "Residential Plot near ONGC Colony",
    location: "ONGC Road",
    price: "₹32 Lakh",
    priceLakh: 32,
    area: "1,600 sqft · Clear title",
    image:
      "https://images.unsplash.com/photo-1441974231531-582326c624b9?q=80&w=1200&auto=format&fit=crop",
    tag: "LDAH approved",
  },
  {
    id: "p-6",
    category: "apartment",
    title: "2BHK Smart Home Apartment",
    location: "Trunk Road",
    price: "₹68 Lakh",
    priceLakh: 68,
    beds: 2,
    baths: 2,
    area: "1,240 sqft super",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c694bb?q=80&w=1200&auto=format&fit=crop",
    tag: "Home loan approved",
  },
];

const CATEGORY_META: Record<
  PropertyCategory,
  { label: string; chip: string; count: number; image: string; blurb: string }
> = {
  plot: {
    label: "Residential Plots",
    chip: "Plots",
    count: 12,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop",
    blurb: "BMRDA / LDAH-approved layouts in Palla Thotta & ONGC Road.",
  },
  apartment: {
    label: "Luxury Apartments",
    chip: "Apartments",
    count: 8,
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
    blurb: "Ready & under-construction towers on Link Road and Trunk Road.",
  },
  villa: {
    label: "Villas",
    chip: "Villas",
    count: 5,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    blurb: "Gated villa plots and independent homes away from city noise.",
  },
  commercial: {
    label: "Commercial Spaces",
    chip: "Commercial",
    count: 6,
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec20829d32b?q=80&w=1200&auto=format&fit=crop",
    blurb: "Showrooms and offices with proven rental yields near Darnasi.",
  },
};

const LOCATIONS = [
  "All Locations",
  "Palla Thotta",
  "Link Road",
  "Trunk Road",
  "Darnasi",
  "ONGC Road",
] as const;

const BUDGETS = [
  { value: "any", label: "Any Budget" },
  { value: "lt50", label: "Under ₹50 Lakh" },
  { value: "50to100", label: "₹50 L – ₹1 Cr" },
  { value: "gt1cr", label: "Above ₹1 Cr" },
] as const;

type BudgetValue = (typeof BUDGETS)[number]["value"];

const NAV_LINKS = [
  { href: "#properties", label: "Properties" },
  { href: "#categories", label: "Categories" },
  { href: "#why-nellore", label: "Why Nellore" },
  { href: "#about", label: "About" },
  { href: "#testimonials", label: "Testimonials" },
] as const;

const HEADING = {
  fontFamily: "'Inter', system-ui, sans-serif",
  letterSpacing: "0.03em",
  textTransform: "uppercase" as const,
};
const SANS = { fontFamily: "'Inter', system-ui, sans-serif" };

/* ------------------------------- small pieces ------------------------------ */

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block text-left" style={SANS}>
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-[#EAEAEA] bg-white px-3.5 py-2.5 pr-9 text-sm text-[#1A1A1A] outline-none transition-colors focus:border-[#E05A33]"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
      </div>
    </label>
  );
}

function Counter({
  to,
  suffix,
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, to, decimals]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function PropertyCard({ property }: { property: Property }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.45 }}
      className="group overflow-hidden rounded-2xl border border-[#EAEAEA] bg-white shadow-[0_1px_3px_rgba(26,26,26,0.05)] transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(26,26,26,0.08)]"
      style={SANS}
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {property.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-[#FDEBDD] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#E05A33]">
            {property.tag}
          </span>
        )}
        <p className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3.5 py-1 text-lg font-semibold text-[#E05A33] shadow-[0_1px_3px_rgba(26,26,26,0.05)]">
          {property.price}
        </p>
        <div className="absolute inset-0 flex items-center justify-center bg-[rgba(255,255,255,0.9)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-[#E05A33] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#C94A25]"
          >
            View details <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-5">
        <h3
          className="text-base font-semibold uppercase leading-snug tracking-[0.03em] text-[#1A1A1A]"
          style={HEADING}
        >
          {property.title}
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-[#6B7280]">
          <MapPin className="h-4 w-4 text-[#E05A33]" /> {property.location},
          Nellore
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#EAEAEA] pt-4 text-xs text-[#6B7280]">
          {property.beds ? (
            <span className="inline-flex items-center gap-1.5">
              <BedDouble className="h-4 w-4 text-[#E05A33]" /> {property.beds}{" "}
              beds
            </span>
          ) : null}
          {property.baths ? (
            <span className="inline-flex items-center gap-1.5">
              <Bath className="h-4 w-4 text-[#E05A33]" /> {property.baths} baths
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1.5">
            <Ruler className="h-4 w-4 text-[#E05A33]" /> {property.area}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mx-auto mb-10 max-w-2xl text-center"
    >
      <p
        className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#E05A33]"
        style={SANS}
      >
        {eyebrow}
      </p>
      <h2
        className="text-2xl font-semibold text-[#1A1A1A] sm:text-3xl"
        style={HEADING}
      >
        {title}
      </h2>
      {sub && (
        <p className="mt-3 text-sm leading-relaxed text-[#6B7280]" style={SANS}>
          {sub}
        </p>
      )}
    </motion.div>
  );
}

/* --------------------------------- the page -------------------------------- */

export default function RealEstateDemoPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // hero search + chip filters (combined)
  const [searchType, setSearchType] = useState<string>("all");
  const [searchLocation, setSearchLocation] = useState<string>(LOCATIONS[0]);
  const [searchBudget, setSearchBudget] = useState<BudgetValue>("any");
  const [chipCategory, setChipCategory] = useState<string>("all");

  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 4200);
  }, []);

  const filtered = useMemo(() => {
    return PROPERTIES.filter((p) => {
      if (searchType !== "all" && p.category !== searchType) return false;
      if (chipCategory !== "all" && p.category !== chipCategory) return false;
      if (
        searchLocation !== "All Locations" &&
        p.location !== searchLocation
      ) {
        return false;
      }
      if (searchBudget === "lt50" && p.priceLakh >= 50) return false;
      if (searchBudget === "50to100" && (p.priceLakh < 50 || p.priceLakh > 100))
        return false;
      if (searchBudget === "gt1cr" && p.priceLakh <= 100) return false;
      return true;
    });
  }, [searchType, chipCategory, searchLocation, searchBudget]);

  const filtersActive =
    searchType !== "all" ||
    chipCategory !== "all" ||
    searchLocation !== LOCATIONS[0] ||
    searchBudget !== "any";

  const resetFilters = () => {
    setSearchType("all");
    setChipCategory("all");
    setSearchLocation(LOCATIONS[0]);
    setSearchBudget("any");
  };

  const runSearch = () => {
    document
      .getElementById("properties")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]" style={SANS}>
      {/* ------------------------------ 1. Navbar ----------------------------- */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-[#EAEAEA] bg-[#F9F8F6]/95 backdrop-blur-md shadow-[0_1px_3px_rgba(26,26,26,0.05)]"
            : "border-b border-transparent bg-white/0"
        }`}
      >
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#E05A33] text-white">
              <Building2 className="h-5 w-5" strokeWidth={2.4} />
            </span>
            <span className="leading-tight">
              <span
                className="block text-base font-semibold uppercase tracking-[0.03em] text-[#1A1A1A]"
                style={HEADING}
              >
                Nellore Homes <span className="text-[#E05A33]">&amp;</span>{" "}
                Lands
              </span>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-[#6B7280]">
                Premium Real Estate
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-[#1A1A1A]/70 transition-colors hover:text-[#E05A33]"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#lead-form"
              className="rounded-full bg-[#E05A33] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_1px_3px_rgba(26,26,26,0.05)] transition-colors hover:bg-[#C94A25]"
            >
              Enquire
            </a>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-lg border border-[#EAEAEA] p-2 text-[#1A1A1A] lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-[#EAEAEA] bg-[#F9F8F6]/98 backdrop-blur-md lg:hidden"
            >
              <div className="flex flex-col gap-1 px-5 py-4">
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#1A1A1A]/80 hover:bg-[#FDEBDD] hover:text-[#E05A33]"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#lead-form"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 rounded-full bg-[#E05A33] px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#C94A25]"
                >
                  Enquire
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ------------------------------- 2. Hero ------------------------------ */}
      <section id="top" className="relative min-h-[92vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury home in Nellore at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.62)_45%,rgba(255,255,255,0.96)_100%)]" />

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-5 pb-16 pt-32 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FDEBDD] bg-[#FDEBDD] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#E05A33]">
              <Sparkles className="h-3.5 w-3.5" /> Nellore · Andhra Pradesh
            </p>
            <h1
              className="text-3xl font-semibold leading-[1.15] text-[#1A1A1A] uppercase sm:text-5xl lg:text-6xl"
              style={HEADING}
            >
              Find Your Dream Home{" "}
              <span className="text-[#E05A33]">in Nellore</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#6B7280] sm:text-lg">
              Handpicked plots, apartments, villas and commercial spaces across
              Palla Thotta, Link Road, Trunk Road, Darnasi and ONGC Road —
              clear titles, registered deeds, zero surprises.
            </p>
          </motion.div>

          {/* search card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            className="mt-10 w-full max-w-4xl rounded-2xl border border-[#EAEAEA] bg-white p-5 shadow-[0_12px_32px_rgba(26,26,26,0.08)] sm:p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
              <SelectField
                label="Property Type"
                value={searchType}
                onChange={setSearchType}
                options={[
                  { value: "all", label: "All Types" },
                  { value: "plot", label: "Plot" },
                  { value: "apartment", label: "Apartment" },
                  { value: "villa", label: "Villa" },
                  { value: "commercial", label: "Commercial" },
                ]}
              />
              <SelectField
                label="Location"
                value={searchLocation}
                onChange={setSearchLocation}
                options={LOCATIONS.map((l) => ({ value: l, label: l }))}
              />
              <SelectField
                label="Budget"
                value={searchBudget}
                onChange={(v) => setSearchBudget(v as BudgetValue)}
                options={BUDGETS.map((b) => ({
                  value: b.value,
                  label: b.label,
                }))}
              />
              <button
                type="button"
                onClick={runSearch}
                className="inline-flex h-[42px] items-center justify-center gap-2 rounded-lg bg-[#E05A33] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#C94A25] lg:self-end"
              >
                <Search className="h-4 w-4" strokeWidth={2.6} /> Search
              </button>
            </div>
            <p className="mt-3 text-xs text-[#6B7280]">
              Showing live results in the featured collection below ·{" "}
              {filtered.length} of {PROPERTIES.length} matching
            </p>
          </motion.div>
        </div>
      </section>

      {/* --------------------------- 3. Featured grid -------------------------- */}
      <section id="properties" className="scroll-mt-24 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Featured Collection"
            title="Curated Properties, Nellore"
            sub="Every listing is title-verified by our legal desk before it reaches this page."
          />

          <div className="mb-8 flex flex-wrap items-center justify-center gap-2.5">
            {[
              { value: "all", label: "All" },
              { value: "plot", label: "Plots" },
              { value: "apartment", label: "Apartments" },
              { value: "villa", label: "Villas" },
              { value: "commercial", label: "Commercial" },
            ].map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setChipCategory(c.value)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  chipCategory === c.value
                    ? "border-[#E05A33] bg-[#E05A33] text-white"
                    : "border-[#EAEAEA] bg-[#FDEBDD]/40 text-[#6B7280] hover:border-[#E05A33]/50 hover:text-[#E05A33]"
                }`}
              >
                {c.label}
              </button>
            ))}
            {filtersActive && (
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-full border border-[#E05A33]/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#E05A33] hover:bg-[#FDEBDD]"
              >
                Clear filters ✕
              </button>
            )}
          </div>

          {filtered.length > 0 ? (
            <motion.div
              layout
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="mx-auto max-w-md rounded-2xl border border-dashed border-[#EAEAEA] bg-[#F9F8F6] p-10 text-center">
              <p className="text-lg font-semibold text-[#1A1A1A]">
                No properties match these filters yet.
              </p>
              <p className="mt-2 text-sm text-[#6B7280]">
                New listings in these localities arrive every week — relax the
                filters or send us a requirement below.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-full bg-[#E05A33] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#C94A25]"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------ 4. Categories ----------------------------- */}
      <section
        id="categories"
        className="scroll-mt-24 border-y border-[#EAEAEA] bg-[#F9F8F6] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Browse by Category"
            title="What Are You Looking For?"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(
              Object.entries(CATEGORY_META) as [
                PropertyCategory,
                (typeof CATEGORY_META)[PropertyCategory],
              ][]
            ).map(([key, meta], i) => (
              <motion.button
                key={key}
                type="button"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => {
                  setChipCategory(key);
                  setSearchType(key);
                  document
                    .getElementById("properties")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative h-72 overflow-hidden rounded-2xl border border-[#EAEAEA] bg-white text-left shadow-[0_1px_3px_rgba(26,26,26,0.05)] transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(26,26,26,0.08)]"
              >
                <Image
                  src={meta.image}
                  alt={meta.label}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.92))]" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E05A33]">
                    {meta.count} active listings
                  </p>
                  <h3
                    className="mt-1 text-lg font-semibold text-[#1A1A1A]"
                    style={HEADING}
                  >
                    {meta.label}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#6B7280]">
                    {meta.blurb}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#E05A33] opacity-0 transition-opacity group-hover:opacity-100">
                    Explore <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ 5. Why Nellore ----------------------------- */}
      <section id="why-nellore" className="scroll-mt-24 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="The Opportunity"
            title="Why Investors Are Choosing Nellore"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: TrainFront,
                to: 8,
                suffix: " min",
                label: "Drive time to the NH-48 entry",
                sub: "Chennai–Vijayawada superhighway access",
              },
              {
                icon: TrendingUp,
                to: 18,
                suffix: "%",
                label: "Avg 5-year price appreciation",
                sub: "Palla Thotta & Link Rd corridors",
              },
              {
                icon: Building2,
                to: 120,
                suffix: " ac",
                label: "IT / SEZ park coming up nearby",
                sub: "30,000+ projected jobs by 2030",
              },
              {
                icon: Trees,
                to: 25,
                suffix: " km",
                label: "From the KRPA airport expansion zone",
                sub: "Greenfield airport, phased rollout",
              },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-[#EAEAEA] bg-white p-6 text-center shadow-[0_1px_3px_rgba(26,26,26,0.05)] transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(26,26,26,0.08)]"
              >
                <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-[#FDEBDD] text-[#E05A33]">
                  <s.icon className="h-6 w-6" />
                </span>
                <p
                  className="text-3xl font-semibold text-[#E05A33] uppercase"
                  style={HEADING}
                >
                  <Counter to={s.to} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm font-semibold text-[#1A1A1A]">
                  {s.label}
                </p>
                <p className="mt-1 text-xs text-[#6B7280]">{s.sub}</p>
              </motion.div>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-[#6B7280]"
          >
            Nellore sits on the GST-corridor between Chennai and Vijayawada with
            the country&apos;s second-largest port at Krishnapatnam a short drive
            away. NH-48 connectivity, a planned IT park and the KRPA airport
            expansion are pulling demand into areas like Palla Thotta, Link Road
            and ONGC Road — while entry prices remain a fraction of
            Chennai&apos;s suburbs. That is the window our clients are buying
            into.
          </motion.p>
        </div>
      </section>

      {/* ------------------------------- 6. About ------------------------------- */}
      <section
        id="about"
        className="scroll-mt-24 border-y border-[#EAEAEA] bg-[#F9F8F6] py-20 sm:py-24"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#E05A33]">
              About the Agency
            </p>
            <h2
              className="text-2xl font-semibold uppercase sm:text-3xl"
              style={HEADING}
            >
              Fourteen Years of Turning Land Records into{" "}
              <span className="text-[#E05A33]">Peace of Mind</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-[#6B7280]">
              Nellore Homes &amp; Lands began in 2012 as a two-person title
              verification desk near Darnasi. Today we are a full-service
              brokerage and developer-partner firm — every plot we sell carries
              a traced parent document, a DTCP or BMRDA approval where
              applicable, and a registration we attend with you.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#6B7280]">
              We deliberately keep our inventory small. If a property does not
              clear our legal checklist, it never reaches your shortlist.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                { k: "RERA Registered", v: "AP agency, note on file" },
                { k: "12+ Years", v: "Serving Nellore since 2012" },
                { k: "400+ Families", v: "Housed across 5 localities" },
              ].map((c) => (
                <div
                  key={c.k}
                  className="rounded-xl border border-[#FDEBDD] bg-[#FDEBDD] px-4 py-3"
                >
                  <p className="text-sm font-semibold text-[#E05A33]">{c.k}</p>
                  <p className="mt-0.5 text-xs text-[#6B7280]">{c.v}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="relative h-[420px] overflow-hidden rounded-2xl border border-[#EAEAEA]">
              <Image
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop"
                alt="Nellore Homes & Lands design studio"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(255,255,255,0.7))]" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-[#EAEAEA] bg-white px-6 py-4 shadow-[0_12px_32px_rgba(26,26,26,0.08)] sm:block">
              <p
                className="text-2xl font-semibold text-[#E05A33] uppercase"
                style={HEADING}
              >
                1,100+
              </p>
              <p className="text-xs uppercase tracking-widest text-[#6B7280]">
                Site visits hosted
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ----------------------------- 7. Testimonials ----------------------------- */}
      <section id="testimonials" className="scroll-mt-24 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Client Stories"
            title="Trusted by Buyers Across Nellore"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                name: "Ramesh Varma Reddy",
                role: "Bought a 24-cent plot · Palla Thotta",
                initials: "RV",
                quote:
                  "They traced thirty years of parent documents before I signed. The registration happened exactly as promised — no broker drama, no hidden charges.",
              },
              {
                name: "Divya & Praveen Kumar",
                role: "3BHK on Link Road",
                initials: "DP",
                quote:
                  "We relocated from Hyderabad and knew nothing of Nellore. The team shortlisted three apartments against our budget and school commute; we moved into the second one.",
              },
              {
                name: "Abdul Kareem",
                role: "Showroom space · Darnasi",
                initials: "AK",
                quote:
                  "Their rental-yield sheet for Darnasi was the most honest analysis I have seen. My showroom has been tenanted at ₹1.85 lakh/month since day one.",
              },
            ].map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col rounded-2xl border border-[#EAEAEA] bg-white p-7 shadow-[0_1px_3px_rgba(26,26,26,0.05)] transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(26,26,26,0.08)]"
              >
                <div className="mb-4 flex gap-1 text-[#E05A33]">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} aria-hidden className="text-sm">
                      ★
                    </span>
                  ))}
                </div>
                <blockquote className="flex-1 text-[15px] leading-relaxed text-[#1A1A1A]">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-[#EAEAEA] pt-5">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(135deg,#E05A33_0%,#C94A25_140%)] text-sm font-bold text-white">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-[#1A1A1A]">
                      {t.name}
                    </span>
                    <span className="block text-xs text-[#6B7280]">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ 8. Lead form ------------------------------ */}
      <section
        id="lead-form"
        className="scroll-mt-24 border-t border-[#EAEAEA] bg-[#F9F8F6] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Tell Us Your Requirement"
            title="Request a Private Consultation"
            sub="Share your details and a senior advisor will call you within one working day. We never share your number with third parties."
          />
          <LeadForm onSuccess={(msg) => showToast(msg)} />
        </div>
      </section>

      {/* -------------------------------- 9. Footer ------------------------------- */}
      <footer className="border-t border-[#EAEAEA] bg-[#F9F8F6] pb-10 pt-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#E05A33] text-white">
                  <Building2 className="h-5 w-5" strokeWidth={2.4} />
                </span>
                <p
                  className="text-base font-semibold uppercase tracking-[0.03em]"
                  style={HEADING}
                >
                  Nellore Homes <span className="text-[#E05A33]">&amp;</span>{" "}
                  Lands
                </p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#6B7280]">
                Plot No. 14, Trunk Road,
                <br />
                Nellore, Andhra Pradesh 524001
              </p>
              <p className="mt-3 flex items-center gap-2 text-sm text-[#1A1A1A]">
                <Phone className="h-4 w-4 text-[#E05A33]" />
                <a
                  href="tel:+919848055214"
                  className="hover:text-[#E05A33]"
                >
                  +91 98480 55214
                </a>
                <span className="text-[#6B7280]">·</span>
                <a
                  href="tel:+918612345678"
                  className="hover:text-[#E05A33]"
                >
                  +91 861 234 5678
                </a>
              </p>
              <p className="mt-2 text-sm text-[#6B7280]">
                hello@nellorehomeslands.in
              </p>
            </div>

            <nav aria-label="Explore">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#E05A33]">
                Explore
              </p>
              <ul className="space-y-2.5 text-sm text-[#6B7280]">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="hover:text-[#E05A33]">
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#lead-form" className="hover:text-[#E05A33]">
                    Enquire
                  </a>
                </li>
              </ul>
            </nav>

            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#E05A33]">
                Localities We Serve
              </p>
              <ul className="space-y-2.5 text-sm text-[#6B7280]">
                {LOCATIONS.slice(1).map((l) => (
                  <li key={l} className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-[#E05A33]" /> {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-[#EAEAEA] pt-6 text-xs text-[#6B7280] sm:flex-row sm:items-center sm:justify-between">
            <p>
              RERA Registered real estate agency · Reg. No.{" "}
              <span className="text-[#1A1A1A]">AP/RERAAG/000/0000</span>{" "}
              (demo placeholder)
            </p>
            <p>© 2026 Nellore Homes &amp; Lands. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* demo badge */}
      <FairaDemoBadge />

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            role="status"
            className="fixed bottom-20 left-1/2 z-[100] flex max-w-[92vw] -translate-x-1/2 items-center gap-3 rounded-xl border border-[#EAEAEA] bg-white px-5 py-3.5 shadow-[0_12px_32px_rgba(26,26,26,0.08)]"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-[#E05A33]" />
            <p className="text-sm text-[#1A1A1A]">{toast}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------- lead form -------------------------------- */

interface LeadErrors {
  name?: string;
  phone?: string;
  email?: string;
  propertyType?: string;
  budget?: string;
}

function LeadForm({ onSuccess }: { onSuccess: (msg: string) => void }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "",
    budget: "",
  });
  const [errors, setErrors] = useState<LeadErrors>({});

  const set = (k: keyof typeof form) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (): boolean => {
    const e: LeadErrors = {};
    if (form.name.trim().length < 3)
      e.name = "Please enter your full name (min. 3 characters).";
    const digits = form.phone.replace(/[\s+-]/g, "").replace(/^91(?=\d{10}$)/, "");
    if (!/^[6-9]\d{9}$/.test(digits))
      e.phone = "Enter a valid 10-digit Indian mobile number.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "That email address doesn't look right.";
    if (!form.propertyType) e.propertyType = "Select a property type.";
    if (!form.budget) e.budget = "Select a budget range.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    onSuccess(
      `Thank you, ${form.name.trim().split(" ")[0]}! A senior advisor will call you on +91 ${form.phone.replace(/[\s+-]/g, "").slice(-10)} within one working day.`,
    );
    setForm({ name: "", phone: "", email: "", propertyType: "", budget: "" });
  };

  const inputCls =
    "w-full rounded-lg border border-[#EAEAEA] bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] placeholder-[#6B7280]/60 outline-none transition-colors focus:border-[#E05A33]";

  return (
    <motion.form
      onSubmit={onSubmit}
      noValidate
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
      className="rounded-2xl border border-[#EAEAEA] bg-white p-6 shadow-[0_1px_3px_rgba(26,26,26,0.05)] sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="lead-name"
            className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]"
          >
            Full Name *
          </label>
          <input
            id="lead-name"
            value={form.name}
            onChange={(e) => set("name")(e.target.value)}
            placeholder="e.g. S. Venkata Reddy"
            className={inputCls}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-[#C94A25]">{errors.name}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="lead-phone"
            className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]"
          >
            Phone (+91) *
          </label>
          <input
            id="lead-phone"
            inputMode="tel"
            value={form.phone}
            onChange={(e) => set("phone")(e.target.value)}
            placeholder="98480 55214"
            className={inputCls}
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs text-[#C94A25]">{errors.phone}</p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="lead-email"
            className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]"
          >
            Email (optional)
          </label>
          <input
            id="lead-email"
            type="email"
            value={form.email}
            onChange={(e) => set("email")(e.target.value)}
            placeholder="you@example.com"
            className={inputCls}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-[#C94A25]">{errors.email}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="lead-type"
            className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]"
          >
            Property Type *
          </label>
          <div className="relative">
            <select
              id="lead-type"
              value={form.propertyType}
              onChange={(e) => set("propertyType")(e.target.value)}
              className={`${inputCls} appearance-none pr-9`}
            >
              <option value="" disabled>
                Choose type…
              </option>
              <option value="plot">Plot / Land</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="commercial">Commercial</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
          </div>
          {errors.propertyType && (
            <p className="mt-1.5 text-xs text-[#C94A25]">{errors.propertyType}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="lead-budget"
            className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]"
          >
            Budget Range *
          </label>
          <div className="relative">
            <select
              id="lead-budget"
              value={form.budget}
              onChange={(e) => set("budget")(e.target.value)}
              className={`${inputCls} appearance-none pr-9`}
            >
              <option value="" disabled>
                Choose budget…
              </option>
              <option value="lt50">Under ₹50 Lakh</option>
              <option value="50to100">₹50 Lakh – ₹1 Cr</option>
              <option value="1to2cr">₹1 Cr – ₹2 Cr</option>
              <option value="gt2cr">Above ₹2 Cr</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
          </div>
          {errors.budget && (
            <p className="mt-1.5 text-xs text-[#C94A25]">{errors.budget}</p>
          )}
        </div>
      </div>

      <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-xs text-[#6B7280]">
          By submitting you agree to be contacted about listings in Nellore.
        </p>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-[#E05A33] px-7 py-3 text-sm font-semibold text-white shadow-[0_1px_3px_rgba(26,26,26,0.05)] transition-colors hover:bg-[#C94A25]"
        >
          Submit Enquiry <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.form>
  );
}
