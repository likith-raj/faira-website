"use client";
import { useState } from "react";
import Link from "next/link";
import { Bot, X, Send, ArrowLeft } from "lucide-react";

export default function ChatbotDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hi! Welcome to Nellore SuperMart. How can I help you today?", isBot: true }]);
  const [input, setInput] = useState("");

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { text, isBot: false }]);
    setInput("");
    setTimeout(() => {
      let reply = "Please call us at +91 98765 43210 for more details.";
      if (text.toLowerCase().includes("hour")) reply = "We are open from 8:00 AM to 9:00 PM, Monday to Sunday!";
      if (text.toLowerCase().includes("vegetable")) reply = "Yes! We have fresh tomatoes, potatoes, and spinach arriving daily at 7 AM.";
      if (text.toLowerCase().includes("delivery")) reply = "Please share your phone number and address, and our delivery team will contact you.";
      setMessages((prev) => [...prev, { text: reply, isBot: true }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6 md:p-12 relative">
      <Link href="/demos" className="inline-flex items-center gap-2 text-[#E05A33] hover:underline mb-8 uppercase tracking-widest text-sm font-bold">
        <ArrowLeft size={16} /> Back to Demos
      </Link>

      <div className="max-w-4xl mx-auto text-center mt-20">
        <h1 className="text-4xl md:text-6xl font-light uppercase tracking-widest mb-6">Nellore SuperMart</h1>
        <p className="text-xl text-gray-400 mb-12">Fresh groceries delivered to your door.</p>
        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl"><h3 className="text-xl font-bold mb-2">Opening Hours</h3><p className="text-gray-400">8:00 AM - 9:00 PM</p></div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl"><h3 className="text-xl font-bold mb-2">Contact Us</h3><p className="text-gray-400">+91 98765 43210</p></div>
        </div>
      </div>

      <button onClick={() => setIsOpen(true)} className="fixed bottom-8 right-8 bg-[#E05A33] p-4 rounded-full shadow-lg hover:scale-105 transition-transform z-50">
        <Bot size={32} className="text-white" />
      </button>

      {isOpen && (
        <div className="fixed bottom-8 right-8 w-80 md:w-96 bg-[#111] border border-white/20 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
          <div className="bg-[#E05A33] p-4 flex justify-between items-center">
            <div className="flex items-center gap-3"><Bot size={24} /><span className="font-bold">SuperMart AI</span></div>
            <button onClick={() => setIsOpen(false)}><X size={24} /></button>
          </div>
          <div className="flex-1 p-4 h-80 overflow-y-auto flex flex-col gap-3">
            {messages.map((m, i) => (
              <div key={i} className={`p-3 rounded-lg max-w-[80%] text-sm ${m.isBot ? "bg-white/10 self-start rounded-bl-none" : "bg-[#E05A33] self-end rounded-br-none"}`}>{m.text}</div>
            ))}
          </div>
          <div className="p-3 border-t border-white/10 flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend(input)} placeholder="Type a message..." className="flex-1 bg-transparent border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#E05A33]" />
            <button onClick={() => handleSend(input)} className="bg-[#E05A33] p-2 rounded-lg"><Send size={18} /></button>
          </div>
          <div className="p-2 flex gap-2 overflow-x-auto text-xs whitespace-nowrap">
            <button onClick={() => handleSend("Opening hours?")} className="bg-white/10 px-3 py-1 rounded-full hover:bg-white/20">Hours</button>
            <button onClick={() => handleSend("Fresh vegetables?")} className="bg-white/10 px-3 py-1 rounded-full hover:bg-white/20">Vegetables</button>
            <button onClick={() => handleSend("Home delivery")} className="bg-white/10 px-3 py-1 rounded-full hover:bg-white/20">Delivery</button>
          </div>
        </div>
      )}
    </div>
  );
}
