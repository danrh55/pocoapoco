import type { Decisions, Question } from "../types.ts";

/**
 * The decision layer — a stub.
 *
 * Jev gives up string generation: it takes state and typed questions and returns
 * typed answers with probabilities. Every judgement in the loop goes through here
 * — was the intent missed, which issue, which aid, does the learner understand it
 * yet. Nothing that judges ever writes a sentence.
 *
 * Not implemented. Wire `@typesafe-ai/sdk` when TYPESAFE_API_KEY exists; the
 * `Decisions` port in types.ts is that client's shape.
 */
export const decisions: Decisions = {
  evaluate: async (_input: {
    state: string | object | unknown[];
    questions: Record<string, Question>;
  }): Promise<never> => {
    throw new Error("decisions.evaluate not implemented");
  },
};