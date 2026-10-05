import type {
  Analyzer,
  CorrectionSelector,
  Engine,
  IO,
  LearnerModelStore,
  SupportSelector,
  Transcript,
  Utterance,
} from "../types.ts";

/**
 * The conversation engine — a stub.
 *
 * The only place Spanish is written, and the composition root: it names every
 * other component and calls all of them. It owns the conversation's history,
 * decides when a reply has missed the intent, takes the tangent internally, and
 * writes back to the learner model.
 *
 * This centralization is the architecture, not an accident to be cleaned up later.
 * The engine is the agent — a tutor who keeps the thread, notices the learner is
 * lost, and consults their knowledge of that learner and their bag of techniques.
 * Extracting the orchestration into a separate orchestrator would be a different
 * design, not a cleaner version of this one.
 *
 * Inside it, and left undecided: the history, the mechanism that drives the
 * conversation forward from the transcript, the tangent, and the components that
 * bias generation toward vocabulary the learner has not been exposed to.
 *
 * Nothing here is implemented. The tangent's own judgement about whether the
 * intent has landed is also internal — it is the analyzer, asked again, not a
 * separate component.
 */
export const engine = (input: {
  transcript: Transcript;
  analyzer: Analyzer;
  learnerModel: LearnerModelStore;
  support: SupportSelector;
  correction: CorrectionSelector;
  io: IO;
}): Engine => ({
  speak: async (_args): Promise<Utterance> => {
    throw new Error("engine.speak not implemented");
  },

  respond: async (_args): Promise<Utterance> => {
    throw new Error("engine.respond not implemented");
  },
});