"use client";

export const AUTH_KEY = "faira_admin";

export function isAdmin(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(AUTH_KEY) === "1";
}

export async function tryLogin(password: string): Promise<boolean> {
  const expected = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "faira123";
  if (password === expected) {
    window.sessionStorage.setItem(AUTH_KEY, "1");
    return true;
  }
  // If Supabase is configured, also allow real auth
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const sb = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );
      const { error } = await sb.auth.signInWithPassword({
        email: password.includes("@") ? password : "admin@faira.local",
        password
      });
      if (!error) {
        window.sessionStorage.setItem(AUTH_KEY, "1");
        return true;
      }
    } catch {
      /* ignore */
    }
  }
  return false;
}

export function logout() {
  window.sessionStorage.removeItem(AUTH_KEY);
}
