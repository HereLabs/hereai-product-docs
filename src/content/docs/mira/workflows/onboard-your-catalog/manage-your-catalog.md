---
title: Manage your catalog
description: Filter, sort, tag, override fields, and run bulk operations across products in the workspace.
---

This guide shows how to navigate and manage your catalog in the workspace once products are imported.

## Before you start

- A catalog with at least a few entries
- Editor role to make changes; Viewer role can read

## Filter and sort

In the catalog list, filter by:

- **Activation state** — imported, generating, approved, published
- **Tags** — line of business, segment, owner, activation priority
- **Stale vs current** — entries needing regeneration
- **Time range** — created, last published, last visited

Sort by name, last modified, performance, or conversion rate.

## Tag products

Tags slice the catalog by line, segment, owner, or activation priority. Add tags inline from the catalog list or product detail. Tags are searchable and feed [routing rules](/mira/workflows/capture-and-route-leads/routing-rules/) and analytics filters.

## Override source fields

Edit any field on a catalog entry without re-importing the whole catalog:

1. Open the product detail page.
2. Click **Edit** on the field.
3. Save.

Overrides are tracked in version history. A re-import doesn't clobber them unless you opt in via **Settings → Imports → Allow re-import to overwrite overrides**.

## Bulk operations

Select multiple products in the list view, then choose:

- **Regenerate** one or all kit sections
- **Approve** sections that have already been reviewed
- **Publish** landing pages
- **Tag** or **Untag**
- **Unpublish** or **Archive**

Each bulk operation is a single audit-logged action with a per-product success/failure report you can drill into.

## Related

- [Import from CSV](/mira/workflows/onboard-your-catalog/import-from-csv/)
- [Generate GTM kits](/mira/workflows/generate-gtm-kits/)
- [Audit log](/mira/administration/audit-log/)
