import type { State, StateUpdater } from "../types.ts";

/** Placeholder — the state shape is undecided; identity for now. */
export const initial = (): State => ({});

export const update: StateUpdater = (state) => state;
