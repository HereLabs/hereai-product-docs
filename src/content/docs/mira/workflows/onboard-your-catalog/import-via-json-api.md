---
title: Import via JSON API
description: Push catalog entries into Mira programmatically — auth, request shape, validation response, and idempotency via row hash.
---

This guide shows how to import a catalog programmatically via the JSON API. Use it when you want scheduled or event-driven syncs from an internal system.

## Before you start

- Admin role on your tenant (required to mint API tokens)
- An API token from **Settings → API tokens**
- Your tenant's API base URL, e.g. `https://api.mira.app`

## Steps

1. Mint a token in **Settings → API tokens** with the scope `catalog:write`.
2. Build the request body. Each entry has the same fields as the CSV columns:

   ```json
   {
     "entries": [
       {
         "external_id": "sku-1234",
         "name": "Compliance Logs",
         "description": "Audit-ready logging for SOC 2 reporting.",
         "category": "module",
         "audience": "compliance ops",
         "competitors": ["Datadog", "Splunk"]
       }
     ]
   }
   ```

3. POST to `/v1/catalog/imports`:

   ```bash
   curl -X POST https://api.mira.app/v1/catalog/imports \
     -H "Authorization: Bearer $MIRA_TOKEN" \
     -H "Content-Type: application/json" \
     -d @entries.json
   ```

4. The response includes a per-entry validation report:

   ```json
   {
     "import_id": "imp_…",
     "summary": { "imported": 1, "rejected": 0 },
     "rejected": []
   }
   ```

## Verify

- The import shows in the workspace's import history with `source_type: json_api` and the caller's token name.
- New entries appear in the catalog list with state `imported`.
- The import shows in the [audit log](/mira/administration/audit-log/).

## Idempotency

The same row hashing rules apply: re-POSTing identical entries is a no-op for unchanged rows. See [Re-import & change detection](/mira/workflows/onboard-your-catalog/re-import-and-change-detection/).

## Related

- [Import from CSV](/mira/workflows/onboard-your-catalog/import-from-csv/) — manual alternative
- [Re-import & change detection](/mira/workflows/onboard-your-catalog/re-import-and-change-detection/)
