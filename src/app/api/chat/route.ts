import { NextResponse } from "next/server";
import { FAIRA_SYSTEM_PROMPT } from "@/lib/faira-knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BASE = "https://generativelanguage.googleapis.com/v1beta";

type ClientTurn = { role?: string; text?: string };
type Turn = { role: "user" | "model"; text: string };

let candidateModels: string[] | null = null;

function apiKey(): string {
  return (process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY ?? "").trim();
}

function trimTurns(body: ClientTurn[]): Turn[] {
  return body
    .filter((t) => typeof t?.text === "string" && t.text.trim().length > 0)
    .slice(-10)
    .map((t) => ({
      role: t.role === "ai" || t.role === "model" ? "model" : "user",
      text: String(t.text).trim().slice(0, 1200)
    }));
}

/**
 * The model list is fetched at runtime because Google renames and retires Gemini
 * models constantly and blocks old ones for new keys; a hardcoded name rots.
 * GEMINI_MODEL pins one model instead.
 */
async function modelCandidates(key: string): Promise<string[]> {
  const configured = (process.env.GEMINI_MODEL ?? "").trim();
  if (configured) return [configured];
  if (candidateModels) return candidateModels;

  try {
    const res = await fetch(`${BASE}/models?pageSize=200`, {
      headers: { "x-goog-api-key": key },
      signal: AbortSignal.timeout(10000)
    });
    if (!res.ok) return [];
    const data: any = await res.json();
    const names: string[] = (data?.models ?? [])
      .filter((m: any) => m?.supportedGenerationMethods?.includes("generateContent"))
      .map((m: any) => String(m.name ?? "").replace(/^models\//, ""))
      .filter(
        (name: string) =>
          /^gemini-/.test(name) &&
          !/-tts|-image|-transcribe|-live|-audio|-embedding|-vision|-computer-use|-robotics|-customtools|nano-banana|omni/i.test(
            name
          )
      );

    const version = (name: string) => {
      const m = name.match(/gemini-(\d+)\.(\d+)/);
      return m ? Number(m[1]) * 100 + Number(m[2]) : 0;
    };
    // Newest plain flash wins: fast + cheap is what a phone voice agent needs. -lite comes after it.
    const family = (name: string) => (name.includes("flash") ? 0 : name.includes("pro") ? 2 : 1);
    const lite = (name: string) => (name.includes("lite") ? 1 : 0);
    names.sort(
      (a, b) => family(a) - family(b) || lite(a) - lite(b) || version(b) - version(a) || b.localeCompare(a)
    );

    candidateModels = names;
    return names;
  } catch {
    return [];
  }
}

function textOf(data: any): string {
  const parts = data?.candidates?.[0]?.content?.parts ?? [];
  return parts.map((p: any) => p?.text ?? "").join("").trim();
}

export async function GET() {
  const key = apiKey();
  const model = key ? ((await modelCandidates(key))[0] ?? null) : null;
  return NextResponse.json({
    service: "faira-ai",
    brain: "google-gemini",
    configured: Boolean(key),
    model,
    modelsDiscovered: Boolean(model)
  });
}

export async function POST(req: Request) {
  let turns: Turn[] = [];
  try {
    const body = await req.json();
    turns = trimTurns(Array.isArray(body?.messages) ? body.messages : []);
  } catch {
    return NextResponse.json({ ok: false, engine: "bad-request", reply: "" }, { status: 400 });
  }

  if (!turns.length) {
    return NextResponse.json({ ok: false, engine: "empty", reply: "" }, { status: 400 });
  }

  const key = apiKey();
  if (!key) {
    return NextResponse.json({
      ok: false,
      engine: "unconfigured",
      reply:
        "The AI brain for this demo is not connected yet — the studio has to add a Gemini API key to the server environment. Please reach a human directly on WhatsApp at +91 72072 30851."
    });
  }

  const candidates = await modelCandidates(key);
  if (!candidates.length) {
    return NextResponse.json({
      ok: false,
      engine: "model-discovery-failed",
      reply:
        "I could not reach the AI service that runs my answers right now. Please try again shortly, or message the team on WhatsApp at +91 72072 30851."
    });
  }

  let lastDetail = "";
  for (const model of candidates.slice(0, 4)) {
    try {
      const res = await fetch(`${BASE}/models/${model}:generateContent`, {
        method: "POST",
        headers: { "x-goog-api-key": key, "content-type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: FAIRA_SYSTEM_PROMPT }] },
          contents: turns.map((t) => ({ role: t.role, parts: [{ text: t.text }] })),
          generationConfig: { temperature: 0.6, topP: 0.95, maxOutputTokens: 1024 }
        }),
        signal: AbortSignal.timeout(12000),
        cache: "no-store"
      });

      const data: any = await res.json().catch(() => null);

      if (res.status === 429) {
        return NextResponse.json(
          {
            ok: false,
            engine: "rate-limited",
            model,
            reply:
              "The AI service is rate-limited right now. Please wait a minute and ask again, or message the team on WhatsApp at +91 72072 30851."
          },
          { status: 429 }
        );
      }

      if (!res.ok) {
        lastDetail = data?.error?.message ?? `HTTP ${res.status}`;
        // Google blocks retired models, some variants reject systemInstruction, and a hot model
        // can be overloaded — in all those cases the next candidate may still answer.
        if (
          /no longer available|not available to new users|was not found|invalid model|unsupported|instruction|high demand|overload|capacity|try again later/i.test(
            lastDetail
          )
        ) {
          continue;
        }
        break;
      }

      const reply = textOf(data);
      if (!reply) {
        return NextResponse.json({
          ok: false,
          engine: "blocked",
          model,
          reply: "I could not answer that one. Please ask the team directly on WhatsApp at +91 72072 30851."
        });
      }

      candidateModels = [model, ...candidates.filter((c) => c !== model)];
      return NextResponse.json({ ok: true, engine: "gemini", model, reply });
    } catch (err: any) {
      // A stalled request is an upstream problem, not a model problem — answering honestly
      // beats stacking more timeouts on top of each other.
      lastDetail = err?.name === "TimeoutError" ? "The AI service took too long to answer" : String(err?.message ?? err);
      break;
    }
  }

  return NextResponse.json(
    {
      ok: false,
      engine: "api-error",
      detail: lastDetail,
      reply:
        "I could not get an answer from my AI brain this time. Please ask again in a moment, or message the team on WhatsApp at +91 72072 30851."
    },
    { status: 504 }
  );
}
