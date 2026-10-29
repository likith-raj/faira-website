"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function QuoteWizard() {
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-3xl mx-auto bg-zinc-950/60 border border-zinc-800/80 backdrop-blur-2xl rounded-[2rem] shadow-2xl overflow-hidden"
    >
      <div className="p-8 md:p-12">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl md:text-4xl font-light uppercase tracking-widest text-white">Get a Free Quote</h2>
          <p className="text-zinc-400 text-sm tracking-wide">Fill this out and we&apos;ll message you on WhatsApp instantly.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-300 uppercase tracking-widest text-[10px] font-bold ml-2">Your Name</Label>
              <Input id="name" required placeholder="e.g. Sunny" className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 rounded-2xl px-5 py-6 focus-visible:ring-[#E05A33] transition-all" onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-zinc-300 uppercase tracking-widest text-[10px] font-bold ml-2">Phone Number</Label>
              <Input id="phone" required placeholder="+91 9876543210" className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 rounded-2xl px-5 py-6 focus-visible:ring-[#E05A33] transition-all" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="businessName" className="text-zinc-300 uppercase tracking-widest text-[10px] font-bold ml-2">Business Name</Label>
              <Input id="businessName" required placeholder="e.g. Spice Route" className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 rounded-2xl px-5 py-6 focus-visible:ring-[#E05A33] transition-all" onChange={(e) => setFormData({...formData, businessName: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessType" className="text-zinc-300 uppercase tracking-widest text-[10px] font-bold ml-2">Business Type</Label>
              <Input id="businessType" required placeholder="e.g. Restaurant" className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 rounded-2xl px-5 py-6 focus-visible:ring-[#E05A33] transition-all" onChange={(e) => setFormData({...formData, businessType: e.target.value})} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="service" className="text-zinc-300 uppercase tracking-widest text-[10px] font-bold ml-2">What do you need?</Label>
            <Input id="service" required placeholder="e.g. Website, AI Chatbot, Mobile App" className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 rounded-2xl px-5 py-6 focus-visible:ring-[#E05A33] transition-all" onChange={(e) => setFormData({...formData, service: e.target.value})} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget" className="text-zinc-300 uppercase tracking-widest text-[10px] font-bold ml-2">Budget</Label>
            <Input id="budget" required placeholder="e.g. ?1,500" className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 rounded-2xl px-5 py-6 focus-visible:ring-[#E05A33] transition-all" onChange={(e) => setFormData({...formData, budget: e.target.value})} />
          </div>

          <Button type="submit" className="w-full bg-[#E05A33] hover:bg-[#C94A25] text-white font-bold uppercase tracking-widest py-7 text-sm rounded-full transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(224,90,51,0.3)] mt-8">
            <MessageCircle className="mr-3 h-5 w-5" /> Send via WhatsApp
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
