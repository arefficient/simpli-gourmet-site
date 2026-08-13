import { NextResponse } from "next/server";

/**
 * PHASE 2 — AI chat assistant.
 *
 * This route currently returns a placeholder response so the floating chat
 * widget (Phase 2) can be dropped in without any frontend changes.
 *
 * To activate: swap the `assistantReply` below for a call to your AI model
 * (e.g. OpenAI/Anthropic) passing `messages`, and stream or return the reply.
 *
 * Expected request shape:
 *   POST /api/chat
 *   { "messages": [{ "role": "user", "content": "..." }] }
 */
export async function POST(request: Request) {
  const body = await request.json();
  const messages: { role: string; content: string }[] = Array.isArray(
    body?.messages
  )
    ? body.messages
    : [];

  const lastUserMessage = [...messages]
    .reverse()
    .find((m) => m.role === "user")?.content;

  const assistantReply =
    "This is the Phase 2 chat assistant placeholder. " +
    "I can already answer questions about our packages, pricing, and how to " +
    "request a quote. " +
    (lastUserMessage
      ? `You asked: "${String(lastUserMessage).slice(0, 140)}".`
      : "How can I help?");

  return NextResponse.json({ reply: assistantReply });
}
