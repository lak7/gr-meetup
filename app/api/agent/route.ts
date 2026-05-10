import { NextResponse } from "next/server";

type AgentRequest = {
  need: "medical" | "evacuation";
  location: string;
  contact: string;
  notes?: string;
};

export async function POST(req: Request) {
  try {
    const key = process.env.GROQ_API_KEY;
    if (!key) {
      return NextResponse.json(
        { error: "Missing GROQ_API_KEY in environment." },
        { status: 500 }
      );
    }

    const body = (await req.json()) as AgentRequest;
    const model = process.env.GROQ_MODEL ?? "llama-3.1-8b-instant";

    const system =
      "You are FireShield Incident Copilot. Be concise, calm, and practical. Return JSON with keys: summary (string), priority (low|medium|high|critical), immediate_actions (string[] max 5), responder_brief (string), safety_checks (string[] max 4).";

    const user = `Need: ${body.need}\nLocation: ${body.location}\nContact: ${body.contact}\nNotes: ${body.notes ?? "none"}`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: user }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: `Groq API error: ${err}` }, { status: 502 });
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ error: "No response from Groq model." }, { status: 502 });
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch {
      return NextResponse.json({ error: "Model returned invalid JSON." }, { status: 502 });
    }

    return NextResponse.json({ plan: parsed });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
