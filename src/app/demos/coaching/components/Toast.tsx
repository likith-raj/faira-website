"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, X } from "lucide-react";
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

type ToastItem = { id: number; title: string; body?: string; variant: "success" | "info" };

type ToastApi = { push: (title: string, body?: string, variant?: "success" | "info") => void };

const ToastCtx = createContext<ToastApi>({ push: () => {} });

export function useBrightPathToast() {
  return useContext(ToastCtx);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const seq = useRef(0);

  const dismiss = useCallback((id: number) => {
    setItems((list) => list.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (title: string, body?: string, variant: "success" | "info" = "success") => {
      const id = ++seq.current;
      setItems((list) => [...list.slice(-1), { id, title, body, variant }]);
      window.setTimeout(() => dismiss(id), 4600);
    },
    [dismiss]
  );

  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[120] flex flex-col items-center gap-2 px-4">
        <AnimatePresence>
          {items.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 28, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
              className="pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl border border-[#EAEAEA] bg-white p-4 shadow-[0_22px_50px_-20px_rgba(26,26,26,0.35)]"
            >
              <span
                className={
                  t.variant === "success"
                    ? "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#FDEBDD] text-[#E05A33]"
                    : "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#FDEBDD] text-[#C94A25]"
                }
              >
                {t.variant === "success" ? (
                  <CheckCircle2 className="h-5 w-5" strokeWidth={2.2} />
                ) : (
                  <AlertCircle className="h-5 w-5" strokeWidth={2.2} />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="bp-font-display text-sm font-semibold text-[#1A1A1A]">{t.title}</p>
                {t.body && <p className="mt-0.5 text-[14px] leading-relaxed text-[#6B7280]">{t.body}</p>}
              </div>
              <button
                type="button"
                aria-label="Dismiss notification"
                onClick={() => dismiss(t.id)}
                className="mt-0.5 rounded-lg p-1 text-[#6B7280] transition-colors hover:bg-[#F9F8F6] hover:text-[#1A1A1A]"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}
