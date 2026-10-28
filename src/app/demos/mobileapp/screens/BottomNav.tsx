import { Bell, ClipboardList, Home, Plus, User } from "lucide-react";
import type { ScreenId } from "./types";

const items: { id: Exclude<ScreenId, "booking">; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "orders", label: "Orders", icon: ClipboardList },
  { id: "notifications", label: "Alerts", icon: Bell },
  { id: "profile", label: "Profile", icon: User },
];

export default function BottomNav({
  active,
  onNavigate,
}: {
  active: ScreenId;
  onNavigate: (id: ScreenId) => void;
}) {
  const left = items.slice(0, 2);
  const right = items.slice(2);
  const bookingActive = active === "booking";

  return (
    <div className="relative z-10 shrink-0 border-t border-[#EAEAEA] bg-white/95 backdrop-blur">
      <div className="flex items-center justify-around px-2 pb-4 pt-2">
        {left.map(({ id, label, icon: Icon }) => (
          <NavButton
            key={id}
            label={label}
            active={active === id}
            onClick={() => onNavigate(id)}
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={active === id ? 2.4 : 2} />
          </NavButton>
        ))}

        {/* central booking FAB */}
        <button
          type="button"
          onClick={() => onNavigate("booking")}
          aria-label="Open booking screen"
          className={`-mt-7 grid h-12 w-12 place-items-center rounded-full text-white shadow-[0_8px_20px_rgba(224,90,51,0.35)] transition-transform active:scale-90 ${
            bookingActive ? "qs-gradient-bg scale-105 ring-2 ring-[#FDEBDD]" : "qs-gradient-bg"
          }`}
        >
          <Plus className="h-5 w-5" strokeWidth={2.6} />
        </button>

        {right.map(({ id, label, icon: Icon }) => (
          <NavButton
            key={id}
            label={label}
            active={active === id}
            onClick={() => onNavigate(id)}
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={active === id ? 2.4 : 2} />
          </NavButton>
        ))}
      </div>
    </div>
  );
}

function NavButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex w-12 flex-col items-center gap-0.5 rounded-lg py-0.5 transition-colors ${
        active ? "text-[#E05A33]" : "text-[#9CA3AF] hover:text-[#6B7280]"
      }`}
    >
      {children}
      <span className={`text-[9px] font-semibold ${active ? "text-[#E05A33]" : ""}`}>
        {label}
      </span>
      <span
        className={`h-1 w-1 rounded-full transition-opacity ${
          active ? "bg-[#E05A33] opacity-100" : "opacity-0"
        }`}
      />
    </button>
  );
}
