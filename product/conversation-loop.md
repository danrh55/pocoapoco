# The conversation loop

How a turn runs, what gets corrected, and what happens when the learner can't follow the
partner.

## The conversation

The learner drives. They bring a problem from their day, something they want to resolve, or
something they want to vent about. Pure small talk is too boring to sustain — the AI is a tool
for the problem, and Spanish is the medium.

The partner's reply is one of three things:

- a question that makes the learner think, reflect, or clarify the problem
- something they should know
- an answer

**Language pitched down, content intact.** Plain Spanish carrying real substance — short
sentences, common words, concrete framing, with the insight left in. Whether the advice
survives the constraint is an open question, and use is how we find out.

The partner's output is where new language comes from.

Threads are conversations the learner creates. Nothing carries between them: no memory, no
continuity of concern.

## The turn

1. The learner writes Spanish.
2. **Brackets.** An unknown word is written in English in square brackets — *quiero [borrow] tu
   libro*. The app supplies the Spanish ready to use, not as a lemma. It is a gap, not an
   error, and it opens no correction.
3. **Intent check.** The app states in English what the writing conveys — not word for word,
   but what a Spanish speaker would take from it. The learner confirms it, or types what they
   actually meant. If the Spanish can't be read at all, the app says so and takes the English.
4. **Correction.** One error is selected and worked.
5. **Recasts.** Every other error is shown corrected, after the worked error resolves.
6. The corrected form is shown below the learner's own incorrect form.
7. **The partner replies** to the corrected Spanish, which now says what the learner meant.

The English never reaches the partner. It aims the correction; the correction produces Spanish
that carries the meaning; the partner answers that.

## Correction

One error per turn. The agent selects it — for now by significance, meaning-destroying first.

- The worked error is **located**: its span is marked.
- **Two attempts.** No hints.
- Still wrong after the second attempt — the corrected form is shown and the turn moves on.
- **Stay on target.** An attempt that fixes the worked error and breaks something else has
  succeeded; the new error is recast like any other. An attempt fails only if the target is
  still wrong.
- Correction blocks the turn.

Error types are internal. The learner never sees a type named, on a worked error or a recast.

## Error types

A fixed list, expandable once use shows what's missing. An error type may be handled by its own
subagent.

**Worked**

| Type | Covers |
|---|---|
| Verb form | tense, aspect, mood |
| Pronouns & clitics | object pronouns, placement, reflexives |
| Lexical choice | wrong word, false friend, wrong collocation or chunk |
| Connection | connectives, prepositions, subordination markers |
| Agreement | gender, number |
| Word order | |

**Recast only** — orthography, and anything not on the list.

Coverage is deliberately incomplete. Some errors are too nuanced to put in a box and need
exposure across many contexts instead. Those are recast, and the learner is expected to
pattern-recognize over time. A type that turns out to be real can be promoted later.

## When the learner can't follow the partner

**A word.** The learner taps it. The app produces a few more sentences using that word in
context.

**A whole message.** The learner presses reword. The partner restates it in simpler Spanish —
shorter, one idea, common words. No English.

**The significance of it.** Allowed to stand. The learner is left confused.

Misunderstanding surfaces on its own as the conversation continues, detected by **intent fit**:
the intent the learner confirmed doesn't answer what the partner asked. The negotiation that
follows runs in simplified Spanish.

## Shape

Two voices — the partner and the correction — kept separate. Correction lives in a panel that
takes over while the turn is blocked, which keeps front-end state simple.
