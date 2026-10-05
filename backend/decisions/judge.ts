import type { Judge, Utterance, LearnerReply, Decisions } from "../types.ts";

/**
 * The judge — a stub.
 *
 * Answers one question: has the learner said what they meant? It is what stops
 * the inner negotiation loop, so its certainty is load-bearing — the loop should
 * stop on how sure this is, not on a fixed count of attempts.
 *
 * Nothing is gated on confidence yet. That waits on the real API.
 *
 * Not implemented.
 */
export const judge: Judge = {
  understood: async (_input: {
    utterance: Utterance;
    reply: LearnerReply;
    decisions: Decisions;
  }): Promise<boolean> => {
    throw new Error("judge.understood not implemented");
  },
};