/**
 * Every rule from product/domain.md and product/conversation-loop.md that a model
 * has to enforce lives here. This file is the prototype's real subject matter —
 * the app around it exists so these can be felt in use.
 */

export const ERROR_TYPES = [
  "lexical-choice",
  "verb-form",
  "pronouns-clitics",
  "connection",
  "word-order",
  "agreement",
] as const;

/** Significance order: meaning-destroying first. Used as the cold-start selection rule. */
const SIGNIFICANCE_ORDER = `
1. lexical-choice — wrong word, false friend, wrong collocation or chunk. Can destroy meaning outright.
2. verb-form — tense, aspect, mood. Says something other than what they reached for.
3. pronouns-clitics — object pronouns, placement, reflexives. Says something other than what they reached for.
4. connection — connectives, prepositions, subordination markers. The joinery is wrong.
5. word-order — understandable but misassembled.
6. agreement — gender, number. Nothing is misread.
`;

const NEVER_EXPLAIN = `
Never explain. No grammar terms, no rules, no "because", no naming of tenses or parts of
speech in anything the learner sees. Showing where an error sits, or what writing says, is
not explaining it. Stating why it is wrong is.
`;

export const fillBracketsPrompt = (text: string) => `
The learner is writing Spanish and has marked words they do not know by writing the English
in square brackets, like: quiero [borrow] tu libro

Replace each bracketed English word with the Spanish word, ready to use in that sentence —
inflected, conjugated and positioned so it fits. Not a dictionary lemma.

Change nothing else. Leave every error the learner made exactly as it is. You are filling a
gap, not correcting.

If a bracket is unclosed, treat it as literal text. Nesting is unsupported; the outermost
pair wins.

Text:
${text}
`;

export const intentPrompt = (text: string) => `
Render in English what this Spanish actually conveys — what a Spanish speaker would take
from it. Not a word-for-word translation.

Be faithful, not charitable. This is the whole point: if the learner wrote something other
than what they probably meant, render what they ACTUALLY wrote, including if it is strange,
wrong, or says something they clearly did not intend. Do not silently repair. "Estoy
embarazada" is "I'm pregnant", never "I'm embarrassed".

If the Spanish cannot be read as saying anything at all, set readable to false and leave
english empty. Do not guess at word salad.

Spanish:
${text}
`;

export const analyzePrompt = (text: string, intent: string, history: string) => `
The learner wrote Spanish. They have confirmed, in English, what they meant by it.

What they meant: ${intent}
What they wrote: ${text}

${history ? `Conversation so far:\n${history}\n` : ""}

Find every error. Then do two things.

FIRST, select exactly ONE error to be worked. Choose by significance, most meaning-destroying
first, using this order:
${SIGNIFICANCE_ORDER}

Only these six types can be worked. Pick the single most significant instance. Return its
exact substring from the learner's text as "span", plus what it should be.

Errors of any other kind — spelling, accents, capitalisation, punctuation, or anything that
does not fit the six types above — are NEVER worked. They go in recasts.

If there are no errors of the six worked types, set worked to null.

SECOND, list every OTHER error as a recast: the exact substring and its corrected form.

THIRD, give the learner's full text with every error corrected, expressing what they meant.
Keep their voice, their word choices and their sentence shapes wherever those were not wrong.
This is their sentence fixed, not your sentence.

${NEVER_EXPLAIN}
`;

export const checkPrompt = (
  attempt: string,
  targetSpan: string,
  targetCorrection: string,
  intent: string,
) => `
The learner was working one specific error and has rewritten their text.

What they meant: ${intent}
The error being worked: "${targetSpan}" should express "${targetCorrection}"
Their new attempt: ${attempt}

Judge ONLY whether the worked error is now right. Nothing else.

They succeed if that specific problem is fixed, even if their rewrite introduced new errors
elsewhere, and even if they solved it differently from the correction above. Any valid way of
expressing it counts. If they fixed the target and broke something else, they still succeeded.

They fail only if that specific error is still present.

Then, separately: give their attempt with all remaining errors corrected, and list those
remaining errors as recasts.

${NEVER_EXPLAIN}
`;

export const replyPrompt = (corrected: string, history: string) => `
You are the learner's conversation partner. They are working through something real — a
problem from their day, something they want to resolve, or something they want to vent about.
You are a tool for that problem. Spanish is just the medium.

${history ? `Conversation so far:\n${history}\n` : ""}
They just said: ${corrected}

Reply in Spanish with exactly one of:
- a question that makes them think, reflect, or clarify the problem
- something they should know
- an answer

LANGUAGE PITCHED DOWN, CONTENT INTACT. This is the hard part and the whole experiment.
Short sentences. Common words. Concrete framing. Present and past tense by preference.
But the substance must survive: say something genuinely useful, specific to their situation,
worth having read. Plain language is a constraint on form, not on insight. Do not retreat
into platitudes — "es difícil pero puedes hacerlo" is a failure.

Two to four sentences. Never mention Spanish, grammar, their errors, or that they are
learning. You are a person they are talking to about their problem.
`;

export const wordPrompt = (word: string, sentence: string) => `
The learner did not know this word and tapped it.

Word: ${word}
Where they met it: ${sentence}

Give three short, simple Spanish sentences using that word, each in a clearly different
context, so its range shows. Common vocabulary elsewhere in the sentence so the word itself
is the only new thing. No English, no explanation, no translation.
`;

export const rewordPrompt = (message: string, history: string) => `
The learner did not understand this message and asked for it again.

${history ? `Conversation so far:\n${history}\n` : ""}
Message: ${message}

Say the same thing in simpler Spanish. Shorter. One idea. The most common words available.
Keep the meaning — do not drop the substance, just lower the language.

No English. No explanation. Only the restatement.
`;
