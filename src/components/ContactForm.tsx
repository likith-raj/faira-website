"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";
import { Send } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi FAIRA, I have a message.%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Message:* ${formData.message}`;
    window.open(`https://wa.me/${SITE.whatsapp}?text=${text}`, "_blank");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-lg mx-auto bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 backdrop-blur-xl">
      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-2">Your Name</label>
        <input required placeholder="e.g. Sunny" className="w-full mt-2 bg-black/50 border border-zinc-800 p-4 rounded-xl text-white focus:outline-none focus:border-[#E05A33]" onChange={(e) => setFormData({...formData, name: e.target.value})} />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-2">Phone Number</label>
        <input required placeholder="+91 9876543210" className="w-full mt-2 bg-black/50 border border-zinc-800 p-4 rounded-xl text-white focus:outline-none focus:border-[#E05A33]" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-2">Message</label>
        <textarea required placeholder="How can we help?" rows={4} className="w-full mt-2 bg-black/50 border border-zinc-800 p-4 rounded-xl text-white focus:outline-none focus:border-[#E05A33]" onChange={(e) => setFormData({...formData, message: e.target.value})} />
      </div>
      <button type="submit" className="w-full bg-[#E05A33] text-white font-bold uppercase tracking-widest py-4 rounded-xl mt-4 hover:bg-[#C94A25] transition flex justify-center items-center gap-2">
        <Send size={18} /> Send via WhatsApp
      </button>
    </form>
  );
}