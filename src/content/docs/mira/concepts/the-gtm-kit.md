---
title: The GTM kit
description: A GTM kit is the set of artifacts produced for one catalog entry — ICP, positioning, pillars, competitive angles, landing copy, outbound snippets — each independently versioned and approved.
---

A GTM kit is the set of artifacts Mira produces for one catalog entry. Together they make up the product's go-to-market motion — a single, coherent answer to "who is this for, what is it, and how do we say so."

## Catalog entry

The atomic unit. Each entry has source fields (name, description, audience, competitors, etc.), a content hash for change detection, a tenant owner, and zero or more associated artifacts. Re-importing a catalog computes a per-row hash and marks only changed entries as stale; regeneration cost is bounded to those entries.

## Kit sections

A "GTM kit" is shorthand for the artifacts produced by one generation run for one catalog entry. Each kit has six sections:

- **ICP hypotheses** — who the product is for, formed as testable hypotheses
- **Positioning** — what the product is, against what alternative, for what user
- **Messaging pillars** — three to five durable claims with supporting points
- **Competitive angles** — comparisons against named alternatives
- **Landing-page copy** — section-by-section page content
- **Outbound snippets** — channel-ready copy fragments

## Anatomy of a kit

Each section has a different job in the GTM motion:

| Section | Used for | Consumed by |
| --- | --- | --- |
| **ICP hypotheses** | Defining the audience worth targeting | Routing rules, outbound-list selection |
| **Positioning** | The single durable claim about what the product is | Landing pages, sales enablement |
| **Messaging pillars** | The three to five claims that hold up under scrutiny | Landing pages, outbound, sales decks |
| **Competitive angles** | How the product wins against each named alternative | Battle cards, outbound replies |
| **Landing-page copy** | The actual page customers see | Hosted landing pages |
| **Outbound snippets** | Channel-ready copy fragments | Outbound sequences |

Sections are independent in scope but share input — the catalog entry — and a single approval state machine.

## Independent versioning

Each section is versioned and approved on its own. This matters in three places:

- **Cheap regeneration.** Re-running just one section creates a new version of that section only. The other five stay untouched, no re-approval needed.
- **Surgical edits.** A reviewer can rewrite the positioning without disturbing landing-page copy that's already gone through legal review.
- **Audit clarity.** When something goes wrong with what a customer saw, you can trace back to the exact version of the exact section that was on the page when they visited.

## Related

- [Versioning & approval](/mira/concepts/versioning-and-approval/) — the state machine each section moves through
- [Generate GTM kits](/mira/workflows/generate-gtm-kits/) — the workflow that produces kits
- [Review & approve](/mira/workflows/review-and-approve/) — the workflow that approves them
