"use client";

import { useState } from "react";
import Link from "next/link";
import { Bot, X, Send, ArrowLeft } from "lucide-react";

export default function ChatbotDemo() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([{ text: "Hi! I'm FAIRA AI. How can I help you today?", isBot: true }]);
  const [input, setInput] = useState("");

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { text, isBot: false }]);
    setInput("");
    setTimeout(() => {
      let reply = "Please contact us at +91 72072 30851 for more details.";
      if (text.toLowerCase().includes("price") || text.toLowerCase().includes("cost")) reply = "Our AI Chat Agent starts at ₹1,500 setup + ₹500/month. AI Voice Agent starts at ₹5,000 setup + ₹1,500/month.";
      if (text.toLowerCase().includes("voice")) reply = "Our AI Voice Agent uses Whisper + Piper TTS to answer calls, book appointments, and support customers 24/7.";
      if (text.toLowerCase().includes("whatsapp") || text.toLowerCase().includes("chat")) reply = "Our AI Chat Agent automates WhatsApp, answers FAQs, and collects leads for your business.";
      if (text.toLowerCase().includes("demo") || text.toLowerCase().includes("book")) reply = "You can get a free consultation at https://faira-website.vercel.app/quote";
      setMessages((prev) => [...prev, { text: reply, isBot: true }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6 md:p-12 relative">
      <Link href="/" className="inline-flex items-center gap-2 text-[#E05A33] hover:underline mb-8 uppercase tracking-widest text-sm font-bold">
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <div className="max-w-4xl mx-auto text-center mt-20">
        <h1 className="text-4xl md:text-6xl font-light uppercase tracking-widest mb-6">FAIRA AI Assistant</h1>
        <p className="text-xl text-gray-400 mb-12">Talk to our AI. It knows everything about our services.</p>
      </div>

      <button onClick={() => setIsOpen(true)} className="fixed bottom-8 right-8 bg-[#E05A33] p-4 rounded-full shadow-lg hover:scale-105 transition-transform z-50">
        <Bot size={32} className="text-white" />
      </button>

      {isOpen && (
        <div className="fixed bottom-8 right-8 w-80 md:w-96 bg-[#111] border border-white/20 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
          <div className="bg-[#E05A33] p-4 flex justify-between items-center">
            <div className="flex items-center gap-3"><Bot size={24} /><span className="font-bold">FAIRA AI</span></div>
            <button onClick={() => setIsOpen(false)}><X size={24} /></button>
          </div>
          <div className="flex-1 p-4 h-80 overflow-y-auto flex flex-col gap-3">
            {messages.map((m, i) => (
              <div key={i} className={`p-3 rounded-lg max-w-[80%] text-sm ${m.isBot ? "bg-white/10 self-start rounded-bl-none" : "bg-[#E05A33] self-end rounded-br-none"}`}>{m.text}</div>
            ))}
          </div>
          <div className="p-3 border-t border-white/10 flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend(input)} placeholder="Ask about our services..." className="flex-1 bg-transparent border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#E05A33]" />
            <button onClick={() => handleSend(input)} className="bg-[#E05A33] p-2 rounded-lg"><Send size={18} /></button>
          </div>
          <div className="p-2 flex gap-2 overflow-x-auto text-xs whitespace-nowrap">
            <button onClick={() => handleSend("What is the price?")} className="bg-white/10 px-3 py-1 rounded-full hover:bg-white/20">Price</button>
            <button onClick={() => handleSend("Tell me about voice agents")} className="bg-white/10 px-3 py-1 rounded-full hover:bg-white/20">Voice Agent</button>
            <button onClick={() => handleSend("How does WhatsApp automation work?")} className="bg-white/10 px-3 py-1 rounded-full hover:bg-white/20">WhatsApp</button>
            <button onClick={() => handleSend("Book a demo")} className="bg-white/10 px-3 py-1 rounded-full hover:bg-white/20">Book Demo</button>
          </div>
        </div>
      )}
    </div>
  );
}