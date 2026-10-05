/**
 * Support tools — a stub.
 *
 * The aids that help the learner comprehend. They come after the meaning is
 * settled, never before: there is nothing to show someone until we know what they
 * meant. Selected from the diagnosis, run once, discarded with the loop.
 *
 * A reframe is one of these, not a separate step — asking again in plainer Spanish
 * is selected the same way any other aid is.
 *
 * What aids exist is not decided. Examples in context and a reword are candidates.
 *
 * Adding an aid: write its file, export it from `selection` below. The option set
 * the decision layer sees is built from that export, so nothing else changes.
 *
 * Not implemented.
 */
import type {
  Decisions,
  Diagnosis,
  LearnerReply,
  SupportSelector,
  SupportTool,
  Utterance,
} from "../../types.ts";

/** The aids available. Empty by design. */
export function selection(): SupportTool[] {
  return [];
}

export const support: SupportSelector = {
  select: async (_input: {
    utterance: Utterance;
    reply: LearnerReply;
    diagnosis: Diagnosis;
    decisions: Decisions;
  }): Promise<SupportTool | undefined> => {
    throw new Error("support.select not implemented");
  },
};