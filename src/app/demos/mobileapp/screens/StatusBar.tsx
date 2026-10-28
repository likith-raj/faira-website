import { Wifi } from "lucide-react";

function SignalBars() {
  return (
    <span className="flex items-end gap-[2px]" aria-hidden>
      {[3, 5, 7, 9].map((h) => (
        <span
          key={h}
          className="w-[3px] rounded-[1px] bg-[#1A1A1A]"
          style={{ height: `${h}px` }}
        />
      ))}
    </span>
  );
}

function Battery() {
  return (
    <span className="flex items-center gap-[2px]" aria-hidden>
      <span className="relative h-[10px] w-[19px] rounded-[3px] border border-[#1A1A1A]/70 p-[1.5px]">
        <span className="block h-full w-[78%] rounded-[1.5px] bg-[#1A1A1A]" />
      </span>
      <span className="h-[4px] w-[1.5px] rounded-r-sm bg-[#1A1A1A]/70" />
    </span>
  );
}

export default function StatusBar() {
  return (
    <div className="relative z-10 flex h-11 shrink-0 items-center justify-between px-6 pt-1 text-[#1A1A1A]">
      <span className="text-[13px] font-semibold tracking-tight">9:41</span>
      {/* dynamic-island gap in the middle */}
      <span className="h-5 w-16" aria-hidden />
      <span className="flex items-center gap-1.5">
        <SignalBars />
        <Wifi className="h-[13px] w-[13px]" strokeWidth={2.4} />
        <Battery />
      </span>
    </div>
  );
}
