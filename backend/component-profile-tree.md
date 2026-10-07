# Backend component profile tree

The conversation is the center of a communication challenge. The agent communicates with the learner there. Other backend components make that exchange relevant, assess comprehension, and provide tools for understanding or expressing language.

This tree names the major learning-domain components and summarizes how they relate. Each component folder has a profile clarifying its responsibility. Specific behavior and interfaces belong in later component specifications.

```text
backend
├── conversation
│   └── component-profile.md
├── agent
│   └── component-profile.md
├── comprehension
│   └── component-profile.md
├── learner-profile
│   └── component-profile.md
└── tools
    ├── component-profile.md
    ├── comprehension
    │   └── component-profile.md
    └── generation
        └── component-profile.md
```

| Component | Responsibility | Relationship to the conversation |
|---|---|---|
| [Conversation](conversation/component-profile.md) | Coordinates the ongoing exchange and its context. | The central interaction; brings in the agent, comprehension assessment, learner profile, and tools. |
| [Agent](agent/component-profile.md) | Produces what the agent says to the learner. | Uses the challenge and learner context to add language to the conversation. |
| [Comprehension](comprehension/component-profile.md) | Assesses what the learner understood from what the agent said. | Informs the conversation when comprehension support may help. |
| [Learner profile](learner-profile/component-profile.md) | Represents learner interests, current knowledge, and observed needs. | Provides context for tailoring the conversation and support. |
| [Tools](tools/component-profile.md) | Registers and invokes tools from the comprehension and generation collections. | Receives learner or automatic invocation requests from the conversation; supports multiple invocations in a turn. |
| [Comprehension tools](tools/comprehension/component-profile.md) | Add support or structure to what the agent said. | Can be invoked by the learner or automatically; multiple tools may be invoked in a turn. |
| [Generation tools](tools/generation/component-profile.md) | Help develop language the learner is trying to express. | Work with learner-authored language through correction and deliberate practice. |

These profiles describe responsibilities, not a required call sequence. The tool system supports both learner-triggered and automatic invocation; the policy for detecting needs and selecting tools is left to later specifications.
