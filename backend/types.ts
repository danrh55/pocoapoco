/**
 * The running contract.
 *
 * Every component makes its own judgement calls, so nothing here hands a shared
 * decision port to anyone. What remains are the payloads the components exchange
 * and the signatures of the ones the engine calls.
 */

/** A caption entry. Timing is kept so segmentation can be added later. */
export type Caption = { text: string; offset: number; duration: number };

/** The ingestion component's output. Material for the conversation to move on,
 *  and nothing more — what is done with it is other components' business. */
export type Transcript = Caption[];

/** The learner's turn. English; the engine always speaks Spanish. */
export type LearnerReply = { text: string };

/** A turn the engine speaks. Displayable; everything else about it is open. */
export type Utterance = { text: string };

/** The analyzer's verdict. `factor` names the registered reference that accounts
 *  for the miss, or null when the reply was understood. */
export type Diagnosis = {
  misunderstood: boolean;
  factor: string | null;
};

/** What the learner knows, as a confidence spectrum rather than a set of items
 *  they have and have not seen. Lifelong and per learner. */
export type LearnerModel = unknown;

/* The components the engine calls. Signatures only — nothing here is built yet. */

/** Reads a reply and says what was missed. The engine calls it at the outer turn
 *  and again inside the tangent, with the same contract both times. */
export type Analyzer = {
  analyze: (input: { utterance: Utterance; reply: LearnerReply }) => Promise<Diagnosis>;
};

/** Keeps what the learner knows. The engine reads it as a bias toward what has
 *  not been exposed, and writes to it as the turn's diagnoses come in. */
export type LearnerModelStore = {
  read: () => LearnerModel;
  record: (input: { diagnosis: Diagnosis; reply: LearnerReply }) => LearnerModel;
};

/** Helps the learner comprehend, once the meaning is settled. A reframe is one of
 *  these rather than a step of its own. */
export type SupportTool = {
  name: string;
  run: (input: { utterance: Utterance; reply: LearnerReply; diagnosis: Diagnosis }) => Promise<string>;
};

export type SupportSelector = {
  select: (input: { diagnosis: Diagnosis; utterance: Utterance }) => Promise<SupportTool | undefined>;
};

/** Works the learner's own Spanish. Out of scope for this version, so what a
 *  correction produces is left open. */
export type CorrectionSelector = {
  select: (input: { diagnosis: Diagnosis; reply: LearnerReply }) => Promise<unknown>;
};

/** The composition root. It names every other component, owns the conversation's
 *  history, decides when to take a tangent, and writes the learner's turns. */
export type Engine = {
  /** Opens or continues the conversation. */
  speak: (input: { transcript: Transcript }) => Promise<Utterance>;

  /** Takes a reply and returns what the main thread shows next. Everything
   *  between — diagnosis, the tangent, the aids, the learner model — is internal. */
  respond: (input: { transcript: Transcript; reply: LearnerReply }) => Promise<Utterance>;
};

/** The read/write surface, and the session's lifetime. The engine may reach for
 *  its own while a tangent is in progress, so a read it does not expect is not an
 *  error. */
export type IO = {
  print: (text: string) => void;
  read: (prompt: string) => Promise<string | null>;
};