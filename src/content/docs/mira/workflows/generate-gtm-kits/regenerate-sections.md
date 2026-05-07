---
title: Regenerate sections
description: Re-run one section of a GTM kit without disturbing the others — surgical edits, version diff, and stale auto-suggestion.
---

This guide shows how to regenerate a single section of a kit. Regeneration is per-section because that keeps cost bounded and reviews scoped.

## Before you start

- A product with at least one generated kit
- Editor role

## Steps

1. Open a product's detail page.
2. Click the section you want to refresh (e.g. **Positioning**).
3. Click **Regenerate**. The cost-estimate dialog shows the expected token cost for just this section.
4. Confirm.
5. The section streams in, replacing the previous draft. The old version moves into version history.

## Stale auto-suggestion

If a catalog entry has been [marked stale](/mira/workflows/onboard-your-catalog/re-import-and-change-detection/) (its source fields changed since the last generation), the workspace shows a banner on the product detail page: **"Source fields changed; artifacts may be out of date."** From the banner you can:

- **Regenerate stale sections only** — Mira regenerates the sections most likely to have shifted given which fields changed
- **Regenerate all** — full kit refresh

## Version diff

Open any two versions of the same section side by side:

1. In the section header, click **History**.
2. Pick two versions.
3. Click **Compare**. A diff view highlights additions and removals.

## Verify

- The new version appears as the current draft.
- Previous versions remain in history; if a previous version was approved and pinned to a published page, that version stays live until republish.

## Related

- [Trigger a generation](/mira/workflows/generate-gtm-kits/trigger-a-generation/) — full-kit generation
- [Variants & risky-claim flags](/mira/workflows/generate-gtm-kits/variants-and-risky-claim-flags/)
- [Versioning & approval](/mira/concepts/versioning-and-approval/) — the versioning model
