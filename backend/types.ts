/**
 * The running contract for the main loop.
 *
 * Only the decision boundary is decided: a question goes in, a typed answer comes
 * out, no strings. Everything else is open — the loop threads payloads between
 * components and must not change when their internals do.
 */

/** A caption entry. Timing is kept so segmentation can be added later. */
export type Caption = { text: string; offset: number; duration: number };

/** The ingestion component's output. */
export type Transcript = Caption[];

/** The learner's turn — English, crosstalk, for this version. */
export type LearnerReply = { text: string };

/** A turn the engine speaks. Displayable; everything else about it is open. */
export type Utterance = { text: string };

/** The analyzer's verdict. `issue` names the registered reference that accounts
 *  for the miss, or null when the reply was understood. */
export type Diagnosis = {
  misunderstood: boolean;
  issue: string | null;
};

/** What chunks the learner knows. A stub at the port: sentence mining, and
 *  pacing exposure by frequency, come later. */
export type LearnerModel = unknown;

/** The read/write surface, so the loop stays testable and the inner loop can be
 *  handed its own. */
export type IO = {
  print: (text: string) => void;
  read: (prompt: string) => Promise<string | null>;
};

/* The decision layer. Jev gives up string generation: it takes state and typed
   questions, returns typed answers with probabilities. Nothing that judges ever
   writes a sentence. */

export type Rubric = string | Record<string, unknown> | unknown[] | null;

/** Yes or no. Answers with the probability it is yes. */
export type NoulQuestion = {
  type: "noul";
  instructions: Rubric;
  criteria?: { true?: Rubric; false?: Rubric };
};

/** One of a closed set. Answers with the pick, the distribution, and confidence. */
export type ChoiceQuestion = {
  type: "choice";
  instructions: Rubric;
  criteria: Record<string, Rubric>;
};

export type Question = NoulQuestion | ChoiceQuestion;

export type NoulAnswer = { type: "noul"; noul: number };

export type ChoiceAnswer = {
  type: "choice";
  choice: string;
  probabilities: Record<string, number>;
  confidence: number;
};

/** The answer's type follows from the question's. */
export type Answer<Q extends Question> = Q extends NoulQuestion
  ? NoulAnswer
  : ChoiceAnswer;

export type Decisions = {
  evaluate: <Q extends Record<string, Question>>(input: {
    state: string | object | unknown[];
    questions: Q;
  }) => Promise<{ answers: { [K in keyof Q]: Q[K] extends Question ? Answer<Q[K]> : never } }>;
};

/* The components the loop drives. Signatures only — nothing here is built yet. */

/** Writes Spanish. The only place a sentence is produced. */
export type Speaker = {
  speak: (input: { transcript: Transcript; model: LearnerModel }) => Promise<Utterance>;
  recast: (input: {
    transcript: Transcript;
    model: LearnerModel;
    reply: LearnerReply;
    diagnosis: Diagnosis;
  }) => Promise<Utterance>;
};

/** Reads the learner's reply and names what was missed. */
export type Analyzer = {
  analyze: (input: {
    utterance: Utterance;
    reply: LearnerReply;
    decisions: Decisions;
  }) => Promise<Diagnosis>;
};

/** Judges whether the learner has said what they meant. */
export type Judge = {
  understood: (input: {
    utterance: Utterance;
    reply: LearnerReply;
    decisions: Decisions;
  }) => Promise<boolean>;
};

/** Helps the learner comprehend, once the meaning is settled. Its shape is
 *  undecided; returning text is the only assumption made here. */
export type SupportTool = {
  name: string;
  run: (input: { utterance: Utterance; reply: LearnerReply; diagnosis: Diagnosis }) => Promise<string>;
};

export type SupportSelector = {
  select: (input: {
    utterance: Utterance;
    reply: LearnerReply;
    diagnosis: Diagnosis;
    decisions: Decisions;
  }) => Promise<SupportTool | undefined>;
};

/** Works the learner's own Spanish. Unreachable in this version — the register is
 *  crosstalk, so an English reply is negotiated for meaning and recast instead. */
export type CorrectionSelector = {
  select: (input: {
    utterance: Utterance;
    reply: LearnerReply;
    diagnosis: Diagnosis;
    decisions: Decisions;
  }) => Promise<unknown>;
};

export type LearnerModelStore = {
  initial: () => LearnerModel;
  update: (model: LearnerModel, diagnosis: Diagnosis) => LearnerModel;
};

/** Everything the loop drives, injected so the flow reads top to bottom with
 *  nothing hidden behind an import. */
export type Components = {
  decisions: Decisions;
  speaker: Speaker;
  analyzer: Analyzer;
  judge: Judge;
  support: SupportSelector;
  correction: CorrectionSelector;
  learnerModel: LearnerModelStore;
};