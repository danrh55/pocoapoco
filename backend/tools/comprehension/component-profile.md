# Comprehension tools profile

## Responsibility

Comprehension tools add support or structure to what the agent said so the learner can understand it.

## Owns

- The set of tools whose purpose is to help with comprehension of agent messages.
- Applying a selected tool to the relevant agent message, with the learner's response and conversation context available when useful.

## Invocation

A comprehension tool can be invoked directly by the learner or automatically when a comprehension need is detected. More than one tool may be invoked during the same turn. Tool invocation and output are coordinated with the conversation; the presentation of tool results is outside this profile.

## Does not own

These tools do not generate the agent's conversational messages or work on correcting the learner's own language. Those belong to the Agent and Generation tools respectively.

## Deferred to a specification

The available tools, their individual behavior, automatic detection and selection policy, and their input and output formats.
