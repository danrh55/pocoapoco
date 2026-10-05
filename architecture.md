# Architecture

Pocoapoco is one conversation with a second one set aside inside it. The outer thread is the conversation itself. The inner one is an escape valve — taken when the learner misunderstands what is being communicated, or writes in a way that needs working on, and left behind once the meaning has been settled, so the main thread stays clean.

## Components

| Component | Responsibility |
|---|---|
| [Ingestion](backend/ingestion/architecture.md) | A video in, the transcript out. Runs once, before the conversation, knowing nothing about the learner, and passes it on. |
| [Conversation engine](backend/engine/architecture.md) | The conversation. Opens it, speaks each turn, takes the inner thread when a reply misses the intent, and composes what the main thread shows next. |
| [Response analyzer](backend/analyzer/architecture.md) | A learner reply in, a diagnosis out: was the intent missed, and what accounts for it. |
| [Learner model](backend/learner-model/architecture.md) | What the learner knows, as a spectrum. Read by the engine as a bias, written to as diagnoses arrive. |
| [Analyzer factors](backend/tools/factors/architecture.md) | The factors a diagnosis can name — where the learner went wrong. |
| [Support tools](backend/tools/support/architecture.md) | The aids that help the learner comprehend, once the meaning is settled. |
| [Correction tools](backend/tools/correction/architecture.md) | The aids that work the learner's own writing. |

## The one split

Nothing that judges ever writes a sentence. Every component makes its own judgement calls, and none of them writes the learner's language — that belongs to the engine alone. Judgements go into a component; language comes back out of one.

## The outer loop

The conversation. The engine speaks, the learner answers, and the engine composes what comes back — diagnosing, helping, and updating the learner model along the way. Most turns end there.

## The inner loop

A tangent the learner goes on, where the meaning is negotiated. Internal to the engine: the outer loop cannot see it and does not need to.

The engine asks, the learner answers, and the analyzer is asked again whether this attempt has landed — repeating until it has. That judgement is the analyzer's own, made a second time against a target the engine has just re-asked; it is not a separate component. Once the meaning is settled a support tool is selected, and correction tools work the learner's own writing when there is any.

Then the tangent is discarded. It shares no state with the outer conversation, and what it leaves behind is the settled meaning and whatever the learner model learned — so the outer thread carries the conversation and not the detour taken to reach it.

## How the pieces relate

The engine names every other component and calls all of them, which makes it the composition root. It also owns the conversation's history and writes the learner model. That concentration is the architecture rather than an accident: the engine is the agent, and the rest are the faculties it consults.

The three registries are one mechanism. Analyzer factors, support aids, and corrections are each a file plus an export, and the option set each is chosen from is built from that export — so adding one never touches the component that selects it.

Ingestion hands over a transcript and nothing more. Where in the content the conversation currently sits is not tracked outside the engine; the mechanism that drives the conversation forward from that material is the engine's own concern.

What the current build covers is in [version.md](version.md).
