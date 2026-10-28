"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type ToastCtx = { toast: (msg: string) => void };
const Ctx = createContext<ToastCtx>({ toast: () => {} });

export function useToast() {
  return useContext(Ctx);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null);

  const toast = useCallback((m: string) => {
    setMsg(m);
    window.setTimeout(() => setMsg(null), 3800);
  }, []);

  return (
    <Ctx.Provider value={{ toast }}>
      {children}
      <AnimatePresence>
        {msg && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2"
          >
            <div className="glass flex items-center gap-3 border-mint/30 px-5 py-3.5 shadow-panel">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-mint" />
              <span className="text-sm">{msg}</span>
              <button aria-label="Dismiss" onClick={() => setMsg(null)} className="focus-ring ml-2 text-ink-faint hover:text-ink">
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
