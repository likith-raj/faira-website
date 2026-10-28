"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { saveEnquiry } from "@/lib/enquiries";
import { isValidEmail, isValidPhone } from "@/lib/utils";
import { GradientButton } from "./ui";
import { useToast } from "./toast";

export default function ContactForm() {
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ business_name: "", contact_name: "", phone: "", email: "", city: "Nellore", message: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.business_name.trim() || !form.contact_name.trim() || !form.message.trim()) {
      toast("Please fill business name, your name and message.");
      return;
    }
    if (!isValidPhone(form.phone) && !isValidEmail(form.email)) {
      toast("Please provide a valid phone (+91) or email so we can reply.");
      return;
    }
    setBusy(true);
    await saveEnquiry({
      ...form,
      business_type: "Other",
      service_needed: ["unsure"],
      budget_range: "Not discussed",
      timeline: "Just exploring",
      source: "contact-page"
    });
    setBusy(false);
    setForm({ business_name: "", contact_name: "", phone: "", email: "", city: "Nellore", message: "" });
    toast("✓ Enquiry sent! We'll contact you within 24 hours.");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <input className="input" placeholder="Business name *" value={form.business_name} onChange={set("business_name")} />
        <input className="input" placeholder="Your name *" value={form.contact_name} onChange={set("contact_name")} />
        <input className="input" placeholder="Phone (+91)" value={form.phone} onChange={set("phone")} inputMode="tel" />
        <input className="input" placeholder="Email" type="email" value={form.email} onChange={set("email")} />
      </div>
      <input className="input" placeholder="City" value={form.city} onChange={set("city")} />
      <textarea className="input min-h-32 resize-y" placeholder="What do you need? (website, booking system, app…)" value={form.message} onChange={set("message")} />
      <GradientButton type="submit" disabled={busy} className="w-full sm:w-auto">
        <Send className="h-4 w-4" /> {busy ? "Sending…" : "Send enquiry"}
      </GradientButton>
    </form>
  );
}
