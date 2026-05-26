import { groq } from "@ai-sdk/groq";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { buildAssistantSystemPrompt } from "@/lib/assistant-prompt";

export const maxDuration = 30;

const MAX_MESSAGES = 24;
const MAX_OUTPUT_TOKENS = 1400;

/** Open-source Llama on Groq — free tier, no credit card. */
const DEFAULT_MODEL = "llama-3.3-70b-versatile";

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return Response.json(
      {
        error:
          "AI assistant is not configured. Add GROQ_API_KEY (free at console.groq.com).",
      },
      { status: 503 }
    );
  }

  let body: { messages?: UIMessage[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = body.messages ?? [];
  if (messages.length === 0) {
    return Response.json({ error: "No messages provided." }, { status: 400 });
  }

  const recent = messages.slice(-MAX_MESSAGES);
  const modelId = process.env.GROQ_MODEL?.trim() || DEFAULT_MODEL;

  const result = streamText({
    model: groq(modelId),
    system: buildAssistantSystemPrompt(),
    messages: await convertToModelMessages(recent),
    maxOutputTokens: MAX_OUTPUT_TOKENS,
    temperature: 0.35,
  });

  return result.toUIMessageStreamResponse();
}
