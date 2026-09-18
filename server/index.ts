import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject, generateText } from "ai";
import { z } from "zod";
import {
  ERROR_TYPES,
  analyzePrompt,
  checkPrompt,
  fillBracketsPrompt,
  intentPrompt,
  replyPrompt,
  rewordPrompt,
  wordPrompt,
} from "./prompts.ts";

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
const model = openai(process.env.OPENAI_MODEL ?? "gpt-4.1");

const app = new Hono();

const recast = z.object({
  span: z.string().describe("exact substring from the learner's text"),
  correction: z.string(),
});

const worked = z.object({
  span: z.string().describe("exact substring from the learner's text"),
  type: z.enum(ERROR_TYPES),
  correction: z.string().describe("what that span should be"),
});

/** Models return spans that aren't always present verbatim. Drop those rather than mis-mark. */
const locatable = (text: string, span: string) =>
  span.length > 0 && text.includes(span);

/** Smaller models emit recasts that correct nothing. A no-op "fix" is worse than silence. */
const changes = (r: { span: string; correction: string }) =>
  r.span.trim().toLocaleLowerCase("es") !== r.correction.trim().toLocaleLowerCase("es");

const usableRecasts = (text: string, recasts: { span: string; correction: string }[]) =>
  recasts.filter((r) => locatable(text, r.span) && changes(r));

app.post("/api/brackets", async (c) => {
  const { text } = await c.req.json<{ text: string }>();
  if (!text.includes("[")) return c.json({ filled: text });

  const { object } = await generateObject({
    model,
    schema: z.object({ filled: z.string() }),
    prompt: fillBracketsPrompt(text),
  });
  return c.json(object);
});

app.post("/api/intent", async (c) => {
  const { text } = await c.req.json<{ text: string }>();
  const { object } = await generateObject({
    model,
    schema: z.object({ readable: z.boolean(), english: z.string() }),
    prompt: intentPrompt(text),
  });
  return c.json(object);
});

app.post("/api/analyze", async (c) => {
  const { text, intent, history } = await c.req.json<{
    text: string;
    intent: string;
    history: string;
  }>();

  const { object } = await generateObject({
    model,
    schema: z.object({
      worked: worked.nullable(),
      recasts: z.array(recast),
      corrected: z.string(),
    }),
    prompt: analyzePrompt(text, intent, history),
  });

  return c.json({
    ...object,
    worked: object.worked && locatable(text, object.worked.span) ? object.worked : null,
    recasts: usableRecasts(text, object.recasts),
  });
});

app.post("/api/check", async (c) => {
  const { attempt, targetSpan, targetCorrection, intent } = await c.req.json<{
    attempt: string;
    targetSpan: string;
    targetCorrection: string;
    intent: string;
  }>();

  const { object } = await generateObject({
    model,
    schema: z.object({
      fixed: z.boolean(),
      recasts: z.array(recast),
      corrected: z.string(),
    }),
    prompt: checkPrompt(attempt, targetSpan, targetCorrection, intent),
  });

  return c.json({
    ...object,
    recasts: usableRecasts(attempt, object.recasts),
  });
});

app.post("/api/reply", async (c) => {
  const { corrected, history } = await c.req.json<{ corrected: string; history: string }>();
  const { text } = await generateText({ model, prompt: replyPrompt(corrected, history) });
  return c.json({ reply: text.trim() });
});

app.post("/api/word", async (c) => {
  const { word, sentence } = await c.req.json<{ word: string; sentence: string }>();
  const { object } = await generateObject({
    model,
    schema: z.object({ examples: z.array(z.string()).length(3) }),
    prompt: wordPrompt(word, sentence),
  });
  return c.json(object);
});

app.post("/api/reword", async (c) => {
  const { message, history } = await c.req.json<{ message: string; history: string }>();
  const { text } = await generateText({ model, prompt: rewordPrompt(message, history) });
  return c.json({ simpler: text.trim() });
});

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: err.message }, 500);
});

if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY is not set. Copy .env.example to .env and fill it in.");
  process.exit(1);
}

serve({ fetch: app.fetch, port: 8787 }, (i) =>
  console.log(`api on http://localhost:${i.port}  (model: ${process.env.OPENAI_MODEL ?? "gpt-4.1"})`),
);
