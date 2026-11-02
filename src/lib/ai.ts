export type AiTurn = { role: "user" | "ai"; text: string };
export type AiResult = { ok: boolean; reply: string; engine: string; model?: string; detail?: string };

/**
 * All AI answers come from the server route /api/chat, which talks to Google
 * Gemini. The API key lives in the server environment and is never shipped
 * to the browser.
 */
export async function askFairaAi(messages: AiTurn[]): Promise<AiResult> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ messages }),
      signal: AbortSignal.timeout(30000)
    });
    const data = await res.json();
    const reply = String(data?.reply ?? "").trim();
    return {
      ok: Boolean(data?.ok) && reply.length > 0,
      reply:
        reply.length > 0
          ? reply
          : "I did not get an answer that time. Please ask again, or message the team on WhatsApp at +91 72072 30851.",
      engine: String(data?.engine ?? "unknown"),
      model: data?.model,
      detail: data?.detail
    };
  } catch {
    return {
      ok: false,
      engine: "client-network-error",
      reply:
        "I could not reach my AI service. Please check your connection and try again, or message the team on WhatsApp at +91 72072 30851."
    };
  }
}

export async function getFairaAiStatus(): Promise<{ configured: boolean; model: string | null }> {
  try {
    const res = await fetch("/api/chat");
    if (!res.ok) return { configured: false, model: null };
    const data = await res.json();
    return { configured: Boolean(data?.configured), model: data?.model ?? null };
  } catch {
    return { configured: false, model: null };
  }
}
