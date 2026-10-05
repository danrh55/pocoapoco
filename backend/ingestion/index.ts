import type { Transcript } from "../types.ts";

/**
 * Ingestion — a stub.
 *
 * Turns a video into the material the conversation is built on: the transcript
 * and its structure. It runs once, before the conversation starts, and knows
 * nothing about the learner. The loop takes a transcript as an argument, so this
 * runs ahead of it.
 *
 * Only the boundary is decided — a YouTube URL in, captions out.
 *
 * Not implemented.
 */
export const extract = async (_url: string): Promise<Transcript> => {
  throw new Error("extract not implemented");
};