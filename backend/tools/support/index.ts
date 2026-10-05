/**
 * Support tools — a stub.
 *
 * The aids that help the learner comprehend. They come after the meaning is
 * settled, never before: there is nothing to show someone until we know what they
 * meant. A reframe is one of these, not a separate step — asking again in plainer
 * Spanish is selected the same way any other aid is.
 *
 * What aids exist is not decided. Examples in context and a reword are candidates.
 *
 * Adding an aid: write its file, export it from `selection` below.
 *
 * Not implemented.
 */
import type { Diagnosis, SupportSelector, SupportTool, Utterance } from "../../types.ts";

/** The aids available. Empty by design. */
export function selection(): SupportTool[] {
  return [];
}

export const support: SupportSelector = {
  select: async (_input: {
    diagnosis: Diagnosis;
    utterance: Utterance;
  }): Promise<SupportTool | undefined> => {
    throw new Error("support.select not implemented");
  },
};