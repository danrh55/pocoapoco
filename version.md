# This version

What the current build includes, and what it leaves out.

## Includes

Crosstalk. The engine speaks Spanish and the learner answers English. A reply is analyzed, and if the intent was missed the meaning is negotiated with the learner before anything is said about it.

The main loop and the component boundaries. Every component is a stub that throws — the wiring resolves and the loop enters in the right order, but nothing past the first call runs.

## Excludes

**Spanish input.** The learner writes no Spanish, so nothing they wrote can be corrected and the correction tools are unreachable. This is the first thing that changes.

**The factor list.** The analyzer returns a diagnosis, but [no factors are defined](backend/tools/factors/architecture.md). Propositional frame, aspect, recipient, and object relatedness are candidates, not decisions. A factor earns a file once a diagnosis keeps pointing at it.

**What the support aids are.** Selection is wired, the registry is empty. A reframe is one of these rather than a step of its own, which is settled, but whether the set means examples in context, a reword, or neither is not.

**The learner model.** A stub at the port. It reads and writes on every turn, so the boundary is kept — but the spectrum, and the sentence mining it will hold, are not built.

**Confidence gating.** Nothing is gated on how sure a judgement is. The tangent is the obvious place — it should stop on certainty rather than on a count of attempts — but no threshold is set.

## Known shape problems

These are open questions in the engine, not gaps in the components.

**The tangent is unbounded.** Nothing caps the attempts, and against a real analyzer it could run for as long as the learner keeps answering. The stopping point is a judgement about understanding rather than a count, but nothing bounds it.

**Everything lands on the engine.** The engine orchestrates every component, holds the conversation's history, writes the learner model, and produces every sentence. That was decided, and it holds, but it means the engine is where nearly every architectural decision now lands — including ones not yet made.

**The analyzer is on the critical path.** Every turn asks for a diagnosis, and a missed one asks twice. Its cost is a latency floor on speaking. Fine for now, and worth remembering before it is a surprise.

**Nothing above the engine can see a tangent.** It is internal by design, so the loop cannot observe one. That is fine for now, but it means a tangent has no trail except what the engine chooses to leave behind.

## Not built yet

Ingestion. The loop takes a transcript as an argument, so extraction runs ahead of it and `backend/ingestion/index.ts` is a stub.

No runner. There is no `package.json` and no entrypoint. The imports use `.ts` extensions, which needs ESM, so a runner will want `"type": "module"`.
