"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

export function QuoteWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    service: "",
    budget: "",
    name: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi FAIRA, I want a quote.%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Business:* ${formData.businessName}%0A*Type:* ${formData.businessType}%0A*Service:* ${formData.service}%0A*Budget:* ${formData.budget}`;
    window.open(`https://wa.me/${SITE.whatsapp}?text=${text}`, "_blank");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md">
      <h2 className="text-2xl font-light uppercase tracking-widest mb-6 text-center">Get a Free Quote</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input required placeholder="Your Name" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg text-white" onChange={(e) => setFormData({...formData, name: e.target.value})} />
        <input required placeholder="Phone Number" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg text-white" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
        <input required placeholder="Business Name" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg text-white" onChange={(e) => setFormData({...formData, businessName: e.target.value})} />
        <input required placeholder="Business Type (e.g. Restaurant)" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg text-white" onChange={(e) => setFormData({...formData, businessType: e.target.value})} />
        <input required placeholder="What do you need? (e.g. Website)" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg text-white" onChange={(e) => setFormData({...formData, service: e.target.value})} />
        <input required placeholder="Budget (e.g. ?1,500)" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg text-white" onChange={(e) => setFormData({...formData, budget: e.target.value})} />
        <button type="submit" className="w-full bg-[#E05A33] text-white font-bold uppercase tracking-widest py-4 rounded-lg mt-6 hover:bg-[#C94A25] transition">Send via WhatsApp</button>
      </form>
    </div>
  );
}
