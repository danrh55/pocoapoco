import type { Speaker } from "../types.ts";

/**
 * The conversation engine — a stub.
 *
 * The only place Spanish is written. It opens the conversation, speaks each turn,
 * and recasts a settled intent as Spanish. It decides nothing: every decision is
 * handed to it, including what to ask while the meaning is being negotiated.
 *
 * Not implemented. Generation arrives with the real API.
 */
export const speaker: Speaker = {
  speak: async () => {
    throw new Error("speaker.speak not implemented");
  },

  recast: async () => {
    throw new Error("speaker.recast not implemented");
  },
};