"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Zap, Lock } from "lucide-react";
import { tryLogin } from "@/lib/admin-auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const ok = await tryLogin(pw);
    setBusy(false);
    if (ok) router.push("/admin");
    else setErr(true);
  }

  return (
    <div className="relative grid min-h-screen place-items-center px-5">
      <div className="glass relative z-10 w-full max-w-sm rounded-2xl p-8 shadow-panel">
        <Link href="/" className="mx-auto flex w-fit items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-gradient text-white shadow-glow">
            <Zap className="h-4 w-4" strokeWidth={2.4} />
          </span>
          <span className="font-display text-xl font-bold text-gradient">FAIRA</span>
        </Link>
        <h1 className="mt-6 text-center font-display text-lg font-bold">Admin Login</h1>
        <p className="mt-1 text-center text-xs text-ink-faint">Enquiry dashboard access</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              type="password"
              className="input pl-10"
              placeholder="Password"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
                setErr(false);
              }}
              autoFocus
            />
          </div>
          {err && <p className="text-sm text-rose">Wrong password. Try again.</p>}
          <button
            type="submit"
            disabled={busy || !pw}
            className="focus-ring w-full rounded-xl bg-brand-gradient py-3 text-sm font-bold text-white shadow-glow transition hover:bg-[#C94A25] disabled:opacity-50"
          >
            {busy ? "Checking…" : "Sign in"}
          </button>
        </form>
        <p className="mt-5 text-center text-xs text-ink-faint">
          Demo mode (no Supabase): password is <code className="font-mono text-accent">faira123</code>
        </p>
      </div>
    </div>
  );
}
