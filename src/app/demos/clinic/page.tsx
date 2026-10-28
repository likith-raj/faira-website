"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
  Activity,
  AlarmClock,
  Baby,
  Bone,
  Calendar,
  CheckCircle2,
  Stethoscope,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Smile,
  Siren,
  MapPin,
  Phone,
  Flower2,
  Ear,
  Pill,
  Award,
  Wallet,
  Building2,
  Star,
  Menu,
  X,
  Sun,
  Clock,
  ChevronRight,
  FileText,
  BadgeCheck,
} from "lucide-react";
import FairaDemoBadge from "@/components/FairaDemoBadge";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Doctors", href: "#doctors" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    icon: Stethoscope,
    name: "General Medicine",
    desc: "Fever, infections, diabetes & BP management for all ages.",
    fee: "₹300 – ₹500",
  },
  {
    icon: HeartPulse,
    name: "Cardiology",
    desc: "ECG, 2D Echo, TMT and OPD consultation by DM-qualified specialists.",
    fee: "₹600 – ₹1,000",
  },
  {
    icon: Bone,
    name: "Orthopaedics",
    desc: "Joint pain, fractures, spine care and daily-fracture dressings.",
    fee: "₹400 – ₹700",
  },
  {
    icon: Baby,
    name: "Paediatrics",
    desc: "Child check-ups, vaccination (IAP schedule) and newborn care.",
    fee: "₹350 – ₹600",
  },
  {
    icon: Ear,
    name: "ENT",
    desc: "Hearing checks, sinus care, wax removal and minor ENT procedures.",
    fee: "₹300 – ₹550",
  },
  {
    icon: Sparkles,
    name: "Dermatology",
    desc: "Acne, pigmentation, hairfall and allergy skin treatments.",
    fee: "₹400 – ₹800",
  },
  {
    icon: Flower2,
    name: "Gynaecology",
    desc: "Pregnancy care, scans and women's health consultations.",
    fee: "₹400 – ₹800",
  },
  {
    icon: Smile,
    name: "Dental Care",
    desc: "Scaling, root canals, fillings and painless extractions.",
    fee: "₹250 – ₹600",
  },
];

const DOCTORS = [
  {
    name: "Dr. K. Venkata Reddy",
    specialty: "Cardiologist",
    qual: "MBBS, MD (Gen. Med), DM (Cardiology)",
    exp: "18 years experience · Ex-Apollo, Vizag",
    photo:
      "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=640&q=80",
    dept: "Cardiology",
  },
  {
    name: "Dr. S. Lakshmi Prasanna",
    specialty: "Paediatrician",
    qual: "MBBS, MD (Paediatrics)",
    exp: "12 years experience · GIMS Nellore",
    photo:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=640&q=80",
    dept: "Paediatrics",
  },
  {
    name: "Dr. A. Ramesh Kumar",
    specialty: "Orthopaedic Surgeon",
    qual: "MBBS, MS (Orthopaedics)",
    exp: "15 years experience · Joint & trauma care",
    photo:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=640&q=80",
    dept: "Orthopaedics",
  },
  {
    name: "Dr. M. Haritha",
    specialty: "Dermatologist",
    qual: "MBBS, MD (Dermatology, Ven & Leprosy)",
    exp: "9 years experience · Acne & laser clinic",
    photo:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=640&q=80",
    dept: "Dermatology",
  },
];

const WHY_US = [
  {
    icon: Activity,
    title: "Modern Equipment",
    desc: "Digital ECG, 2D Echo, in-house lab and digital X-ray — reports the same day.",
  },
  {
    icon: Award,
    title: "Experienced Doctors",
    desc: "MD / DM / MS-qualified consultants from apex hospitals in Hyderabad & Vizag.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    desc: "Displayed consultation fees, no hidden charges. Cash, UPI and cards accepted.",
  },
  {
    icon: Pill,
    title: "Pharmacy On-site",
    desc: "In-house medical store open with the clinic — generic and branded medicines.",
  },
];

const TIME_SLOTS = [
  "08:30 – 10:00 AM (Morning)",
  "10:00 – 11:30 AM (Morning)",
  "11:30 AM – 01:00 PM (Midday)",
  "05:00 – 06:30 PM (Evening)",
  "06:30 – 08:00 PM (Evening)",
];

const TESTIMONIALS = [
  {
    name: "Sailaja Bharathi",
    area: "Chebbara, Nellore",
    text: "Took my father for his BP check-up on Saturday. Dr. Venkata Reddy explained everything patiently in Telugu and the ECG was done within 10 minutes. Fees were exactly as shown on the board.",
    rating: 5,
    initials: "SB",
  },
  {
    name: "Mohammed Faisal",
    area: "Barapuz Junction",
    text: "Our toddler's vaccination is done here every month. Dr. Lakshmi Prasanna is calm with children and the staff maintains the queue well. Appointment via WhatsApp reminder is very convenient.",
    rating: 5,
    initials: "MF",
  },
  {
    name: "T. Padmavathi",
    area: "Epuri Hills, Nellore",
    text: "Had a dental root canal here last month — completely painless and half the price quoted elsewhere in town. The on-site pharmacy saved my mother a separate trip.",
    rating: 4,
    initials: "TP",
  },
];

const HEALTH_TIPS = [
  {
    title: "5 heart-healthy habits for Nellore's summer",
    excerpt:
      "With March heat setting in, simple changes to salt, hydration and walking time can lower your BP risk — a cardiologist's OPD checklist.",
    read: "4 min read",
    tag: "Cardiology",
    img:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Monsoon care: dengue & fever prevention for kids",
    excerpt:
      "Standing water around Epuri and Surampalem drives seasonal fevers. Our paediatric team's weekly checklist for families with young children.",
    read: "3 min read",
    tag: "Paediatrics",
    img:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Managing diabetes without giving up rice",
    excerpt:
      "Portion science, walking after meals and the right monitoring schedule — how our General Medicine OPD helps you keep HbA1c under 7.",
    read: "6 min read",
    tag: "General Medicine",
    img:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
  },
];

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function ClinicPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    age: "",
    dept: "",
    date: "",
    slot: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setField = (key: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 4500);
  };

  const bookWithDept = (dept: string) => {
    setField("dept", dept);
    scrollToId("appointment");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 3) errs.name = "Please enter the patient's full name.";
    const digits = form.phone.replace(/[\s-]/g, "");
    if (!/^(\+91)?[6-9]\d{9}$/.test(digits))
      errs.phone = "Enter a valid 10-digit Indian mobile number.";
    const age = Number(form.age);
    if (!form.age || Number.isNaN(age) || age < 1 || age > 120)
      errs.age = "Age must be between 1 and 120.";
    if (!form.dept) errs.dept = "Please choose a department.";
    if (!form.date) {
      errs.date = "Please pick an appointment date.";
    } else if (new Date(form.date) < new Date(new Date().toDateString())) {
      errs.date = "Please choose today or a future date.";
    }
    if (!form.slot) errs.slot = "Please select a time slot.";

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    showToast(
      `Appointment requested: ${form.name.trim()}, ${form.dept} on ${new Date(form.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      })} — our front desk will call ${digits.slice(-10)} to confirm.`
    );
    setForm({ name: "", phone: "", age: "", dept: "", date: "", slot: "" });
  };

  const inputCls =
    "w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#6B7280]/60 outline-none transition focus:border-[#E05A33] focus:ring-2 focus:ring-[#E05A33]/20";

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#1A1A1A]">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 border-b border-[#EAEAEA] bg-[#F9F8F6]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <button
            onClick={() => scrollToId("home")}
            className="flex items-center gap-3"
            aria-label="Sunrise Multispeciality Clinic home"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#E05A33] text-white shadow-[0_1px_3px_rgba(26,26,26,0.05)]">
              <Sun className="h-5 w-5" strokeWidth={2.4} />
            </span>
            <span className="text-left leading-tight">
              <span className="clinic-heading block text-[17px] font-semibold text-[#1A1A1A]">
                Sunrise Clinic
              </span>
              <span className="block text-[11px] font-medium tracking-wide text-[#E05A33]">
                Multispeciality · Nellore
              </span>
            </span>
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-[#6B7280] transition hover:text-[#E05A33]"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => scrollToId("appointment")}
              className="rounded-xl bg-[#E05A33] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_1px_3px_rgba(26,26,26,0.05)] transition hover:bg-[#C94A25]"
            >
              Book Appointment
            </button>
          </nav>

          <button
            className="grid h-11 w-11 place-items-center rounded-xl border border-[#EAEAEA] bg-white text-[#1A1A1A] lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-[#EAEAEA] bg-[#F9F8F6] lg:hidden"
            >
              <div className="flex flex-col gap-1 px-5 py-4">
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-[#1A1A1A] hover:bg-[#FDEBDD] hover:text-[#E05A33]"
                  >
                    {l.label}
                    <ChevronRight className="h-4 w-4 text-[#6B7280]" />
                  </a>
                ))}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    scrollToId("appointment");
                  }}
                  className="mt-2 rounded-xl bg-[#E05A33] px-5 py-3 text-sm font-semibold text-white"
                >
                  Book Appointment
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* ================= HERO ================= */}
      <section id="home" className="relative scroll-mt-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 85% 10%, rgba(224,90,51,0.07), transparent), radial-gradient(50% 50% at 5% 80%, rgba(201,74,37,0.05), transparent)",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-24 lg:pt-20">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#E05A33]/25 bg-[#FDEBDD] px-4 py-1.5 text-xs font-semibold text-[#C94A25]">
                <BadgeCheck className="h-4 w-4" /> Now accepting new patients at Aurobindo Junction
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="clinic-heading mt-5 text-[40px] font-semibold leading-[1.08] text-[#1A1A1A] sm:text-[54px]">
                Trusted Healthcare{" "}
                <span className="text-[#E05A33]">
                  for Your Family
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#6B7280]">
                Eight specialties, MD/DM-qualified doctors and honest pricing in the heart of
                Nellore. Walk in for a consultation or book a slot online in under a minute —
                we&apos;ll call you back to confirm.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => scrollToId("appointment")}
                  className="rounded-xl bg-[#E05A33] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(26,26,26,0.08)] transition hover:bg-[#C94A25]"
                >
                  Book Appointment
                </button>
                <a
                  href="tel:+918662467788"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#EAEAEA] bg-white px-6 py-3.5 text-sm font-semibold text-[#1A1A1A] transition hover:border-[#E05A33] hover:text-[#E05A33]"
                >
                  <Phone className="h-4 w-4" /> +91 866 246 7788
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-3">
                {[
                  { icon: ShieldCheck, label: "NABH Standards" },
                  { icon: Siren, label: "24/7 Emergency" },
                  { icon: Award, label: "15+ Years of Care" },
                ].map((b) => (
                  <span
                    key={b.label}
                    className="inline-flex items-center gap-2 rounded-full border border-[#EAEAEA] bg-white px-4 py-2 text-[14px] font-semibold text-[#1A1A1A] shadow-[0_1px_3px_rgba(26,26,26,0.05)]"
                  >
                    <b.icon className="h-4 w-4 text-[#E05A33]" /> {b.label}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="relative">
              <div className="overflow-hidden rounded-[28px] border border-[#EAEAEA] shadow-[0_12px_32px_rgba(26,26,26,0.08)]">
                <Image
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80"
                  alt="Doctor consulting a patient at Sunrise Multispeciality Clinic, Nellore"
                  width={640}
                  height={520}
                  className="h-[420px] w-full object-cover sm:h-[500px]"
                  priority
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -left-4 bottom-8 flex items-center gap-3 rounded-2xl border border-[#EAEAEA] bg-white/95 px-4 py-3 shadow-[0_12px_32px_rgba(26,26,26,0.08)] backdrop-blur sm:-left-8"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#FDEBDD] text-[#E05A33]">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <span className="leading-tight">
                  <span className="clinic-heading block text-[15px] font-semibold text-[#1A1A1A]">
                    40+ patients daily
                  </span>
                  <span className="block text-xs text-[#6B7280]">across 8 specialties</span>
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -right-3 top-8 flex items-center gap-3 rounded-2xl border border-[#EAEAEA] bg-white/95 px-4 py-3 shadow-[0_12px_32px_rgba(26,26,26,0.08)] backdrop-blur"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#FDEBDD] text-[#E05A33]">
                  <Clock className="h-5 w-5" />
                </span>
                <span className="leading-tight">
                  <span className="clinic-heading block text-[15px] font-semibold text-[#1A1A1A]">
                    15-min avg wait
                  </span>
                  <span className="block text-xs text-[#6B7280]">token-based OPD</span>
                </span>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= QUICK INFO STRIP ================= */}
      <section className="mx-auto -mt-2 max-w-7xl px-5 pb-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Siren,
              accent: "text-[#DC2626] bg-[#FDEBDD]",
              title: "Emergency Line",
              main: "+91 866 246 7799",
              sub: "Ambulance · 24×365",
              href: "tel:+918662467799",
            },
            {
              icon: Clock,
              accent: "text-[#E05A33] bg-[#FDEBDD]",
              title: "OPD Timings",
              main: "8:00 AM – 9:00 PM",
              sub: "All days · Evening rounds 6–8 PM",
            },
            {
              icon: MapPin,
              accent: "text-[#E05A33] bg-[#FDEBDD]",
              title: "Location",
              main: "Aurobindo Junction",
              sub: "M.G. Road, Nellore 524001",
            },
            {
              icon: Phone,
              accent: "text-[#E05A33] bg-[#FDEBDD]",
              title: "Reception",
              main: "+91 866 246 7788",
              sub: "WhatsApp: +91 98490 45678",
              href: "tel:+918662467788",
            },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.07}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-[#EAEAEA] bg-white p-5 shadow-[0_1px_3px_rgba(26,26,26,0.05)] transition hover:shadow-[0_12px_32px_rgba(26,26,26,0.08)]">
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${c.accent}`}>
                  <c.icon className="h-5 w-5" />
                </span>
                <div className="leading-tight">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
                    {c.title}
                  </p>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="clinic-heading mt-1 block text-[16px] font-semibold text-[#1A1A1A] hover:text-[#E05A33]"
                    >
                      {c.main}
                    </a>
                  ) : (
                    <p className="clinic-heading mt-1 text-[16px] font-semibold text-[#1A1A1A]">{c.main}</p>
                  )}
                  <p className="mt-1 text-[14px] text-[#6B7280]">{c.sub}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 lg:px-8 lg:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E05A33]">Our Specialities</p>
          <h2 className="clinic-heading mt-2 max-w-2xl text-3xl font-semibold text-[#1A1A1A] sm:text-4xl">
            Complete family care under one roof
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#6B7280]">
            Consultation fees are fixed and displayed at the counter. All prices include the
            doctor&apos;s opinion; tests and medicines are billed separately at cost.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.name} delay={(i % 4) * 0.06}>
              <div className="group flex h-full flex-col rounded-2xl border border-[#EAEAEA] bg-white p-6 shadow-[0_1px_3px_rgba(26,26,26,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#E05A33]/40 hover:shadow-[0_12px_32px_rgba(26,26,26,0.08)]">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#FDEBDD] text-[#E05A33] transition group-hover:bg-[#E05A33] group-hover:text-white">
                  <s.icon className="h-6 w-6" strokeWidth={2} />
                </span>
                <h3 className="clinic-heading mt-4 text-[17px] font-semibold text-[#1A1A1A]">{s.name}</h3>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-[#6B7280]">{s.desc}</p>
                <div className="mt-4 flex items-center justify-between border-t border-[#EAEAEA] pt-4">
                  <span className="text-[13px] text-[#6B7280]">Consultation</span>
                  <span className="clinic-heading text-sm font-semibold text-[#E05A33]">{s.fee}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= DOCTORS ================= */}
      <section id="doctors" className="scroll-mt-24 bg-[#F9F8F6] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E05A33]">Meet The Doctors</p>
            <h2 className="clinic-heading mt-2 text-3xl font-semibold text-[#1A1A1A] sm:text-4xl">
              Consultants you can rely on
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DOCTORS.map((d, i) => (
              <Reveal key={d.name} delay={i * 0.08}>
                <div className="group overflow-hidden rounded-2xl border border-[#EAEAEA] bg-[#FDEBDD] shadow-[0_1px_3px_rgba(26,26,26,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(26,26,26,0.08)]">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={d.photo}
                      alt={`${d.name} — ${d.specialty} at Sunrise Multispeciality Clinic`}
                      fill
                      sizes="(max-width: 640px) 100vw, 320px"
                      className="object-cover object-top transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#C94A25] shadow-[0_1px_3px_rgba(26,26,26,0.05)] backdrop-blur">
                      {d.specialty}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="clinic-heading text-[17px] font-semibold text-[#1A1A1A]">{d.name}</h3>
                    <p className="mt-1 text-[14px] font-medium text-[#E05A33]">{d.qual}</p>
                    <p className="mt-1.5 text-[14px] text-[#6B7280]">{d.exp}</p>
                    <button
                      onClick={() => bookWithDept(d.dept)}
                      className="mt-4 w-full rounded-xl bg-[#E05A33] py-2.5 text-sm font-semibold text-white transition hover:bg-[#C94A25]"
                    >
                      Book with {d.name.split(" ")[1] ? d.name.split(" ")[1] : "Doctor"}
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E05A33]">Why Sunrise</p>
              <h2 className="clinic-heading mt-2 text-3xl font-semibold text-[#1A1A1A] sm:text-4xl">
                Healthcare that respects your time and your money
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#6B7280]">
                Founded in 2009 near Aurobindo Junction, Sunrise has grown from a single general
                medicine OPD into an eight-specialty clinic — without ever losing the personal,
                Telugu-first approach our patients know us for.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {WHY_US.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-[#EAEAEA] bg-white p-6 shadow-[0_1px_3px_rgba(26,26,26,0.05)]">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#FDEBDD] text-[#E05A33]">
                    <w.icon style={{ width: 22, height: 22 }} />
                  </span>
                  <h3 className="clinic-heading mt-4 text-[16px] font-semibold text-[#1A1A1A]">{w.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#6B7280]">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= APPOINTMENT ================= */}
      <section id="appointment" className="scroll-mt-24 bg-[#F9F8F6] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E05A33]">
                Book An Appointment
              </p>
              <h2 className="clinic-heading mt-2 text-3xl font-semibold text-[#1A1A1A] sm:text-4xl">
                Reserve your OPD slot in a minute
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#6B7280]">
                Fill the form and our reception calls you within 2 working hours to confirm your
                token number. No advance payment required.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Form */}
            <Reveal>
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-3xl border border-[#EAEAEA] bg-[#FDEBDD] p-6 shadow-[0_1px_3px_rgba(26,26,26,0.05)] sm:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="pt-name" className="mb-1.5 block text-[14px] font-semibold text-[#1A1A1A]">
                      Patient Name *
                    </label>
                    <input
                      id="pt-name"
                      type="text"
                      placeholder="e.g. B. Srinivasa Rao"
                      value={form.name}
                      onChange={(e) => setField("name", e.target.value)}
                      className={inputCls}
                    />
                    {errors.name && <p className="mt-1.5 text-xs font-medium text-[#DC2626]">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="pt-phone" className="mb-1.5 block text-[14px] font-semibold text-[#1A1A1A]">
                      Mobile Number *
                    </label>
                    <input
                      id="pt-phone"
                      type="tel"
                      placeholder="+91 98490 12345"
                      value={form.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      className={inputCls}
                    />
                    {errors.phone && <p className="mt-1.5 text-xs font-medium text-[#DC2626]">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="pt-age" className="mb-1.5 block text-[14px] font-semibold text-[#1A1A1A]">
                      Age *
                    </label>
                    <input
                      id="pt-age"
                      type="number"
                      min={1}
                      max={120}
                      placeholder="e.g. 42"
                      value={form.age}
                      onChange={(e) => setField("age", e.target.value)}
                      className={inputCls}
                    />
                    {errors.age && <p className="mt-1.5 text-xs font-medium text-[#DC2626]">{errors.age}</p>}
                  </div>
                  <div>
                    <label htmlFor="pt-dept" className="mb-1.5 block text-[14px] font-semibold text-[#1A1A1A]">
                      Department *
                    </label>
                    <select
                      id="pt-dept"
                      value={form.dept}
                      onChange={(e) => setField("dept", e.target.value)}
                      className={`${inputCls} ${form.dept ? "" : "text-[#6B7280]"}`}
                    >
                      <option value="">Select department</option>
                      {SERVICES.map((s) => (
                        <option key={s.name} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                    {errors.dept && <p className="mt-1.5 text-xs font-medium text-[#DC2626]">{errors.dept}</p>}
                  </div>
                  <div>
                    <label htmlFor="pt-date" className="mb-1.5 block text-[14px] font-semibold text-[#1A1A1A]">
                      Appointment Date *
                    </label>
                    <input
                      id="pt-date"
                      type="date"
                      value={form.date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setField("date", e.target.value)}
                      className={inputCls}
                    />
                    {errors.date && <p className="mt-1.5 text-xs font-medium text-[#DC2626]">{errors.date}</p>}
                  </div>
                  <div>
                    <label htmlFor="pt-slot" className="mb-1.5 block text-[14px] font-semibold text-[#1A1A1A]">
                      Time Slot *
                    </label>
                    <select
                      id="pt-slot"
                      value={form.slot}
                      onChange={(e) => setField("slot", e.target.value)}
                      className={`${inputCls} ${form.slot ? "" : "text-[#6B7280]"}`}
                    >
                      <option value="">Select a slot</option>
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    {errors.slot && <p className="mt-1.5 text-xs font-medium text-[#DC2626]">{errors.slot}</p>}
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#E05A33] py-3.5 text-sm font-semibold text-white shadow-[0_1px_3px_rgba(26,26,26,0.05)] transition hover:bg-[#C94A25]"
                >
                  <Calendar className="h-4 w-4" /> Request Appointment
                </button>
                <p className="mt-3 text-center text-[13px] text-[#6B7280]">
                  By submitting you agree to be contacted on the number provided. Your details stay
                  within the clinic.
                </p>
              </form>
            </Reveal>

            {/* Info panel */}
            <Reveal delay={0.12}>
              <div className="flex h-full flex-col gap-6">
                <div className="rounded-3xl bg-[#E05A33] p-6 text-white shadow-[0_12px_32px_rgba(26,26,26,0.08)] sm:p-8">
                  <h3 className="clinic-heading flex items-center gap-2 text-[17px] font-semibold">
                    <AlarmClock className="h-5 w-5" /> Clinic Hours
                  </h3>
                  <ul className="mt-4 space-y-2.5 text-[14px]">
                    <li className="flex justify-between border-b border-white/15 pb-2">
                      <span>Monday – Saturday</span>
                      <span className="font-semibold">8:00 AM – 9:00 PM</span>
                    </li>
                    <li className="flex justify-between border-b border-white/15 pb-2">
                      <span>Sunday</span>
                      <span className="font-semibold">9:00 AM – 1:00 PM</span>
                    </li>
                    <li className="flex justify-between border-b border-white/15 pb-2">
                      <span>Emergency</span>
                      <span className="font-semibold">24 × 365</span>
                    </li>
                    <li className="flex justify-between">
                      <span>In-house lab timings</span>
                      <span className="font-semibold">7:30 AM – 8:00 PM</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-1 rounded-3xl border border-[#EAEAEA] bg-white p-6 shadow-[0_1px_3px_rgba(26,26,26,0.05)] sm:p-8">
                  <h3 className="clinic-heading flex items-center gap-2 text-[17px] font-semibold text-[#1A1A1A]">
                    <FileText className="h-5 w-5 text-[#E05A33]" /> Insurance &amp; Schemes
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#6B7280]">
                    We accept cashless claims and reimbursement documentation for:
                  </p>
                  <ul className="mt-4 space-y-2 text-[14px] font-medium text-[#1A1A1A]">
                    {[
                      "Aarogyasri health card (empanelled procedures)",
                      "Star Health & Allied Insurance",
                      "Niva Bupa (formerly Max Bupa)",
                      "CGHS / ECHS retirees",
                      "Employer corporate health plans",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E05A33]" /> {t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center gap-3 rounded-xl bg-[#FDEBDD] p-4 text-[14px] text-[#1A1A1A]">
                    <Building2 className="h-5 w-5 shrink-0 text-[#E05A33]" />
                    Carry your original health card and previous prescriptions to your slot.
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section id="reviews" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 lg:px-8 lg:py-20">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E05A33]">Patient Reviews</p>
            <h2 className="clinic-heading mt-2 text-3xl font-semibold text-[#1A1A1A] sm:text-4xl">
              Loved by families across Nellore
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[15px] text-[#6B7280]">
              4.8 ★ average from 1,900+ Google reviews by our patients.
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.09}>
              <div className="flex h-full flex-col rounded-2xl border border-[#EAEAEA] bg-white p-6 shadow-[0_1px_3px_rgba(26,26,26,0.05)]">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={`h-4 w-4 ${s < t.rating ? "fill-[#FBBF24] text-[#FBBF24]" : "text-[#EAEAEA]"}`}
                    />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-[14px] leading-relaxed text-[#6B7280]">“{t.text}”</p>
                <div className="mt-5 flex items-center gap-3 border-t border-[#EAEAEA] pt-4">
                  <span className="clinic-heading grid h-10 w-10 place-items-center rounded-full bg-[#E05A33] text-sm font-semibold text-white">
                    {t.initials}
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-semibold text-[#1A1A1A]">{t.name}</span>
                    <span className="block text-xs text-[#6B7280]">{t.area}</span>
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= HEALTH TIPS ================= */}
      <section className="bg-[#F9F8F6] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E05A33]">Health Tips</p>
                <h2 className="clinic-heading mt-2 text-3xl font-semibold text-[#1A1A1A] sm:text-4xl">
                  From our doctors&apos; desk
                </h2>
              </div>
              <p className="max-w-sm text-[14px] text-[#6B7280]">
                Practical, doctor-written advice for Nellore families — seasonal fevers, BP,
                diabetes and child care.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {HEALTH_TIPS.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.09}>
                <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#EAEAEA] bg-[#FDEBDD] shadow-[0_1px_3px_rgba(26,26,26,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(26,26,26,0.08)]">
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={h.img}
                      alt={h.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#C94A25] shadow-[0_1px_3px_rgba(26,26,26,0.05)]">
                      {h.tag}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="clinic-heading text-[16.5px] font-semibold leading-snug text-[#1A1A1A] group-hover:text-[#E05A33]">
                      {h.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[14px] leading-relaxed text-[#6B7280]">{h.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between border-t border-[#EAEAEA] pt-4 text-xs">
                      <span className="flex items-center gap-1.5 font-medium text-[#6B7280]">
                        <Clock className="h-3.5 w-3.5" /> {h.read}
                      </span>
                      <span className="font-semibold text-[#E05A33] transition group-hover:underline">
                        Read article →
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer id="contact" className="scroll-mt-24">
        {/* Emergency band */}
        <div className="bg-[#DC2626]">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 sm:flex-row lg:px-8">
            <p className="clinic-heading flex items-center gap-3 text-[16px] font-semibold text-white">
              <Siren className="h-6 w-6" /> Medical emergency? Our ambulance is one call away.
            </p>
            <a
              href="tel:+918662467799"
              className="rounded-xl bg-white px-6 py-3 text-[15px] font-semibold text-[#DC2626] shadow-[0_1px_3px_rgba(26,26,26,0.05)] transition hover:bg-white/90"
            >
              📞 +91 866 246 7799
            </a>
          </div>
        </div>

        <div className="bg-[#F9F8F6] text-[#6B7280]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#E05A33] text-white">
                  <Sun className="h-5 w-5" />
                </span>
                <span className="clinic-heading text-[16px] font-semibold text-[#1A1A1A]">
                  Sunrise Multispeciality Clinic
                </span>
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-[#6B7280]">
                Caring for Nellore families since 2009. Eight specialties, one honest clinic.
              </p>
              <p className="mt-4 flex items-start gap-2 text-[14px] text-[#6B7280]">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E05A33]" />
                Plot 12-4-45, M.G. Road, Aurobindo Junction, Nellore, A.P. 524001
              </p>
            </div>
            <div>
              <h4 className="clinic-heading text-sm font-semibold uppercase tracking-wider text-[#1A1A1A]">
                Quick Links
              </h4>
              <ul className="mt-4 space-y-2.5 text-[14px]">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="transition hover:text-[#E05A33]">
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => scrollToId("appointment")}
                    className="transition hover:text-[#E05A33]"
                  >
                    Book Appointment
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="clinic-heading text-sm font-semibold uppercase tracking-wider text-[#1A1A1A]">
                Specialities
              </h4>
              <ul className="mt-4 space-y-2.5 text-[14px]">
                {SERVICES.slice(0, 6).map((s) => (
                  <li key={s.name} className="flex items-center gap-2">
                    <s.icon className="h-3.5 w-3.5 text-[#E05A33]" /> {s.name}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="clinic-heading text-sm font-semibold uppercase tracking-wider text-[#1A1A1A]">
                Reach Us
              </h4>
              <ul className="mt-4 space-y-3 text-[14px]">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#E05A33]" />
                  <a href="tel:+918662467788" className="hover:text-[#E05A33]">
                    +91 866 246 7788
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Siren className="h-4 w-4 text-[#DC2626]" />
                  <a href="tel:+918662467799" className="hover:text-[#DC2626]">
                    +91 866 246 7799 (24×7)
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#E05A33]" /> OPD 8:00 AM – 9:00 PM
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#E05A33]" /> NABH-prepared protocols
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#EAEAEA]">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-[14px] text-[#6B7280] sm:flex-row lg:px-8">
              <p>© {new Date().getFullYear()} Sunrise Multispeciality Clinic, Nellore. All rights reserved.</p>
              <p>
                This is a design demo — names, numbers and prices are illustrative and not a real
                clinic.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= TOAST ================= */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed bottom-6 left-1/2 z-[100] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-start gap-3 rounded-2xl border border-[#EAEAEA] bg-white p-4 shadow-[0_12px_32px_rgba(26,26,26,0.08)]"
            role="status"
          >
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#E05A33]" />
            <div className="flex-1">
              <p className="clinic-heading text-sm font-semibold text-[#1A1A1A]">Appointment request sent!</p>
              <p className="mt-1 text-[14px] leading-snug text-[#6B7280]">{toast}</p>
            </div>
            <button
              onClick={() => setToast(null)}
              aria-label="Dismiss notification"
              className="text-[#6B7280] transition hover:text-[#1A1A1A]"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <FairaDemoBadge />
    </div>
  );
}
