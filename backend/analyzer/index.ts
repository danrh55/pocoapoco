import type { Analyzer, Diagnosis, Utterance, LearnerReply, Decisions } from "../types.ts";

/**
 * The response analyzer — a stub.
 *
 * Reads the learner's reply and returns a diagnosis: whether the intent was
 * missed, and which issue accounts for it. Two questions in one decision-layer
 * call — missed or not, and if so which issue.
 *
 * The issue list is open and not yet written. Propositional frame, aspect,
 * recipient, and object relatedness are the first candidates; an issue earns a
 * file once a diagnosis keeps pointing at it.
 *
 * Not implemented.
 */
export const analyzer: Analyzer = {
  analyze: async (_input: {
    utterance: Utterance;
    reply: LearnerReply;
    decisions: Decisions;
  }): Promise<Diagnosis> => {
    throw new Error("analyzer.analyze not implemented");
  },
};