import type { Analysis, Message, Recast } from "./types";

const post = async <T>(path: string, body: unknown): Promise<T> => {
  const res = await fetch(`/api/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? res.statusText);
  return res.json();
};

/** The partner sees the conversation as it should have been: corrected learner Spanish. */
export const transcript = (messages: Message[]) =>
  messages
    .map((m) => (m.role === "partner" ? `Partner: ${m.text}` : `Learner: ${m.corrected}`))
    .join("\n");

export const fillBrackets = (text: string) => post<{ filled: string }>("brackets", { text });

export const readIntent = (text: string) =>
  post<{ readable: boolean; english: string }>("intent", { text });

export const analyze = (text: string, intent: string, history: string) =>
  post<Analysis>("analyze", { text, intent, history });

export const check = (
  attempt: string,
  targetSpan: string,
  targetCorrection: string,
  intent: string,
) =>
  post<{ fixed: boolean; recasts: Recast[]; corrected: string }>("check", {
    attempt,
    targetSpan,
    targetCorrection,
    intent,
  });

export const reply = (corrected: string, history: string) =>
  post<{ reply: string }>("reply", { corrected, history });

export const lookUpWord = (word: string, sentence: string) =>
  post<{ examples: string[] }>("word", { word, sentence });

export const reword = (message: string, history: string) =>
  post<{ simpler: string }>("reword", { message, history });
