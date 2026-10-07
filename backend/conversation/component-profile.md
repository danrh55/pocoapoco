# Conversation component profile

## Responsibility

The conversation coordinates a communication challenge between the agent and the learner. It is the central interaction through which the learner works to understand and express meaning.

## Owns

- The continuity and context of the ongoing exchange.
- Coordination between agent messages, learner responses, comprehension assessment, and tool activity.
- Bringing learner profile information into the exchange where it is needed.

## Collaborates with

- **Agent**, which produces the language the learner works to understand and respond to.
- **Comprehension**, which assesses what the learner understood.
- **Learner profile**, which provides learner-specific context.
- **Tools**, which support comprehension of agent messages or development of learner-authored language.

## Does not own

The conversation does not define the internal behavior of the agent, comprehension assessment, or individual tools. Those responsibilities remain in their respective components.

## Deferred to a specification

Turn state, message representation, error handling, and the precise coordination sequence.
