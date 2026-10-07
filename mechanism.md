# Conversation mechanism

Pocoapoco helps a learner build understanding and expression by working through communication challenges. The challenge takes place in a conversation: the agent communicates something meaningful, and the learner works to understand and respond to it. Support for comprehension and sentence generation are invoked when necessary.

## Comprehending what the agent says

The agent says something in the language the learner is learning. The learner tries to understand it and responds. The response may show that the learner understood, reveal a misunderstanding, or leave understanding uncertain. The learner may also indicate directly that they need help.

Support tools add help or structure to what the agent said so the learner can understand it. A tool is called for the relevant agent message. When useful, it can also receive the learner's response and relevant conversation context. The tool produces support for that message; it does not change the underlying communication challenge.

A support tool may be invoked directly by the learner or automatically when the system detects a comprehension need. Either route can be used during a turn, and more than one support tool may be invoked in the same turn. The supported meaning remains part of the ongoing conversation, where the learner can continue responding and working toward understanding.

## Developing what the learner says

As the learner begins producing language in the language being learned, their own expression becomes material for learning. Generation tools help the learner notice and attempt corrections in their writing, and provide deliberate practice in expressing meaning. Comprehension and generation can inform each other and need not be treated as separate stages of the product.

## Tailoring the exchange

The language, challenge, and support should account for what the learner can currently understand or express and what interests them. The app layers cognitive load so the challenge remains meaningful and approachable while expanding what the learner can do.

## Scope

The aim is for the learner to know what they want to say, with pronunciation as the remaining challenge. Free-form speech and conversations with people outside the app are outside the product's scope.

## Questions for later specifications

- What evidence is used to detect a comprehension need automatically?
- What inputs does each support tool need, and what kind of support does it produce?
- How are available support tools selected when several could help?
- How are correction and deliberate-practice tools chosen for a learner's written expression?
- What information about learner ability and interests is needed to tailor the exchange?
