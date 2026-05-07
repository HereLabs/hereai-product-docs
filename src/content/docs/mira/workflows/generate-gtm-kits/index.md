---
title: Generate GTM kits
description: How Mira's generation agent drafts a GTM kit per catalog entry — section by section, streamed live, with version history and side-by-side variants.
---

Generation is where AI does its work: turning a catalog entry into a six-section GTM kit drafted by the [generation agent](/mira/concepts/agents/#generation-agent).

## How it works

When you trigger generation for a catalog entry, the generation agent runs in an isolated subprocess. It produces one **GTM kit** in a single structured-output call:

- **ICP hypotheses** — who the product is for, formed as testable hypotheses
- **Positioning** — what the product is, against what alternative, for what user
- **Messaging pillars** — three to five durable claims with supporting points
- **Competitive angles** — comparisons against named alternatives
- **Landing-page copy** — section-by-section page content
- **Outbound snippets** — channel-ready copy fragments

Each section is independently versioned, so partial regeneration is cheap.

## Live progress

As generation streams, the agent emits per-section progress events (`Drafting ICP`, `Done ICP`, `Drafting Positioning`, …). The workspace UI shows live progress without polling, so reviewers know exactly when each section is ready to read.

## Capabilities

- **Per-section regeneration** with a cost estimate before you run it
- **Version diff** between any two versions of the same section
- **Side-by-side variant comparison** for narrative experiments
- **Comment threads** per section for review collaboration
- **Risky-claim auto-flagging** against tenant-configurable rules and a critique pass

## Workflow

```
1. Open product detail in the workspace
2. Trigger generation (or bulk-generate from the catalog list)
3. Watch live progress as each section drafts
4. Review the kit; edit or regenerate sections as needed
5. Risky claims flagged for explicit review
6. Approve sections individually
```

## Reproducibility

Every kit version records the source input hash, prompt render hash, model used, and token cost. Re-generating the same input with the same prompts and model is identifiable from those hashes alone — useful for cache invalidation, debugging drift, and tracing which inputs produced a given output.

## Related

- [Agents](/mira/concepts/agents/) — the generation agent's trust contract
- [Review & approve](/mira/workflows/review-and-approve/) — what happens after generation
