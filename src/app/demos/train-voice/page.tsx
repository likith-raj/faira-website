"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mic, Square, TrainFront, Volume2 } from "lucide-react";
import FairaDemoBadge from "@/components/FairaDemoBadge";

type Line = { role: "you" | "ai"; text: string; source?: string };

const SAMPLE_LINE =
  "Nova here. I answer customer calls for FAIRA, around the clock.";

function speakLine(text: string, onDone?: () => void) {
  if (typeof window === "undefined" || !window.speechSynthesis || !text) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const best =
    voices.find((v) => /natural|neural|online|premium/i.test(`${v.name} ${v.voiceURI}`) && /^en-IN/i.test(v.lang)) ||
    voices.find((v) => /^en-IN/i.test(v.lang)) ||
    voices.find((v) => /^en/i.test(v.lang));
  if (best) utterance.voice = best;
  utterance.lang = best?.lang || "en-IN";
  utterance.rate = 1;
  utterance.pitch = 1;
  if (onDone) utterance.onstart = onDone;
  utterance.onend = () => onDone?.();
  window.speechSynthesis.speak(utterance);
}

export default function TrainVoiceDemo() {
  const [lines, setLines] = useState<Line[]>([]);
  const [number, setNumber] = useState("");
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const transcriptRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = transcriptRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, busy]);

  const supported = useMemo(
    () =>
      Boolean(
        typeof window !== "undefined" &&
          ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)
      ),
    []
  );

  const ask = useCallback(async (raw: string) => {
    const found = raw.match(/\d{4,6}/);
    setLines((prev) => [...prev, { role: "you", text: raw }]);

    if (!found) {
      const reply = "I could not hear a train number. Say it like: status of train 1 2 7 5 9.";
      setLines((prev) => [...prev, { role: "ai", text: reply, source: "voice" }]);
      setSpeaking(true);
      speakLine(reply, () => setSpeaking(false));
      return;
    }

    setBusy(true);
    setNote(null);
    try {
      const res = await fetch(`/api/train-status?train=${found[0]}`);
      const data = await res.json();
      const reply = String(data?.text ?? "No status came back for that train.");
      setSource(data?.source ?? null);
      if (data?.note) setNote(String(data.note));
      else if (data?.source === "sample")
        setNote("Sample data (not live) — add a valid RAPIDAPI_KEY to .env.local for live railway status.");
      setLines((prev) => [...prev, { role: "ai", text: reply, source: data?.source }]);
      setSpeaking(true);
      speakLine(reply, () => setSpeaking(false));
    } catch {
      const reply = "I could not reach the railway data service. Please try again.";
      setSource("network-error");
      setLines((prev) => [...prev, { role: "ai", text: reply, source: "network-error" }]);
      setSpeaking(true);
      speakLine(reply, () => setSpeaking(false));
    } finally {
      setBusy(false);
    }
  }, []);

  const askRef = useRef(ask);
  askRef.current = ask;

  useEffect(() => {
    if (!supported) return undefined;
    const Ctor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new Ctor();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";
    recognition.onresult = (event: any) => {
      const text = String(event?.results?.[0]?.[0]?.transcript ?? "").trim();
      if (text) askRef.current(text);
    };
    recognition.onerror = (event: any) => {
      setNote(
        event?.error === "not-allowed"
          ? "Microphone access was blocked. Allow it in browser settings, or type the number below."
          : `Voice input stopped (${event?.error ?? "unknown"}). You can type the train number below.`
      );
      setListening(false);
    };
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    return () => {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      recognition.abort?.();
    };
  }, [supported]);

  const toggleMic = async () => {
    setNote(null);
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    window.speechSynthesis?.cancel();
    setSpeaking(false);
    try {
      if (navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((track) => track.stop());
      }
      recognitionRef.current?.start();
      setListening(true);
    } catch {
      setNote("We could not reach your microphone. Type the train number below instead.");
      setListening(false);
    }
  };

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
          <h1 className="mb-4 text-3xl font-light uppercase tracking-widest md:text-5xl">Real Train AI Voice Bot</h1>
          <p className="mx-auto max-w-lg text-zinc-400">
            Ask &ldquo;status of train 12759&rdquo; — the browser transcribes your voice, our server fetches live
            railway data, and the agent reads the answer back. Same pipeline we deploy for clinics and service
            businesses.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#E05A33]">Live data demo</p>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500">
              {source === "rapidapi"
                ? "Source: live railway API"
                : source === "sample"
                  ? "Source: sample data (not live)"
                  : source
                    ? `Source: ${source}`
                    : "Source: not fetched yet"}
            </p>
          </div>

          {!supported && (
            <p className="mt-5 rounded-2xl border border-amber/30 bg-amber/10 px-4 py-3 text-sm text-amber">
              Please use Google Chrome or Edge for voice features. You can also type the train number below.
            </p>
          )}

          <div className="mt-6 flex items-center gap-4">
            <button
              type="button"
              onClick={toggleMic}
              disabled={!supported}
              aria-label={listening ? "Stop listening" : "Start listening"}
              className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40 ${
                listening
                  ? "scale-105 bg-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.55)]"
                  : "bg-[#E05A33] text-white shadow-[0_0_22px_rgba(224,90,51,0.45)] hover:scale-[1.04] hover:bg-[#C94A25]"
              }`}
            >
              {listening ? <Square size={22} fill="currentColor" /> : <Mic size={24} />}
              {listening && <span className="absolute inset-0 animate-ping rounded-full border-2 border-rose-400 opacity-70" />}
            </button>

            <div className="min-h-[44px] flex-1">
              {listening && (
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-400">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-rose-500" /> Listening… say a train number
                </p>
              )}
              {busy && !listening && <p className="text-xs font-bold uppercase tracking-widest text-zinc-300">Fetching live status…</p>}
              {speaking && !listening && !busy && (
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E05A33]">
                  <Volume2 size={14} /> Agent is speaking…
                </p>
              )}
              {!listening && !busy && !speaking && (
                <p className="text-sm text-zinc-400">Tap the mic, or type a number like 12759.</p>
              )}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const found = number.match(/\d{4,6}/);
              if (!found || busy) return;
              ask(`Status of train ${found[0]}`);
              setNumber("");
            }}
            className="mt-6 flex flex-wrap gap-2"
          >
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4">
              <TrainFront size={16} className="shrink-0 text-zinc-400" />
              <input
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                inputMode="numeric"
                placeholder="Train number, e.g. 12759"
                aria-label="Train number"
                className="w-full flex-1 bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-zinc-500"
              />
            </div>
            <button
              type="submit"
              disabled={busy || !/\d{4,6}/.test(number)}
              className="rounded-full bg-[#E05A33] px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-[#C94A25] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Get Live Status
            </button>
            <button
              type="button"
              onClick={() => speakLine(SAMPLE_LINE, () => setSpeaking(false))}
              className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-zinc-200 transition-all hover:border-[#E05A33]/60 hover:text-[#E05A33]"
            >
              Test voice
            </button>
          </form>

          {note && <p className="mt-4 text-xs text-amber">{note}</p>}

          <div
            ref={transcriptRef}
            className="mt-6 max-h-80 space-y-3 overflow-y-auto rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          >
            {lines.length === 0 && (
              <p className="text-center text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                No conversation yet
              </p>
            )}
            {lines.map((line, i) => (
              <div key={i} className={`flex ${line.role === "you" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    line.role === "you" ? "bg-zinc-800 text-zinc-100" : "bg-[#E05A33]/90 text-white"
                  }`}
                >
                  <span className="mr-2 text-[10px] font-bold uppercase tracking-widest opacity-70">
                    {line.role === "you" ? "You:" : line.source === "sample" ? "FAIRA AI (sample):" : "FAIRA AI:"}
                  </span>
                  {line.text}
                </div>
              </div>
            ))}
          </div>

          {lines.length > 0 && (
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  window.speechSynthesis?.cancel();
                  setSpeaking(false);
                  setLines([]);
                  setNote(null);
                  setSource(null);
                }}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-200 transition-all hover:border-[#E05A33]/60 hover:text-[#E05A33]"
              >
                Clear Conversation
              </button>
              <button
                type="button"
                onClick={() => {
                  window.speechSynthesis?.cancel();
                  setSpeaking(false);
                }}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-200 transition-all hover:border-[#E05A33]/60 hover:text-[#E05A33]"
              >
                Stop audio
              </button>
            </div>
          )}
        </div>

        <p className="mt-8 text-center text-xs text-zinc-500">
          Live status needs a RapidAPI key for the &ldquo;Indian Railway IRCTC&rdquo; app (host{" "}
          <code className="text-zinc-400">indian-railway-irctc.p.rapidapi.com</code>) in{" "}
          <code className="text-zinc-400">RAPIDAPI_KEY</code>. Without it the demo clearly says it is showing
          sample data.
        </p>
      </div>
      <FairaDemoBadge />
    </div>
  );
}
