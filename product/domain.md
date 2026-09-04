# Purpose

Pocoapoco is an app that helps users learn Spanish. It does this by incrementally introducing
demands and allowing the user to remain in the zone of desirable difficulty.

It uses user driven conversations as a way to drive relevance and individualize difficulty for 
each user. 

## Assumptions

1. The user is an absolute beginner when they start using this app.

## Invariants

1. Do not provide explanation for errors, only corrections.

## Layers

There are four layers in the progression, with each layer building the ability needed for the next layer. 

### 1 · Familiarity

- **Objective** — Acquire vocabulary through exposure in context and become familiar to the sounds and pattern of the language.
- **Load introduced** — Recognition of vocabulary and listening.
- **Excluded** — Sentence generation, recalling vocabulary, and speech. 

### 2 · Supported generation

- **Objective** — Ability to generate the correct word form (transformations), depending on the context.
- **Load introduced** — Recalling words from memory and using their correct form.
- **Excluded** — Blank sheet sentence construction, speech.

### 3 · Generation without speech

- **Objective** — Ability to generate sentences freely. 
- **Load introduced** — Blank sheet sentence generation.
- **Excluded** — Speech

### 4 · Generation with speech

- **Objective** — Generate sentences and produce the correct sounds in real time.
- **Load introduced** — Translating the mental model of the sounds of the language to physical mouth movements.
- **Excluded** — None

## Layer Spec:

Each layer must define the following:

1. Threshold and mechanism for moving onto the next layer. 
2. Mechanism for constraining cognitive load to not overwhelm the user.
