import type { Engine, IO, Transcript } from "./types.ts";

/**
 * The main loop.
 *
 * The conversation, and the end of the session. Everything that happens between a
 * reply and what the main thread shows next belongs to the engine, so this reads
 * as what it is: print a turn, take a turn.
 *
 * The learner ends the conversation when they stop answering. There is no other
 * ending.
 */
export async function run(transcript: Transcript, engine: Engine, io: IO): Promise<void> {
  for (;;) {
    io.print(`agent: ${(await engine.speak({ transcript })).text}`);

    const text = await io.read("you:  ");
    if (text === null) break;

    io.print(`you: ${(await engine.respond({ transcript, reply: { text } })).text}\n`);
  }
}