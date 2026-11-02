"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bot, X, Send, ArrowLeft, Zap } from "lucide-react";
import { askFairaAi, getFairaAiStatus, type AiTurn } from "@/lib/ai";

export default function ChatbotDemo() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<AiTurn[]>([
    { role: "ai", text: "Hi! I'm FAIRA AI. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [live, setLive] = useState<boolean | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getFairaAiStatus().then((s) => setLive(s.configured));
  }, []);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [messages, busy]);

  const handleSend = async (text: string) => {
    const clean = text.trim();
    if (!clean || busy) return;
    const history: AiTurn[] = [...messages, { role: "user", text: clean }];
    setMessages(history);
    setInput("");
    setBusy(true);
    const result = await askFairaAi(history);
    setBusy(false);
    setMessages([...history, { role: "ai", text: result.reply }]);
  };

  return (
    <div className="relative min-h-screen p-6 md:p-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <Link href="/demos" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#E05A33] hover:underline">
          <ArrowLeft size={16} /> Back to Demos
        </Link>
        <Link
          href="/demos"
          aria-label="This is a FAIRA demo — see more demos"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md"
        >
          <Zap size={13} className="text-[#E05A33]" /> FAIRA Demo
        </Link>
      </div>

      <div className="mx-auto mt-12 max-w-4xl text-center">
        <h1 className="mb-6 text-3xl font-light uppercase tracking-widest md:text-5xl">FAIRA AI Assistant</h1>
        <p className="mb-4 text-xl text-gray-400">Talk to our AI. It knows everything about our services.</p>
        <p className="text-[10px] uppercase tracking-widest text-zinc-500">
          {live === null
            ? "Checking AI brain…"
            : live
              ? "AI brain: Google Gemini (live)"
              : "AI brain not connected — add GEMINI_API_KEY to the server"}
        </p>
      </div>

      <button onClick={() => setIsOpen(true)} className="fixed bottom-8 right-8 z-50 rounded-full bg-[#E05A33] p-4 shadow-lg transition-transform hover:scale-105">
        <Bot size={32} className="text-white" />
      </button>

      {isOpen && (
        <div className="fixed bottom-8 right-8 z-50 flex w-80 flex-col overflow-hidden rounded-2xl border border-white/20 bg-[#111] shadow-2xl md:w-96">
          <div className="flex items-center justify-between bg-[#E05A33] p-4">
            <div className="flex items-center gap-3"><Bot size={24} /><span className="font-bold">FAIRA AI</span></div>
            <button onClick={() => setIsOpen(false)} aria-label="Close chat"><X size={24} /></button>
          </div>
          <div ref={bodyRef} className="flex h-80 flex-1 flex-col gap-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[80%] rounded-lg p-3 text-sm ${m.role === "ai" ? "self-start rounded-bl-none bg-white/10" : "self-end rounded-br-none bg-[#E05A33]"}`}>
                {m.text}
              </div>
            ))}
            {busy && <div className="self-start rounded-lg rounded-bl-none bg-white/10 p-3 text-sm text-zinc-400">Thinking…</div>}
          </div>
          <div className="flex gap-2 border-t border-white/10 p-3">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend(input)} placeholder="Ask about our services..." className="flex-1 rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm focus:border-[#E05A33] focus:outline-none" />
            <button onClick={() => handleSend(input)} className="rounded-lg bg-[#E05A33] p-2"><Send size={18} /></button>
          </div>
          <div className="flex gap-2 overflow-x-auto p-2 text-xs whitespace-nowrap">
            <button onClick={() => handleSend("What do your voice agents do?")} className="rounded-full bg-white/10 px-3 py-1 hover:bg-white/20">Voice Agent</button>
            <button onClick={() => handleSend("How does WhatsApp automation work?")} className="rounded-full bg-white/10 px-3 py-1 hover:bg-white/20">WhatsApp</button>
            <button onClick={() => handleSend("Can you build a website for my restaurant?")} className="rounded-full bg-white/10 px-3 py-1 hover:bg-white/20">Websites</button>
            <button onClick={() => handleSend("Book a demo")} className="rounded-full bg-white/10 px-3 py-1 hover:bg-white/20">Book Demo</button>
          </div>
        </div>
      )}
    </div>
  );
}
