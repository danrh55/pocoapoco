import type { Analyzer, Diagnosis, LearnerReply, Utterance } from "../types.ts";

/**
 * The response analyzer — a stub.
 *
 * Reads the learner's reply and returns a diagnosis: whether the intent was
 * missed, and which factor accounts for it.
 *
 * The engine calls it at the outer turn and again inside the tangent, with the
 * same contract both times — the target differs, the judgement does not. A reply
 * judged against what the agent asked or stated; an attempt judged against what
 * the agent has just asked again.
 *
 * Not implemented.
 */
export const analyzer: Analyzer = {
  analyze: async (_input: { utterance: Utterance; reply: LearnerReply }): Promise<Diagnosis> => {
    throw new Error("analyzer.analyze not implemented");
  },
};