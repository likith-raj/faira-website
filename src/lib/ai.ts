export type AiTurn = { role: "user" | "ai"; text: string };

const SYSTEM_PROMPT = `You are FAIRA AI, a helpful assistant for an AI automation agency in Nellore. 
Answer questions about voice agents, chat agents, and automation. 
Never mention pricing. 
If you don't know something, say "I'm not sure, but I can connect you to a human."`;

export async function askFairaAi(history: AiTurn[]): Promise<{ ok: boolean; reply: string; engine: string; detail?: string }> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return {
      ok: false,
      reply: "The AI brain is not connected. Please add GEMINI_API_KEY to your .env.local file.",
      engine: "unconfigured",
    };
  }

  const contents = history.map((turn) => ({
    role: turn.role === "user" ? "user" : "model",
    parts: [{ text: turn.text }],
  }));

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: contents,
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error:", errorData);
      return {
        ok: false,
        reply: `I'm having trouble connecting right now. (Error: ${response.status})`,
        engine: "gemini-rest",
        detail: JSON.stringify(errorData),
      };
    }

    const data = await response.json();
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiText) {
      return {
        ok: false,
        reply: "I couldn't generate a response. Please try asking in a different way.",
        engine: "gemini-rest",
      };
    }

    return {
      ok: true,
      reply: aiText,
      engine: "gemini-2.5-flash",
    };
  } catch (error: any) {
    console.error("Fetch Error:", error);
    return {
      ok: false,
      reply: "I'm having a network issue. Please check your internet and try again.",
      engine: "network-error",
      detail: error?.message,
    };
  }
}