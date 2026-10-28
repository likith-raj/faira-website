"use client";
import dynamic from "next/dynamic";

const TempleScene = dynamic(() => import("./TempleScene"), { ssr: false });

export function NightBackdrop() {
  return (
    <div
      className="fixed inset-0 z-[-1] overflow-hidden"
      style={{ animation: "scene-fade-in 1.2s ease-out both" }}
      aria-hidden
    >
      <div className="absolute inset-0">
        <TempleScene />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
    </div>
  );
}
