---
title: PIM (Salsify, Productsup)
description: Sync your catalog from a PIM or marketplace tool so Mira stays in step with your master product data.
---

Mira's PIM connectors keep your catalog in sync with the master data system your operations team already runs.

:::tip[Capabilities]
- Native connectors for Salsify and Productsup
- Configurable polling cadence per connector
- Per-row hash detection — only changed entries mark stale
- Field-mapping editor (one-time + adjustable)
:::

## Supported PIMs

- **Salsify**
- **Productsup**
- Other PIM / marketplace tools via the [JSON API](/mira/workflows/onboard-your-catalog/import-via-json-api/) as a fallback

## Prerequisites

- API credentials from your PIM (token or OAuth client)
- The collection / workspace name in the PIM that Mira should mirror
- Mira **Admin** role

## Salsify setup

1. In Salsify, mint an API token with `read` scope on your target product set.
2. In Mira, open **Integrations → PIM → Salsify → Connect**.
3. Paste the Salsify domain and API token.
4. Pick the Salsify **Channel** or **Product Set** Mira should mirror.
5. Map Salsify properties to Mira fields:
   - Salsify `Name` → Mira `name`
   - Salsify `SKU` → Mira `external_id`
   - Salsify `Description` (or marketing description) → Mira `description`
   - Add optional fields (category, audience, competitors) if Salsify carries them
6. Set polling cadence. Default: every 6 hours. Adjust for active launch periods.
7. Click **Run first sync**.

## Productsup setup

1. In Productsup, mint a project-scoped API key with `read` access.
2. In Mira, open **Integrations → PIM → Productsup → Connect**.
3. Paste the API key and the Productsup project ID.
4. Pick the Productsup site / channel to mirror.
5. Map fields onto Mira's catalog schema (same shape as Salsify above).
6. Set cadence; first sync.

## Other PIMs (fallback)

Use the [JSON API](/mira/workflows/onboard-your-catalog/import-via-json-api/) to push entries on a schedule from any source. Required fields: `external_id`, `name`, `description`. The same hash-based change detection applies.

## Verify

- The first sync shows in **Imports** with `source_type: connector` and the connector name.
- New entries appear in the catalog list with state `imported`.
- Subsequent syncs only mark changed rows stale (per the per-row hash detection).

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Connector authentication fails | Token expired or scoped too narrowly | Re-issue the token with the required `read` scope |
| Some products missing | Field-mapping doesn't cover required Mira fields | Open the connector settings and adjust the mapping; re-run sync |
| Sync runs but produces zero updates | The PIM hasn't published changes; cache | Trigger an explicit publish in the PIM, then re-sync |

## Related

- [PIM / marketplace connectors](/mira/workflows/onboard-your-catalog/pim-marketplace-connectors/) — workflow side
- [Re-import & change detection](/mira/workflows/onboard-your-catalog/re-import-and-change-detection/)
- [Import via JSON API](/mira/workflows/onboard-your-catalog/import-via-json-api/) — fallback for unsupported PIMs
