# Tool system profile

## Responsibility

The tool system organizes and invokes learning tools used alongside the conversation. Its tools serve two purposes: helping the learner understand what the agent says, and helping the learner develop language they want to express.

## Owns

- Registration and discovery of available tools in their purpose-specific collections.
- Routing requests to the selected tool or tools and returning their results to the conversation.
- Supporting both learner-triggered and automatic invocations, including multiple tool invocations in one turn.

## Collaborates with

- **Conversation**, which provides invocation requests and relevant interaction context.
- **Comprehension**, whose assessment can inform automatic invocation of comprehension tools.
- **Learner profile**, which may inform whether and how a tool applies.

## Does not own

The tool system does not define what an individual tool does or how its result is presented. Individual tool behavior belongs to the comprehension and generation tool collections; presentation belongs outside this profile.

## Deferred to a specification

Tool registration format, invocation request and result formats, and the policy for matching automatic needs to tools.
