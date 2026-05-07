---
title: Trigger a generation
description: Generate a GTM kit for a single product or for many at once, with a cost preview before you commit.
---

This guide shows how to trigger generation for one product or a batch of products.

## Before you start

- At least one catalog entry imported
- Editor role

## Single product

1. Open a product's detail page.
2. Click **Generate**. A cost-estimate dialog appears showing the expected token cost based on the catalog entry size and the configured model.
3. Confirm to start generation.
4. Watch the per-section streaming events fill in (`Drafting ICP …`, `Done ICP`, …).
5. When all six sections complete, they render in the workspace in `draft` state, ready for review.

## Bulk generation

1. In the catalog list, filter to the products you want (e.g., **State: imported, Tag: launch-week**).
2. Select the rows.
3. Click **Bulk generate**. The cost preview shows the aggregate estimate.
4. Confirm.
5. Generation runs in parallel per product, with per-product progress visible in the bulk-job tray.

## What happens behind the scenes

Each generation job runs in an [isolated subprocess](/mira/concepts/how-ai-generation-is-sandboxed/) that calls the LLM and writes artifacts back. The job sees only the catalog entry it's working on plus the prompt templates — no DB credentials, no cross-tenant data, no app API access.

## Verify

- Each kit has six sections, all in `draft` state.
- Each section has its own version-history entry.
- The generation appears in the [audit log](/mira/administration/audit-log/) under `kit.generate`.

## Related

- [Regenerate sections](/mira/workflows/generate-gtm-kits/regenerate-sections/) — refreshing one section at a time
- [Variants & risky-claim flags](/mira/workflows/generate-gtm-kits/variants-and-risky-claim-flags/)
- [Review & approve](/mira/workflows/review-and-approve/) — what runs next
