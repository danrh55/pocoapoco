export type Recast = { span: string; correction: string };

export type Worked = {
  span: string;
  type: string;
  correction: string;
};

export type Analysis = {
  worked: Worked | null;
  recasts: Recast[];
  corrected: string;
};

export type Message =
  | { role: "partner"; text: string; reworded?: string }
  | { role: "learner"; original: string; corrected: string; recasts: Recast[] };

/** The turn is a small machine. This is its whole state space. */
export type Turn =
  | { phase: "idle" }
  | { phase: "filling" }
  | { phase: "reading"; text: string }
  | { phase: "intent"; text: string; english: string; readable: boolean }
  | { phase: "analyzing"; text: string; intent: string }
  | {
      phase: "correcting";
      text: string;
      intent: string;
      analysis: Analysis;
      attempt: 1 | 2;
      draft: string;
      checking: boolean;
      missed: boolean;
    }
  | { phase: "replying" };
