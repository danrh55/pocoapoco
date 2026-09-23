/**
 * The running contract for the terminal loop.
 *
 * Only the extractor's boundary is decided (YouTube URL → captions). Every
 * other boundary is open: its shape gets decided when the component's metrics and
 * technology are chosen, without changing the flow.
 */

/** A single caption entry, with its timing. Timing is kept so segmentation can
 *  be added later; segmentation itself is undecided. */
export type Caption = { text: string; offset: number; duration: number };

/** The extractor's output. */
export type Transcript = Caption[];

/** A question must be displayable; everything else about it is open. */
export type Question = { text: string; [key: string]: unknown };

/** The learner's reply — English (crosstalk). */
export type LearnerReply = { text: string };

/** A reply must be displayable; everything else about it is open. */
export type Response = { text: string; [key: string]: unknown };

/** The analyzer's verdict. The kinds are undecided. */
export type Verdict = unknown;

/** The router's action. The kinds are undecided. */
export type Action = unknown;

/** The state accumulator. Its shape is undecided. */
export type State = unknown;

/** The fixed backend component signatures — the architecture. */
export type TranscriptExtractor = (url: string) => Promise<Transcript>;

export type QuestionGenerator = (input: {
  transcript: Transcript;
  state: State;
}) => Promise<Question>;

export type ResponseAnalyzer = (input: {
  reply: LearnerReply;
  question: Question;
  state: State;
}) => Promise<Verdict>;

export type Router = (verdict: Verdict) => Action;

export type ReplyGenerator = (input: {
  action: Action;
  question: Question;
  state: State;
}) => Promise<Response>;

export type StateUpdater = (state: State, verdict: Verdict) => State;

/** The terminal's read/write surface, so the flow stays testable. */
export type IO = {
  print: (text: string) => void;
  read: (prompt: string) => Promise<string | null>;
};
