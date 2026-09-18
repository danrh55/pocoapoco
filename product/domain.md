# Purpose

Pocoapoco helps an intermediate learner reach fluent written Spanish. The learner brings
something real they want to say, fails to say it well, and works at it. That friction is the
mechanism.

Speech is out of scope. The goal is an automatized mental model of listening and generation,
built before the cognitive load of pronunciation is added — the on-ramp to speaking, not
speaking itself.

## Who this is for

An intermediate learner, defined by the gap between what they understand and what they can
produce:

- Understands far more than they can say.
- Can express themselves, but lacks vocabulary and makes frequent mistakes with connection
  words.
- Holds words in isolation. No intuition for compositions whose meaning changes when the
  words are together — `darse cuenta de que` is not `dar` plus the rest.
- No intuition for generating grammatically correct sentences from scratch.

Absolute beginners are out of scope. The loop requires production, and a learner with no
Spanish cannot produce.

## End state

The learner generates grammatically correct Spanish sentences fluently, in writing.

Fluency is theirs to judge. The app does not measure speed and does not report progress. The
signal is how much friction they feel over time when trying to express themselves.

## Theory

- **Interaction hypothesis** — acquisition is driven by interaction, and by input modified in
  response to a signal that it wasn't understood.
- **Error detection** — a committed attempt followed by correction is what makes a correction
  hold.
- **Negotiation for meaning** — when understanding fails, the failure is worked through rather
  than papered over.

Deliberate practice here means attempting the corrections. It does not mean drilling grammar.
The learner is not meant to learn a rule; they are meant to internalize a pattern.

## Invariants

1. **Correct, never explain.** No rules, no grammar terms, no "because". Showing where an
   error sits, or what writing says, is not explaining it.
2. **One error is worked at a time.** The learner never works a list.
3. **The writing stays theirs.** Correction works on the learner's own last attempt.
4. **Correction holds.** It blocks the turn. There is no skip.
5. **English is reference only.** It is never answered directly and never handed back as
   something to translate.
6. **The conversation continues.** The partner's reply comes last, so a turn ends in
   conversation rather than in correction.

## Assumptions

These carry the design. Each could be wrong, and use is how we find out.

1. The learner attempts everything they want to express, even broken, rather than retreating
   to sentences they know are safe.
2. Recast-only exposure produces pattern recognition over time for errors we never work.
3. Advice with its language pitched down stays useful enough to be worth coming back for.
4. Blocking correction on every turn is survivable daily, over months.
5. Errors left habituated resolve on their own once the significant ones clear.
6. Written automatization transfers to speech.

## Spec

[`conversation-loop.md`](conversation-loop.md) — the turn, the error types, and what happens
when the learner can't follow the partner.

## Not in this version

Error-type state and state-driven error selection · the hint mechanism · SRS and sentence
mining from bracket pulls · word-tap capture · YouTube as a second practice source · a
conditional intent check · a skip valve on correction · onboarding · progress reporting · the
stack.
