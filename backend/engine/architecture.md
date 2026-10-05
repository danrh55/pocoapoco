# Conversation engine

The conversation. It opens it, speaks each turn, and takes the inner thread when a reply misses the intent.

It is the only place the learner's language is written, and the composition root: it names every other component and calls all of them. It also owns the conversation's history, and writes back to the learner model.

That concentration is the architecture, not something to be cleaned up later. The engine is the agent — a tutor who keeps the thread, notices the learner is lost, and consults their knowledge of that learner and their bag of techniques. Lifting the orchestration out into its own component would be a different design, not a tidier version of this one.

Holding this together means it also has to hold every architectural decision above it. That is the cost, and it is worth watching rather than assuming it stays free.
