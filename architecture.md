# Architecture

Pocoapoco is one conversation with a second one set aside inside it. The outer thread is the conversation itself. The inner one is an escape valve — when misunderstands what is being commmunicated (both English crosstalk and Spanish replies) or errors in their Spanish response, and left behind once the meaning has been settled, so the main thread stays clean.

## Components

| Component | Responsibility |
|---|---|
| [Ingestion](backend/ingestion/architecture.md) | A video in, the transcript and its structure out. Runs once, before the conversation, knowing nothing about the learner. |
| [Conversation engine](backend/engine/architecture.md) | The only place the learner's language is written. Opens the conversation, speaks each turn, and speaks again inside the inner loop. |
| [Response analyzer](backend/analyzer/architecture.md) | A learner reply in, a diagnosis out: was the intent missed, and what accounts for it. |
| [Decision layer](backend/decisions/architecture.md) | Every judgement in the system, made as a typed question rather than as prose. |
| [Learner model](backend/learner-model/architecture.md) | What the learner knows. Keeps that so exposure can be paced by it. |
| [Analyzer references](backend/tools/factors/architecture.md) | The factors a diagnosis can name — where the learner went wrong. |
| [Support tools](backend/tools/support/architecture.md) | The aids that help the learner comprehend, once the meaning is settled. |
| [Correction tools](backend/tools/correction/architecture.md) | The aids that work the learner's own language. |

## The one split

Nothing that judges ever writes a sentence. The decision layer decides; the conversation engine speaks; nothing else writes text. Decisions go one way and language goes the other.

## The outer loop

The conversation. The engine speaks, the learner answers, the analyzer diagnoses the reply, and the learner model is updated with it. Most turns end there.

When the diagnosis says the intent was missed, the turn goes to the inner loop instead.

## The inner loop

A tangent the learner goes on, where the meaning is negotiated. The engine asks, the learner answers, and the decision layer judges whether the intent landed — repeating until it has. A support tool is selected once the meaning is settled, and correction tools work the learner's own writing when there is any to work on.

Then the inner loop returns and is discarded. It shares no state with the outer conversation, and what it leaves behind is the settled meaning and whatever the learner model learned — so the outer thread carries the conversation and not the detour taken to reach it.

## How the pieces relate

The three tool registries are one mechanism. Analyzer factors, support aids, and corrections are each a file plus an export, and the option set each decision sees is built from that export — so adding one never touches the component that selects it.

The decision layer sits below everything. Every component that judges reads it; nothing there reads them.

Filling in a component must not change the flow.

What the current build covers is in [version.md](version.md).
