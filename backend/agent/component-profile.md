# Agent component profile

## Responsibility

The agent produces the language it says to the learner during a communication challenge. Its messages give the learner meaningful language to understand and respond to.

## Owns

- Producing an agent message appropriate to the challenge and current conversation context.
- Taking learner-specific context into account when shaping its language.

## Collaborates with

- **Conversation**, which provides the interaction context and uses the resulting message in the exchange.
- **Learner profile**, which provides information relevant to the learner's current ability and interests.

## Does not own

The agent does not assess whether the learner understood its message, choose or run comprehension tools, or correct the learner's language. Those concerns belong to other components.

## Deferred to a specification

Prompting, language-generation constraints, challenge inputs, and the message format.
