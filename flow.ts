import type { IO, LearnerReply, State } from "./types.ts";
import { extract } from "./backend/extractor.ts";
import { generateQuestion } from "./backend/question-generator.ts";
import { analyze } from "./backend/response-analyzer.ts";
import { route } from "./backend/router.ts";
import { generateReply } from "./backend/reply-generator.ts";
import { initial, update } from "./backend/state-tracker.ts";

/**
 * The loop — the fixed part.
 *
 * Extract once, then ask / analyze / route / reply until the terminal says
 * stop. This function does not understand any payload; it only threads them
 * between components. Filling in a component's internals must never change it.
 */
export async function run(url: string, io: IO): Promise<void> {
  const transcript = await extract(url);
  io.print(`transcript: ${transcript.length} captions\n`);

  let state: State = initial();

  for (;;) {
    const question = await generateQuestion({ transcript, state });
    io.print(`agent: ${question.text}`);

    const text = await io.read("you:  ");
    if (text === null) break;
    const reply: LearnerReply = { text };

    const verdict = await analyze({ reply, question, state });
    const action = route(verdict);
    const response = await generateReply({ action, question, state });
    io.print(`agent: ${response.text}\n`);

    state = update(state, verdict);
  }
}
