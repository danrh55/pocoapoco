import type { Transcript } from "../types.ts";

/**
 * Ingestion — a stub.
 *
 * Turns a video into the material the conversation is built on: the transcript
 * and its structure. It runs once, before the conversation starts, and knows
 * nothing about the learner.
 *
 * It passes the transcript on. What is done with it — driving the conversation,
 * judging a reply against it, deciding how far along the content they are — is
 * other components' business, and none of it is reached for from here.
 *
 * Not implemented.
 */
export const extract = async (_url: string): Promise<Transcript> => {
  throw new Error("extract not implemented");
};