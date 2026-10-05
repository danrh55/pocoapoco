import type { Diagnosis, LearnerModel, LearnerModelStore, LearnerReply } from "../types.ts";

/**
 * The learner model — a stub.
 *
 * What the learner knows, as a confidence spectrum rather than a set of items they
 * have and have not seen. Lifelong, and per learner. It biases what the engine
 * reaches for; it never constrains it. A deterministic "known" set would push the
 * engine into unnatural Spanish to avoid repeating something.
 *
 * The engine reads it and writes to it as the turn's diagnoses come in, so the
 * read/write pair is kept as a boundary rather than dropped — leaving it out would
 * put the shape back later. Identity for now.
 *
 * Not implemented.
 */
export const learnerModel: LearnerModelStore = {
  read: (): LearnerModel => ({}),

  record: (_input: { diagnosis: Diagnosis; reply: LearnerReply }): LearnerModel => ({}),
};