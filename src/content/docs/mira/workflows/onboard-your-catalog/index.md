---
title: Onboard your catalog
description: Bring your product catalog into Mira, then manage it — list, filter, tag, drill in, and run bulk operations across products.
---

Mira's first step is bringing your product catalog in. Imports are how every catalog entry — and therefore every GTM motion — comes to exist in the system. Once imported, the workspace is where your catalog lives.

## How it works

Each row in the source becomes one **catalog entry** in your workspace. Mira stores the entry's source fields plus a content hash for change detection.

When you re-import:

1. Mira hashes each incoming row.
2. Rows whose hash matches an existing entry are no-ops.
3. Rows whose hash differs are marked **stale** — their artifacts remain but are flagged for regeneration.
4. New rows become new catalog entries.

Re-importing is cheap and idempotent: regeneration cost is bounded to entries that actually changed.

## What's supported

| Source | Use it for |
| --- | --- |
| **CSV upload** | One-off imports, periodic refreshes, design-partner onboarding |
| **JSON API** | Programmatic ingestion from internal systems, scheduled syncs |
| **Vertical schema templates** | Pre-mapped column conventions for MarTech / AdTech, AI platform, vertical SaaS |
| **PIM and marketplace connectors** | Salsify, Productsup, equivalents — keep Mira in sync with your master catalog |

All sources land at the same per-tenant catalog and use the same validation rules.

## Required and optional fields

**Required:** product name, external ID (your stable identifier; unique per tenant), description.

**Optional but recommended:** category (module / integration / package / add-on), audience, pricing tier, existing URL, competitors, proof points, owner, routing hints.

You can override any field per-product without re-importing the whole catalog.

## Validation

Per-row validation flags missing required fields, format issues (malformed URLs, invalid emails), and duplicate external IDs within the import. Rejected rows are reported with row number and reason. Fix the file and retry — Mira dedupes by external ID, so valid rows aren't re-imported.

## Import history

Every import is recorded with source filename or API caller, mapping used, timestamp, the user who triggered it, and a validation report (entry count, error count). Imports are visible in the [audit log](/mira/administration/audit-log/).

## Manage your catalog

Once imported, your catalog lives in the workspace with three views over the same data:

- **Catalog list** — every product in the tenant, filterable and sortable
- **Product detail** — single-product page with source fields, generated kit, approval state, and version history
- **Bulk operations** — apply actions across selected products

Everything is tenant-scoped. RBAC determines who can edit, approve, and publish.

### Filtering and sorting

Filter the catalog list by activation state (imported, generating, approved, published), tags (line of business, segment, owner, activation priority), stale vs current, or time range (created, last published, last visited). Sort by name, last modified, performance, or conversion rate.

### Tags

Tag products to slice the catalog by line, segment, owner, or activation priority. Tags are searchable and feed [routing rules](/mira/workflows/capture-and-route-leads/) and analytics filters.

### Source field overrides

Edit any field on a catalog entry without re-importing the whole catalog. Overrides are tracked in version history; a re-import doesn't clobber them unless you opt in.

### Bulk operations

Select products in the list view to:

- Regenerate one or all kit sections
- Approve sections that have already been reviewed
- Publish landing pages
- Tag or untag
- Unpublish or archive

A bulk operation is a single audit-logged action with a per-product success/failure report.

## Workflow

```
1. Upload CSV / hit JSON API / connector pulls
2. Mira proposes a column mapping (auto-detect or vertical template)
3. You confirm or adjust the mapping
4. Per-row validation; errors reported by row number
5. Partial import allowed when required fields are present
6. New entries land in the workspace, ready for generation
7. Tag for activation priority
8. Trigger generation (single product or bulk)
```

## Related

- [Generate GTM kits](/mira/workflows/generate-gtm-kits/) — what runs next after import
- [Review & approve](/mira/workflows/review-and-approve/)
