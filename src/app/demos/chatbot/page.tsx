"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Bot, X, Send, ArrowLeft } from "lucide-react";
import { askFairaAi, type AiTurn } from "@/lib/ai";

export default function ChatbotDemo() {
  const [isOpen, setIsOpen] = useState(true);
  const [turns, setTurns] = useState<AiTurn[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const transcriptRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (turns.length === 0) {
      setTurns([{ role: "ai", text: "Hi! I'm FAIRA AI. How can I help you today?" }]);
    }
  }, []);

  useEffect(() => {
    const el = transcriptRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [turns, thinking]);

  const handleSend = async (text: string) => {
    if (!text.trim() || thinking) return;
    setInput("");
    const history = [...turns, { role: "user" as const, text }];
    setTurns(history);
    setThinking(true);
    const result = await askFairaAi(history);
    setThinking(false);
    setTurns([...history, { role: "ai", text: result.reply }]);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6 md:p-12 relative">
      <Link href="/demos" className="inline-flex items-center gap-2 text-[#E05A33] hover:underline mb-8 uppercase tracking-widest text-sm font-bold">
        <ArrowLeft size={16} /> Back to Demos
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
          <div ref={transcriptRef} className="flex-1 p-4 h-80 overflow-y-auto flex flex-col gap-3">
            {turns.map((m, i) => (
              <div key={i} className={`p-3 rounded-lg max-w-[80%] text-sm ${m.role === "ai" ? "bg-white/10 self-start rounded-bl-none" : "bg-[#E05A33] self-end rounded-br-none"}`}>{m.text}</div>
            ))}
            {thinking && (
              <div className="p-3 rounded-lg max-w-[80%] text-sm bg-white/10 self-start rounded-bl-none">
                thinking…
              </div>
            )}
          </div>
          <div className="p-3 border-t border-white/10 flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend(input)} placeholder="Ask about our services..." className="flex-1 bg-transparent border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#E05A33]" />
            <button onClick={() => handleSend(input)} className="bg-[#E05A33] p-2 rounded-lg"><Send size={18} /></button>
          </div>
        </div>
      )}
    </div>
  );
}