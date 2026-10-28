"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  ClipboardList,
  Home,
  Smartphone,
  User,
  CalendarCheck,
} from "lucide-react";
import type { ScreenId } from "./screens/types";
import StatusBar from "./screens/StatusBar";
import BottomNav from "./screens/BottomNav";
import HomeScreen from "./screens/HomeScreen";
import BookingScreen from "./screens/BookingScreen";
import OrdersScreen from "./screens/OrdersScreen";
import ProfileScreen from "./screens/ProfileScreen";
import NotificationsScreen from "./screens/NotificationsScreen";

const tabs: { id: ScreenId; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "booking", label: "Booking", icon: CalendarCheck },
  { id: "orders", label: "Orders", icon: ClipboardList },
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Alerts", icon: Bell },
];

function ActiveScreen({ id }: { id: ScreenId }) {
  switch (id) {
    case "home":
      return <HomeScreen />;
    case "booking":
      return <BookingScreen />;
    case "orders":
      return <OrdersScreen />;
    case "profile":
      return <ProfileScreen />;
    case "notifications":
      return <NotificationsScreen />;
  }
}

export default function PhoneShowcase() {
  const [active, setActive] = useState<ScreenId>("home");

  return (
    <div className="flex flex-col items-center">
      {/* tab switcher */}
      <div className="flex max-w-[340px] flex-wrap justify-center gap-1 rounded-2xl border border-[#EAEAEA] bg-[#F9F8F6] p-1.5">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              aria-pressed={isActive}
              className={`relative flex items-center gap-1.5 rounded-xl px-3 py-2 text-[11px] font-bold transition-colors ${
                isActive ? "text-white" : "text-[#6B7280] hover:text-[#1A1A1A]"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="qs-tab-pill"
                  className="qs-gradient-bg absolute inset-0 rounded-xl shadow-[0_6px_18px_rgba(224,90,51,0.35)]"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
              <Icon className="relative z-10 h-3.5 w-3.5" strokeWidth={2.4} />
              <span className="relative z-10">{label}</span>
            </button>
          );
        })}
      </div>

      {/* phone */}
      <div className="relative mt-6">
        {/* ambient glow */}
        <div
          aria-hidden
          className="absolute -inset-16 -z-10 rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(224,90,51,0.18), rgba(253,235,221,0.4), transparent)",
          }}
        />

        <div className="relative w-[300px] rounded-[48px] border border-[#1A1A1A]/20 bg-gradient-to-b from-[#2b2b2b] via-[#1f1f1f] to-[#111111] p-[10px] shadow-[0_40px_90px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.18)]">
          {/* side buttons */}
          <span aria-hidden className="absolute -left-[3px] top-[104px] h-6 w-[3px] rounded-l-full bg-[#3a3a3a]" />
          <span aria-hidden className="absolute -left-[3px] top-[140px] h-10 w-[3px] rounded-l-full bg-[#3a3a3a]" />
          <span aria-hidden className="absolute -left-[3px] top-[196px] h-10 w-[3px] rounded-l-full bg-[#3a3a3a]" />
          <span aria-hidden className="absolute -right-[3px] top-[150px] h-14 w-[3px] rounded-r-full bg-[#3a3a3a]" />

          {/* screen */}
          <div className="relative flex h-[600px] flex-col overflow-hidden rounded-[40px] bg-[#F9F8F6]">
            {/* dynamic island */}
            <span
              aria-hidden
              className="absolute left-1/2 top-2.5 z-20 h-[26px] w-[88px] -translate-x-1/2 rounded-full bg-[#1A1A1A] shadow-[inset_0_1px_2px_rgba(255,255,255,0.12)]"
            >
              <span className="absolute right-2.5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#2b2b2b] ring-1 ring-white/10" />
            </span>

            <StatusBar />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 26 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -26 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex min-h-0 flex-1 flex-col"
              >
                <ActiveScreen id={active} />
              </motion.div>
            </AnimatePresence>

            <BottomNav active={active} onNavigate={setActive} />

            {/* glass reflection */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 z-30 rounded-[40px]"
              style={{
                background:
                  "linear-gradient(128deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 18%, transparent 34%), radial-gradient(120% 60% at 50% -10%, rgba(255,255,255,0.08), transparent 60%)",
              }}
            />
          </div>

          {/* home indicator */}
          <span aria-hidden className="absolute bottom-[16px] left-1/2 z-30 h-1 w-24 -translate-x-1/2 rounded-full bg-[#9CA3AF]" />
        </div>

        {/* floating device label */}
        <div className="absolute -right-4 top-16 hidden rounded-xl border border-[#EAEAEA] bg-white px-3 py-2 shadow-sm md:block">
          <p className="flex items-center gap-1.5 text-[10px] font-bold text-[#1A1A1A]">
            <Smartphone className="h-3.5 w-3.5 text-[#E05A33]" /> QuickServe v2.4
          </p>
          <p className="text-[9px] text-[#6B7280]">Android + iOS · Demo build</p>
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] text-[#6B7280]">
        Tap the tabs — or the in-app bottom bar — to switch screens. Slots, toasts and{" "}
        notifications are interactive.
      </p>
    </div>
  );
}
