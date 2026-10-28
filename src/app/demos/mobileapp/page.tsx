"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Code2,
  CreditCard,
  Crown,
  Globe,
  Headphones,
  MapPin,
  MessageSquare,
  Quote,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import FairaDemoBadge from "@/components/FairaDemoBadge";
import PhoneShowcase from "./PhoneShowcase";

const QUOTE_HREF = "/quote?service=mobileapp";

const features = [
  {
    icon: CalendarCheck,
    title: "Booking apps",
    text: "Slot pickers, live pro tracking and reminders that keep your calendar full.",
  },
  {
    icon: Truck,
    title: "Delivery apps",
    text: "Order status, rider assignment and saved addresses, ready out of the box.",
  },
  {
    icon: Crown,
    title: "Loyalty & rewards",
    text: "Points, tiers and referral loops that turn one-time users into regulars.",
  },
  {
    icon: MessageSquare,
    title: "Customer portals",
    text: "Invoices, chat support and service history in one branded app.",
  },
  {
    icon: ClipboardList,
    title: "Business tools",
    text: "Job sheets, staff rosters and collections dashboards for your team.",
  },
  {
    icon: CreditCard,
    title: "E-commerce apps",
    text: "Catalogues, carts and UPI checkout tuned for Indian customers.",
  },
];

const appTypes = [
  {
    icon: CalendarCheck,
    name: "Booking App",
    sample: "e.g. QuickServe — home services in Nellore",
    text: "Customers pick a service, slot and pay in-app while your pros get jobs pushed to their phones.",
    points: ["Slot & calendar sync", "₹-accurate price summary", "WhatsApp-style job alerts"],
  },
  {
    icon: Send,
    name: "Delivery App",
    sample: "e.g. TiffinBox — tiffin & grocery runs",
    text: "Real-time order tracking, rider assignment and cash or UPI collection at the doorstep.",
    points: ["Live order states", "Rider app included", "COD & UPI reconciliation"],
  },
  {
    icon: BadgePercent,
    name: "Loyalty App",
    sample: "e.g. Rewardo — stamps, tiers, referrals",
    text: "Digital punch cards, birthday offers and referral rewards that lift repeat visits.",
    points: ["Points & tier engine", "Push-offer campaigns", "Referral code tracking"],
  },
  {
    icon: Wrench,
    name: "Business App",
    sample: "e.g. DeskFlow — field staff toolkit",
    text: "Attendance, job checklists and expense capture for teams that work away from a desk.",
    points: ["Offline-first forms", "Photo + signature proof", "Owner dashboard"],
  },
];

const process = [
  {
    icon: Search,
    title: "Discovery",
    text: "Screens, users and business rules mapped with you.",
  },
  {
    icon: Sparkles,
    title: "Design",
    text: "Clickable prototypes you can hold in your hand.",
  },
  {
    icon: Code2,
    title: "Build",
    text: "React Native / Flutter code, weekly demo builds.",
  },
  {
    icon: CheckCircle2,
    title: "Test",
    text: "Real devices, real networks, real Nellore traffic.",
  },
  {
    icon: Rocket,
    title: "Launch",
    text: "App Store + Play Store release and day-2 support.",
  },
];

const testimonials = [
  {
    quote:
      "Our booking app went live on the Play Store in six weeks. Home cleaning jobs in Nellore now come in through the phone instead of three different WhatsApp groups — bookings doubled by month two.",
    name: "Kavya Reddy",
    role: "Owner, Sri Lakshmi Home Services, Nellore",
    initials: "KR",
    tint: "bg-[#E05A33]",
  },
  {
    quote:
      "FAIRA built one codebase for Android and iOS, so our tiffin riders and customers both got a smooth app without paying twice. The referral screen alone brings us 40 new users a month.",
    name: "Imran Qureshi",
    role: "Founder, TiffinBox, Hyderabad",
    initials: "IQ",
    tint: "bg-[#C94A25]",
  },
];

export default function QuickServeDemoPage() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* ambient background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 left-1/4 h-[480px] w-[480px] rounded-full bg-[#FDEBDD] blur-[140px]" />
        <div className="absolute right-0 top-1/3 h-[420px] w-[420px] rounded-full bg-[#F9F8F6] blur-[140px]" />
      </div>

      {/* navbar */}
      <header className="sticky top-0 z-50 border-b border-[#EAEAEA] bg-white/90 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/demos/mobileapp" className="flex items-center gap-2.5">
            <span className="qs-gradient-bg grid h-8 w-8 place-items-center rounded-xl shadow-[0_6px_18px_rgba(224,90,51,0.25)]">
              <Zap className="h-4 w-4 text-white" strokeWidth={2.6} />
            </span>
            <span className="qs-heading text-[17px] font-extrabold tracking-tight text-[#1A1A1A]">
              QuickServe
            </span>
          </Link>
          <div className="hidden items-center gap-7 text-[13px] font-medium text-[#6B7280] md:flex">
            <a href="#features" className="transition-colors hover:text-[#E05A33]">Features</a>
            <a href="#screens" className="transition-colors hover:text-[#E05A33]">Screens</a>
            <a href="#process" className="transition-colors hover:text-[#E05A33]">Process</a>
          </div>
          <Link
            href={QUOTE_HREF}
            className="qs-gradient-bg rounded-full px-4 py-2 text-[12px] font-bold text-white shadow-[0_6px_20px_rgba(224,90,51,0.3)] transition-transform hover:-translate-y-0.5 sm:px-5 sm:text-[13px]"
          >
            Request a Similar App
          </Link>
        </nav>
      </header>

      <main className="relative z-10">
        {/* hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pt-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#EAEAEA] bg-[#FDEBDD] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#C94A25]">
              <Smartphone className="h-3.5 w-3.5" /> Android + iOS · FAIRA demo build
            </span>
            <h1 className="qs-heading mt-5 text-[38px] font-extrabold uppercase leading-[1.08] tracking-tight text-[#1A1A1A] sm:text-[52px]">
              Mobile Apps That{" "}
              <span className="qs-gradient-text">Your Customers Love</span>
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#6B7280]">
              QuickServe is a fictional home-services app — the kind FAIRA ships for real
              businesses. Booking flows, live order tracking, loyalty rewards and push
              notifications, designed and built for both Android and iPhone from one
              codebase.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                href={QUOTE_HREF}
                className="qs-gradient-bg inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-bold text-white shadow-[0_14px_36px_rgba(224,90,51,0.3)] transition-transform hover:-translate-y-0.5"
              >
                Request a Similar App <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-full border border-[#EAEAEA] bg-white px-6 py-3.5 text-[14px] font-bold text-[#1A1A1A] transition-colors hover:border-[#E05A33] hover:text-[#E05A33]"
              >
                View Features
              </a>
            </div>
            <div className="mt-9 flex items-center gap-3.5">
              <div className="flex -space-x-2.5">
                {[
                  ["SR", "bg-[#E05A33]"],
                  ["AM", "bg-[#C94A25]"],
                  ["VD", "bg-[#D14E28]"],
                  ["LK", "bg-[#FDEBDD] text-[#C94A25]"],
                ].map(([t, c]) => (
                  <span
                    key={t}
                    className={`grid h-9 w-9 place-items-center rounded-full border-2 border-white text-[10px] font-extrabold text-white ${c}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div>
                <p className="flex items-center gap-1 text-[12px] font-bold text-[#1A1A1A]">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#E05A33] text-[#E05A33]" />
                  ))}
                  4.9 / 5
                </p>
                <p className="text-[12px] text-[#6B7280]">Trusted by 60+ Indian businesses</p>
              </div>
            </div>
          </div>

          {/* interactive phone */}
          <div id="screens" className="scroll-mt-24">
            <PhoneShowcase />
          </div>
        </section>

        {/* features grid */}
        <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
          <p className="qs-heading text-center text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#E05A33]">
            What we build
          </p>
          <h2 className="qs-heading mt-2 text-center text-[30px] font-extrabold uppercase tracking-tight text-[#1A1A1A] sm:text-[36px]">
            App features, done right
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[14px] leading-relaxed text-[#6B7280]">
            Every QuickServe-style module ships production-ready — tested on real devices
            before it touches your customers.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="group rounded-2xl border border-[#EAEAEA] bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#E05A33] hover:shadow-[0_18px_44px_rgba(224,90,51,0.14)]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#FDEBDD] text-[#E05A33] ring-1 ring-[#FDEBDD] transition-colors group-hover:bg-[#E05A33] group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="qs-heading mt-4 text-[16px] font-extrabold uppercase text-[#1A1A1A]">{title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#6B7280]">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* app types */}
        <section className="bg-[#F9F8F6] py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="qs-heading text-center text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#E05A33]">
              App types
            </p>
            <h2 className="qs-heading mt-2 text-center text-[30px] font-extrabold uppercase tracking-tight text-[#1A1A1A] sm:text-[36px]">
              Pick the app your business needs
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {appTypes.map(({ icon: Icon, name, sample, text, points }) => (
                <div
                  key={name}
                  className="qs-gradient-border rounded-2xl p-6 transition-transform hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <span className="qs-gradient-bg grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white shadow-[0_10px_24px_rgba(224,90,51,0.25)]">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="qs-heading text-[18px] font-extrabold uppercase text-[#1A1A1A]">{name}</h3>
                      <p className="text-[11px] font-semibold text-[#C94A25]">{sample}</p>
                    </div>
                  </div>
                  <p className="mt-3.5 text-[13px] leading-relaxed text-[#6B7280]">{text}</p>
                  <ul className="mt-4 space-y-2">
                    {points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2.5 text-[12px] font-medium text-[#6B7280]">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E05A33]" /> {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* tech trust strip */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-[#EAEAEA] bg-[#F9F8F6] px-6 py-10 text-center sm:px-10">
            <h2 className="qs-heading max-w-2xl text-[22px] font-extrabold uppercase leading-snug text-[#1A1A1A] sm:text-[26px]">
              Built with React Native &amp; Flutter —{" "}
              <span className="qs-gradient-text">one codebase, Android + iOS</span>
            </h2>
            <p className="max-w-xl text-[13px] leading-relaxed text-[#6B7280]">
              You approve one design, we ship it everywhere. Native-feeling performance,
              smaller build cost, and a single place to fix bugs.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#EAEAEA] bg-white px-4 py-2 text-[12px] font-bold text-[#1A1A1A]">
                <Code2 className="h-4 w-4 text-[#E05A33]" /> React Native
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#EAEAEA] bg-white px-4 py-2 text-[12px] font-bold text-[#1A1A1A]">
                <Globe className="h-4 w-4 text-[#E05A33]" /> Flutter
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#EAEAEA] bg-white px-4 py-2 text-[12px] font-bold text-[#1A1A1A]">
                <ShieldCheck className="h-4 w-4 text-[#E05A33]" /> Store-compliant builds
              </span>
            </div>
          </div>
        </section>

        {/* process timeline */}
        <section id="process" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
          <p className="qs-heading text-center text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#E05A33]">
            How we ship
          </p>
          <h2 className="qs-heading mt-2 text-center text-[30px] font-extrabold uppercase tracking-tight text-[#1A1A1A] sm:text-[36px]">
            From idea to App Store in five steps
          </h2>
          <ol className="mt-12 flex flex-col gap-8 md:flex-row md:items-start md:gap-0">
            {process.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="relative flex items-start gap-4 md:flex-1 md:flex-col md:items-center md:gap-0 md:text-center">
                {/* connector: horizontal on md+, vertical on mobile */}
                {i < process.length - 1 && (
                  <>
                    <span className="absolute left-[23px] top-[48px] h-[calc(100%+8px)] w-px bg-[#EAEAEA] md:hidden" aria-hidden />
                    <span className="absolute left-[calc(50%+34px)] right-[calc(-50%+34px)] top-7 hidden h-[2px] bg-[#EAEAEA] md:block" aria-hidden />
                  </>
                )}
                <span className="qs-gradient-bg relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white shadow-[0_10px_24px_rgba(224,90,51,0.3)]">
                  <Icon className="h-5 w-5" />
                  <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full border border-[#EAEAEA] bg-white text-[9px] font-extrabold text-[#6B7280]">
                    {i + 1}
                  </span>
                </span>
                <div className="md:mt-4">
                  <h3 className="qs-heading text-[15px] font-extrabold uppercase text-[#1A1A1A]">{title}</h3>
                  <p className="mt-1 max-w-[190px] text-[12px] leading-relaxed text-[#6B7280] md:mx-auto">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* testimonials */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-5 md:grid-cols-2">
            {testimonials.map(({ quote, name, role, initials, tint }) => (
              <figure
                key={name}
                className="flex flex-col rounded-2xl border border-[#EAEAEA] bg-white p-7"
              >
                <Quote className="h-7 w-7 text-[#E05A33]" />
                <blockquote className="mt-4 flex-1 text-[14px] leading-relaxed text-[#6B7280]">
                  “{quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className={`grid h-11 w-11 place-items-center rounded-full ${tint} text-[12px] font-extrabold text-white`}>
                    {initials}
                  </span>
                  <div>
                    <p className="qs-heading text-[13px] font-extrabold uppercase text-[#1A1A1A]">{name}</p>
                    <p className="flex items-center gap-1 text-[11px] text-[#6B7280]">
                      <MapPin className="h-3 w-3" /> {role}
                    </p>
                  </div>
                  <span className="ml-auto flex items-center gap-1 text-[11px] font-bold text-[#E05A33]">
                    <Star className="h-3.5 w-3.5 fill-[#E05A33]" /> 4.9
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* CTA band */}
        <section className="mx-auto max-w-6xl px-4 pb-20 pt-4 sm:px-6">
          <div className="qs-gradient-bg relative overflow-hidden rounded-3xl px-6 py-12 text-center shadow-[0_24px_70px_rgba(224,90,51,0.3)] sm:px-12 sm:py-16">
            <span aria-hidden className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(60% 90% at 20% 0%, rgba(255,255,255,0.5), transparent)" }} />
            <h2 className="qs-heading relative text-[26px] font-extrabold uppercase leading-tight text-white sm:text-[34px]">
              Have an app idea? We'll ship it in weeks.
            </h2>
            <p className="relative mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-white/90">
              Tell us the job your customers keep doing on WhatsApp — we'll turn it into a
              booking, delivery or loyalty app for Android and iOS.
            </p>
            <div className="relative mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={QUOTE_HREF}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14px] font-bold text-[#E05A33] shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Request a Similar App <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/demos"
                className="inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-white/10"
              >
                <Headphones className="h-4 w-4" /> See more FAIRA demos
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#EAEAEA] bg-[#F9F8F6] py-8">
        <p className="text-center text-[12px] text-[#6B7280]">
          QuickServe is a fictional demo app designed &amp; built by FAIRA — your local
          business, built for the digital world.
        </p>
      </footer>

      <FairaDemoBadge />
    </div>
  );
}
