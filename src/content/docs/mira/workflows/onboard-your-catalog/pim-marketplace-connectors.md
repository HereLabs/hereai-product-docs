---
title: PIM / marketplace connectors
description: Sync your catalog from a PIM or marketplace (Salsify, Productsup, equivalents) so Mira stays in step with your master data.
---

This guide shows how to wire a PIM or marketplace connector so your catalog flows into Mira automatically.

## Before you start

- Admin role on your tenant
- Credentials for your PIM / marketplace (API key, OAuth token, or whatever the source requires)
- A clear answer to "which collection or workspace should sync" — Mira pulls from a single named source per connector

## Supported connectors

- **Salsify**
- **Productsup**
- Other PIM / marketplace tools via the [JSON API](/mira/workflows/onboard-your-catalog/import-via-json-api/) as a fallback

## Steps

1. Open **Settings → Integrations → Catalog connectors** and pick a source.
2. Authenticate with the source — provide the API token or run the OAuth flow.
3. Pick the source collection / workspace you want Mira to mirror.
4. Map the source's product fields to Mira's fields (`name`, `external_id`, `description`, etc.). Save the mapping.
5. Set the sync cadence — typically daily for established catalogs, hourly during a launch window.
6. Click **Run first sync** to pull immediately, or wait for the schedule.

## Verify

- The first sync shows in the workspace's import history with `source_type: connector` and the connector name.
- New entries appear in the catalog list with state `imported`.
- Subsequent syncs follow the same hash-based change detection — only changed rows mark stale.

## Related

- [Re-import & change detection](/mira/workflows/onboard-your-catalog/re-import-and-change-detection/)
- [Import via JSON API](/mira/workflows/onboard-your-catalog/import-via-json-api/) — fallback for unsupported sources
