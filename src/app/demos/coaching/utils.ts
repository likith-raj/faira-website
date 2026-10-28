export const INR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** Smooth-scrolls to a section id, offsetting for the sticky navbar. */
export function scrollToSection(id: string) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 84;
  window.scrollTo({ top, behavior: "smooth" });
}

/** Indian mobile validation: optional +91 / 0 prefix, then 10 digits starting 6–9. */
export function isValidIndianMobile(raw: string) {
  const digits = raw.replace(/[^\d]/g, "");
  const local = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
  return /^[6-9]\d{9}$/.test(local);
}

export function initialsOf(name: string) {
  const parts = name.replace(/[^A-Za-z.\s]/g, "").split(/[\s.]+/).filter(Boolean);
  if (parts.length === 0) return "BP";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
