# Offline Math Tutor

An offline-first math learning project whose planned spine runs from counting through introductory Calculus 1. The current repository is the verified content-engine prototype, not yet the learner-facing app.

## Current verified slice

- A 326-node prerequisite spine with stable slug IDs
- JSON Schema v4 for lesson nodes
- Three complete nodes using exact, declaration-driven generators
- Exact-rational verification for equation classification and value answers
- Nine misconception detectors that inspect ordered expression-AST steps
- Mutation tests proving the math verifier and detectors can fail

## Run the checks

Node.js 22 is recommended. There are no package dependencies.

```bash
npm test
```

Individual commands:

```bash
npm run verify
npm run test:math-mutations
npm run test:detectors
```

## Project constraints

- Offline-first PWA; mobile and desktop browsers are the initial targets
- Original lesson prose, with public-domain mathematics texts usable as references
- No OpenStax-derived prose or exercises because its license is CC BY-NC-SA
- Content correctness must be visible through generated-case reports and failing-case output
- Scope is the calculus prerequisite spine, followed later by linear algebra, ODEs, Calc 2, Calc 3, and physics

## Status

This is an early research and authoring prototype. The next technical milestone is testing the step detectors against additional, structurally different nodes before building the learner UI.
