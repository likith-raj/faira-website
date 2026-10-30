"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;
    const dot = dotRef.current;
    if (!dot) return undefined;

    document.documentElement.classList.add("custom-cursor");

    const move = (event: MouseEvent) => {
      dot.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      const target = event.target as Element | null;
      dot.classList.toggle("cursor-dot--active", Boolean(target?.closest?.(INTERACTIVE)));
    };
    const show = () => { dot.style.opacity = "1"; };
    const hide = () => { dot.style.opacity = "0"; };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseenter", show);
    document.addEventListener("mouseleave", hide);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseenter", show);
      document.removeEventListener("mouseleave", hide);
    };
  }, []);

  return <div ref={dotRef} aria-hidden className="cursor-dot" />;
}
