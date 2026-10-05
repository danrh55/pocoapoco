/**
 * Correction tools — a stub.
 *
 * These work the learner's own Spanish, so they need the learner to have written
 * Spanish. This version never reaches them: the register is crosstalk, and an
 * English reply is negotiated for meaning and recast instead.
 *
 * What a correction produces is not decided, so the selector returns `unknown`.
 *
 * Adding a correction: write its file, export it from `selection` below.
 *
 * Not implemented.
 */
import type {
  CorrectionSelector,
  Decisions,
  Diagnosis,
  LearnerReply,
  Utterance,
} from "../../types.ts";

/** The corrections available. Empty by design. */
export function selection(): unknown[] {
  return [];
}

export const correction: CorrectionSelector = {
  select: async (_input: {
    utterance: Utterance;
    reply: LearnerReply;
    diagnosis: Diagnosis;
    decisions: Decisions;
  }): Promise<unknown> => {
    throw new Error("correction.select not implemented");
  },
};