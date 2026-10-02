# Architecture

Pocoapoco is four components. One prepares the video, one keeps track of what the learner knows, one keeps that model current, and one drives the conversation.

## Components

### Ingestion

Turns a video into the material the conversation is built on: the transcript and its structure. It runs once, before the conversation starts, and knows nothing about the learner.

### Learner model

A model of the learner's level and what they know. The engine reads it to make decisions. It decides nothing itself.

### Comprehension analyzer

Takes the learner's replies and updates the learner model.

### Conversation engine

The only component that makes decisions. It starts the conversation, and on every turn it decides which tools the learner needs, which tools to show them, and what the agent says next.

## How a turn works

1. The agent starts the conversation.
2. The learner replies.
3. The reply goes to the comprehension analyzer, which updates the learner model.
4. The engine reads the learner model as it stands, decides which tools the learner needs, and replies.
