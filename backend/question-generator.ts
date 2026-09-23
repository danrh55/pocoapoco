import type { QuestionGenerator } from "../types.ts";

/** Placeholder — returns a fixed Spanish question. Real generation comes later. */
export const generateQuestion: QuestionGenerator = async () => ({
  text: "¿De qué trata el video?",
});
