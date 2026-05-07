---
title: Import from CSV
description: Upload a CSV catalog into Mira — column mapping, validation, partial import, and re-import behavior.
---

This guide shows how to import a product catalog from a CSV file.

## Before you start

- Admin or Editor role on your tenant
- A CSV file with at least three columns: a product `name`, a stable `external_id` (unique within your tenant), and a `description`
- Optional but recommended columns: `category`, `audience`, `pricing_tier`, `existing_url`, `competitors`, `proof_points`, `owner`, `routing_hints`

## Steps

1. In the workspace, click **Import catalog** → **Upload CSV**.
2. Drop your file onto the upload area.
3. Review the auto-detected column mapping. Adjust any column that should map to a different Mira field.
4. Click **Validate**. Mira runs per-row validation and reports each error with the row number and reason.
5. If errors exist, fix them in your file and re-upload, or accept a partial import (only rows with required fields succeed).
6. Click **Import**.

## Verify

- Imported entries appear in the catalog list with state `imported`.
- The import is recorded in the workspace's import history with source filename, mapping used, timestamp, your user, and the validation report.
- The same import shows in the [audit log](/mira/administration/audit-log/) under the action `catalog.import`.

## Re-import behavior

Re-importing the same CSV is idempotent:

- Rows whose hash matches an existing entry are no-ops.
- Rows whose hash differs are marked **stale** for regeneration.
- New rows become new catalog entries.

See [Re-import & change detection](/mira/workflows/onboard-your-catalog/re-import-and-change-detection/) for the full mechanics.

## Related

- [Import via JSON API](/mira/workflows/onboard-your-catalog/import-via-json-api/) — programmatic alternative
- [Manage your catalog](/mira/workflows/onboard-your-catalog/manage-your-catalog/) — what happens after import
- [Audit log](/mira/administration/audit-log/) — the canonical record
