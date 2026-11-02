"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import FairaDemoBadge from "@/components/FairaDemoBadge";
import { VoiceAgent } from "@/components/VoiceAgent";

const SUGGESTIONS = [
  "What do your AI voice agents do?",
  "How does WhatsApp automation work?",
  "How long does a website take?",
  "Which demo sites can I look at?"
];

export default function VoiceAgentDemo() {
  return (
    <div className="relative flex min-h-screen flex-col items-center p-6 md:p-12">
      <div className="w-full max-w-3xl">
        <Link
          href="/demos"
          className="mb-12 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#E05A33] hover:underline"
        >
          <ArrowLeft size={16} /> Back to Demos
        </Link>

        <div className="mb-10 text-center">
          <h1 className="mb-4 text-3xl font-light uppercase tracking-widest md:text-5xl">FAIRA Voice AI</h1>
          <p className="mx-auto max-w-lg text-zinc-400">
            Your browser transcribes what you say, a real Gemini model writes the answer, and a natural system
            voice reads it back. Nothing here is a scripted recording.
          </p>
        </div>

        <VoiceAgent />

        <div className="mt-8 text-center">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Try asking</p>
          <div className="flex flex-wrap justify-center gap-3">
            {SUGGESTIONS.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-400"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-zinc-500">
          Chrome and Edge work best. The microphone is requested the first time you tap it, and speech is
          transcribed on your device — only the finished text is sent to the AI.
        </p>
      </div>
      <FairaDemoBadge />
    </div>
  );
}
