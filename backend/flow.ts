import type {
  Components,
  Diagnosis,
  IO,
  Judge,
  LearnerModel,
  LearnerReply,
  Decisions,
  Speaker,
  SupportSelector,
  Transcript,
  Utterance,
} from "./types.ts";

/**
 * The main loop.
 *
 * The engine speaks Spanish, the learner answers in English, the reply is
 * diagnosed, and a missed intent hands the turn to the inner loop. Only the
 * engine's turn and the recast are printed to the main thread.
 *
 * The transcript is passed in rather than extracted here: ingestion is a
 * component of its own.
 *
 * Every component arrives as an argument. Nothing is imported, so the sequence
 * below is the whole of the flow.
 */
export async function run(
  transcript: Transcript,
  io: IO,
  {
    decisions,
    speaker,
    analyzer,
    judge,
    support,
    learnerModel,
  }: Components,
): Promise<void> {
  let model = learnerModel.initial();

  for (;;) {
    const utterance = await speaker.speak({ transcript, model });
    io.print(`agent: ${utterance.text}`);

    const text = await io.read("you:  ");
    if (text === null) break;
    const reply: LearnerReply = { text };

    const diagnosis = await analyzer.analyze({ utterance, reply, decisions });
    model = learnerModel.update(model, diagnosis);

    if (!diagnosis.misunderstood) continue;

    const recast = await negotiate({ transcript, model, utterance, reply, diagnosis, io }, { decisions, speaker, judge, support });
    io.print(`you: ${recast.text}\n`);
  }
}

/**
 * The conversation within the conversation.
 *
 * Asks again until the learner has said what they meant, offers the support tool
 * that helps them see it, and returns the settled intent as one Spanish sentence.
 * Then it is discarded: it takes its own IO, shares nothing with the main thread,
 * and leaves behind the recast alone.
 */
async function negotiate(
  input: {
    transcript: Transcript;
    model: LearnerModel;
    utterance: Utterance;
    reply: LearnerReply;
    diagnosis: Diagnosis;
    io: IO;
  },
  {
    decisions,
    speaker,
    judge,
    support,
  }: {
    decisions: Decisions;
    speaker: Speaker;
    judge: Judge;
    support: SupportSelector;
  },
): Promise<Utterance> {
  const { io, utterance, reply, diagnosis } = input;
  let answer = reply;

  for (;;) {
    const text = await io.read("you:  ");
    if (text === null) break;
    answer = { text };

    if (await judge.understood({ utterance, reply: answer, decisions })) break;
  }

  const aid = await support.select({ utterance, reply: answer, diagnosis, decisions });
  if (aid) io.print(`tool: ${await aid.run({ utterance, reply: answer, diagnosis })}`);

  return speaker.recast({ transcript: input.transcript, model: input.model, reply: answer, diagnosis });
}