export type AiTurn = { role: "user" | "ai"; text: string };

export type AiAnswer = {
  ok: boolean;
  reply: string;
  engine: string;
  model?: string;
  detail?: string;
};

const FALLBACK = "I did not get an answer that time. Please ask again, or message us on WhatsApp.";

/**
 * The Gemini key lives in the server environment and is only ever read by /api/chat.
 * Nothing here may contain a key: everything in this file ships to the browser.
 */
export async function askFairaAi(history: AiTurn[]): Promise<AiAnswer> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ messages: history }),
      signal: AbortSignal.timeout(30000)
    });
    const data = await res.json().catch(() => null);
    const reply = String(data?.reply ?? "").trim() || FALLBACK;
    return {
      ok: Boolean(data?.ok) && reply.length > 0,
      reply,
      engine: String(data?.engine ?? "unknown"),
      model: data?.model ? String(data.model) : undefined,
      detail: data?.detail ? String(data.detail) : undefined
    };
  } catch (err: any) {
    const timedOut = err?.name === "TimeoutError";
    return {
      ok: false,
      reply: timedOut
        ? "My AI brain took too long to answer that one. Please ask again."
        : "I could not reach the AI service. Check your connection, or message us on WhatsApp.",
      engine: timedOut ? "timeout" : "network-error",
      detail: String(err?.message ?? err)
    };
  }
}

export async function getFairaAiStatus(): Promise<{ configured: boolean; model: string | null }> {
  try {
    const res = await fetch("/api/chat", { signal: AbortSignal.timeout(15000), cache: "no-store" });
    const data = await res.json().catch(() => null);
    return { configured: Boolean(data?.configured), model: data?.model ? String(data.model) : null };
  } catch {
    return { configured: false, model: null };
  }
}
