"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Mic, Square, Trash2, Volume2 } from "lucide-react";
import { askFairaAi, getFairaAiStatus, type AiTurn } from "@/lib/ai";

export function VoiceAgent({ compact = false }: { compact?: boolean }) {
  const [turns, setTurns] = useState<AiTurn[]>([]);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [typing, setTyping] = useState<{ index: number; shown: string } | null>(null);
  const [brain, setBrain] = useState<{ configured: boolean; model: string | null } | null>(null);

  const recognitionRef = useRef<any>(null);
  const turnsRef = useRef<AiTurn[]>(turns);
  turnsRef.current = turns;
  const streamTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transcriptRef = useRef<HTMLDivElement | null>(null);
  /** Bumped by Stop/Clear so an answer that is still in flight can never start speaking. */
  const generationRef = useRef(0);
  const busyRef = useRef(false);

  const supported = useMemo(
    () => Boolean(typeof window !== "undefined" && ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)),
    []
  );

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis || !text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find((v) => v.lang.startsWith("en-IN")) || voices.find((v) => v.lang.startsWith("en"));
    if (preferred) utterance.voice = preferred;
    utterance.pitch = 1.0;
    utterance.rate = 1.0;
    utterance.lang = preferred?.lang || "en-IN";
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, []);

  const stopTyping = useCallback(() => {
    if (streamTimerRef.current !== null) {
      clearInterval(streamTimerRef.current);
      streamTimerRef.current = null;
    }
    setTyping(null);
  }, []);

  const typeOut = useCallback((index: number, text: string) => {
    if (streamTimerRef.current !== null) clearInterval(streamTimerRef.current);
    setTyping({ index, shown: "" });
    let shown = 0;
    streamTimerRef.current = setInterval(() => {
      shown = Math.min(shown + 2, text.length);
      if (shown >= text.length) {
        if (streamTimerRef.current !== null) {
          clearInterval(streamTimerRef.current);
          streamTimerRef.current = null;
        }
        setTyping(null);
        return;
      }
      setTyping({ index, shown: text.slice(0, shown) });
    }, 24);
  }, []);

  useEffect(() => stopTyping, [stopTyping]);

  const answer = useCallback(
    async (userText: string) => {
      if (busyRef.current) return;
      busyRef.current = true;
      const generation = generationRef.current;

      const history = [...turnsRef.current, { role: "user" as const, text: userText }];
      setTurns(history);
      setThinking(true);
      setError(null);
      const result = await askFairaAi(history);
      busyRef.current = false;
      // Stop or Clear was pressed while this answer was in flight — drop it silently.
      if (generation !== generationRef.current) return;
      setThinking(false);
      if (!result.ok) setError(result.detail ?? result.engine);
      const replyIndex = history.length;
      setTurns([...history, { role: "ai", text: result.reply }]);
      speak(result.reply);
      typeOut(replyIndex, result.reply);
    },
    [speak, typeOut]
  );

  const answerRef = useRef(answer);
  answerRef.current = answer;

  useEffect(() => {
    if (!supported) return undefined;
    const Ctor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new Ctor();
    // One utterance per tap. With continuous mode Chrome keeps the session's results
    // list and re-fires index 0, which made the agent answer the same sentence twice.
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";

    recognition.onresult = (event: any) => {
      const results = event?.results;
      if (!results?.length) return;
      let text = "";
      for (let i = Number(event.resultIndex ?? 0); i < results.length; i++) {
        if (results[i]?.isFinal) text += String(results[i][0]?.transcript ?? "");
      }
      text = text.trim();
      if (!text) return;
      // Chrome can re-fire the same final transcript; never ask the brain twice for one sentence.
      const lastAsked = [...turnsRef.current].reverse().find((t) => t.role === "user")?.text;
      if (text === lastAsked) return;
      answerRef.current(text);
    };

    recognition.onerror = (event: any) => {
      const code = event?.error;
      setError(
        code === "not-allowed" || code === "service-not-allowed"
          ? "Microphone access was blocked. Allow it in your browser settings and try again."
          : code === "no-speech"
            ? "I did not hear anything. Tap the mic and speak a little louder."
            : code === "audio-capture"
              ? "No microphone was found. Connect one, or use the text box below."
              : `Voice recognition stopped (${code ?? "unknown"}). You can still type below.`
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
      recognitionRef.current = null;
    };
  }, [supported]);

  useEffect(() => {
    let alive = true;
    getFairaAiStatus().then((status) => {
      if (alive) setBrain(status);
    });
    return () => {
      alive = false;
    };
  }, []);

  const stopSpeaking = () => {
    // Anything still in flight from the previous question must never start speaking.
    generationRef.current += 1;
    window.speechSynthesis?.cancel();
    setSpeaking(false);
    setThinking(false);
    stopTyping();
  };

  const toggleListening = async () => {
    setError(null);
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    stopSpeaking();
    try {
      if (navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((track) => track.stop());
      }
      recognitionRef.current?.start();
      setListening(true);
    } catch {
      setError("We could not reach your microphone. Check the browser permission, or type your question below.");
      setListening(false);
    }
  };

  const sendTyped = (event?: React.FormEvent) => {
    event?.preventDefault();
    const text = typed.trim();
    if (!text || thinking) return;
    setTyped("");
    answer(text);
  };

  useEffect(() => {
    const el = transcriptRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [turns, typing, thinking]);

  return (
    <div className={`w-full rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] ${compact ? "p-5 md:p-6" : "p-6 md:p-10"}`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#E05A33]">Live AI Voice Demo</p>
          <h3 className={`font-light uppercase tracking-widest text-white ${compact ? "text-lg" : "text-2xl"}`}>Talk to FAIRA</h3>
        </div>
      </div>

      <p className="mt-3 text-[10px] uppercase tracking-widest text-zinc-500">
        {brain === null
          ? "AI brain: checking connection…"
          : brain.configured
            ? `AI brain: Google Gemini · ${brain.model ?? "live"} · Voice engine: browser default`
            : "AI brain: not connected (server needs GEMINI_API_KEY) · Voice engine: browser default"}
      </p>

      {!supported && (
        <p className="mt-5 rounded-2xl border border-amber/30 bg-amber/10 px-4 py-3 text-sm text-amber">
          Your browser does not support voice recognition. Please use Google Chrome or Microsoft Edge — or type your question below.
        </p>
      )}

      <div className="mt-5 flex items-center gap-4">
        <button
          type="button"
          onClick={toggleListening}
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
              <span className="h-2 w-2 animate-pulse rounded-full bg-rose-500" /> Listening… Speak now.
            </p>
          )}
          {thinking && !listening && (
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-300">Asking the AI…</p>
          )}
          {speaking && !listening && !thinking && (
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E05A33]">
              <Volume2 size={14} /> FAIRA AI is speaking…
            </p>
          )}
          {!listening && !speaking && !thinking && (
            <p className="text-sm text-zinc-400">
              {turns.length ? "Ask another question." : "Tap the mic and ask something like “what do your AI agents do?”"}
            </p>
          )}
          {error && <p className="mt-1 text-xs text-rose-400">{error}</p>}
        </div>
      </div>

      <form onSubmit={sendTyped} className="mt-4 flex gap-2">
        <input
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          placeholder="Type a question for the AI…"
          className="flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-[#E05A33]/60"
        />
        <button type="submit" disabled={thinking || !typed.trim()} className="rounded-full bg-[#E05A33] px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-[#C94A25] disabled:opacity-40">
          Ask
        </button>
      </form>

      {turns.length > 0 && (
        <div ref={transcriptRef} className={`mt-5 space-y-3 overflow-y-auto rounded-2xl border border-white/10 bg-white/[0.03] p-4 ${compact ? "max-h-56" : "max-h-80"}`}>
          {turns.map((turn, index) => {
            const streaming = typing?.index === index ? typing.shown : null;
            return (
              <div key={index} className={`flex ${turn.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${turn.role === "user" ? "bg-zinc-800 text-zinc-100" : "bg-[#E05A33]/90 text-white"}`}>
                  <span className="mr-2 text-[10px] font-bold uppercase tracking-widest opacity-70">{turn.role === "user" ? "You:" : "FAIRA AI:"}</span>
                  {streaming ?? turn.text}
                  {streaming !== null && <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-white/80 align-middle" />}
                </div>
              </div>
            );
          })}
          {thinking && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-[#E05A33]/20 px-4 py-2.5 text-sm text-zinc-300">
                <span className="mr-2 text-[10px] font-bold uppercase tracking-widest opacity-70">FAIRA AI:</span> thinking…
              </div>
            </div>
          )}
        </div>
      )}

      {turns.length > 0 && (
        <div className="mt-4 flex gap-3">
          <button type="button" onClick={() => { stopSpeaking(); setTurns([]); setError(null); }} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-200 transition-all hover:border-[#E05A33]/60 hover:text-[#E05A33]">
            <Trash2 size={13} /> Clear Conversation
          </button>
          <button type="button" onClick={stopSpeaking} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-200 transition-all hover:border-[#E05A33]/60 hover:text-[#E05A33]">
            <Square size={12} /> Stop
          </button>
        </div>
      )}
    </div>
  );
}