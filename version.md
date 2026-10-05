# This version

What the current build includes, and what it leaves out.

## Includes

Crosstalk. The engine speaks Spanish and the learner answers English. An English reply is analyzed, and if the intent was missed the meaning is negotiated with the learner before anything is said about it.

The flow is written and the components are wired. Every component is a stub that throws — the wiring resolves and the loop enters in the right order, but nothing past the first call runs.

## Excludes

**Spanish input.** The learner writes no Spanish, so nothing they wrote can be corrected and the correction tools are unreachable. The negotiation runs, then the recast — there is no learner-authored sentence to work on. This is the first thing that changes.

**The factor list.** The analyzer returns a diagnosis, but [no factors are defined](backend/tools/factors/architecture.md). Propositional frame, aspect, recipient, and object relatedness are candidates, not decisions. A factor earns a file once a diagnosis keeps pointing at it.

**What the support aids are.** Selection is wired, the registry is empty. A reframe is one of these rather than a step of its own, which is settled, but whether the set means examples in context, a reword, or neither is not.

**The learner model.** A stub at the port, kept as a boundary for the sentence mining it will hold and the exposure pacing it will eventually drive.

**Confidence gating.** Nothing is gated on how sure the decision layer is. The inner negotiation loop is the obvious place — it should stop on certainty rather than on a count of attempts — but no threshold is set.

## Known shape problems

These are open questions in the flow itself, not gaps in the components.

**The negotiation loop has no first question.** `negotiate` reads from the learner before any support aid is selected, so it depends on the engine asking something unprompted. If a reframe becomes a selectable aid, the ordering probably inverts: choose the aid, then ask. This changes what `speak` is called with, so it wants settling before the speaker is built.

**The inner loop is unbounded.** Nothing caps the attempts. The stub judge would stop after one exchange, but against a real decision layer it could run forever.

**The recast carries the whole turn.** Everything the inner loop established arrives in the main thread as a single Spanish sentence. Whether the recast should also carry a trace of what was corrected is open, and it interacts with the main thread staying a clean feed.

## Not built yet

Ingestion. The loop takes a transcript as an argument, so extraction runs ahead of it and `backend/ingestion/index.ts` is a stub.

No runner. There is no `package.json` and no entrypoint. The imports use `.ts` extensions, which needs ESM, so a runner will want `"type": "module"`.