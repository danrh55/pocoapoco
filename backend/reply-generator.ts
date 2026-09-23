import type { ReplyGenerator } from "../types.ts";

/**
 * Placeholder — returns a fixed Spanish reply.
 *
 * Tools plug in here via the registry. `action` is still opaque, so for now we
 * fall back to a fixed reply. When tools are defined, select one from
 * `registry.tools` based on the action and run it.
 */
export const generateReply: ReplyGenerator = async () => ({
  text: "Entiendo. ¿Y qué más?",
});
