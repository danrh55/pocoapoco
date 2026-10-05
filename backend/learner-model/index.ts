import type { LearnerModelStore, LearnerModel, Diagnosis } from "../types.ts";

/**
 * The learner model — a stub.
 *
 * What chunks the learner knows. Intended to hold mined sentences and known
 * chunks, so exposure to a chunk or a word can be paced by how well it is already
 * known.
 *
 * Kept as a boundary rather than dropped: the loop reads and writes it on every
 * turn, so leaving it out would put the shape back later. Identity for now.
 *
 * Not implemented.
 */
export const learnerModel: LearnerModelStore = {
  initial: (): LearnerModel => ({}),

  update: (model: LearnerModel, _diagnosis: Diagnosis): LearnerModel => model,
};