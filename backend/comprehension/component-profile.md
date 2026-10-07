# Comprehension component profile

## Responsibility

Comprehension assesses what the learner understood from an agent message. It helps identify when a misunderstanding or other comprehension need may call for support.

## Owns

- Assessing the relationship between what the agent said and the learner's response or stated need.
- Providing information that can guide automatic comprehension support.

## Collaborates with

- **Conversation**, which provides the relevant exchange and acts on the assessment.
- **Learner profile**, when learner-specific context is relevant to interpreting comprehension.
- **Comprehension tools**, which can address a detected need.

## Does not own

Comprehension does not produce agent messages, add support to those messages, or correct learner-authored language.

## Deferred to a specification

Assessment categories, evidence, uncertainty handling, and how assessment informs automatic tool invocation.
