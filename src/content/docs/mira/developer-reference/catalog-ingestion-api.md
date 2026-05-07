---
title: Catalog ingestion API
description: Push catalog entries into Mira programmatically — auth, request shape, validation response, idempotency.
---

The catalog ingestion API lets you push catalog entries from internal systems on a schedule or on every catalog change. Same validation rules and hash-based change detection as the CSV / connector paths.

## Auth

```
Authorization: Bearer <token>
```

Mint tokens in **Settings → API tokens** with scope `catalog:write`. Tokens are tenant-scoped; rotate at any time.

## Endpoint

```
POST https://api.mira.app/v1/catalog/imports
Content-Type: application/json
```

## Request body

```json
{
  "entries": [
    {
      "external_id": "sku-1234",
      "name": "Compliance Logs",
      "description": "Audit-ready logging for SOC 2 reporting.",
      "category": "module",
      "audience": "compliance ops",
      "competitors": ["Datadog", "Splunk"],
      "proof_points": ["SOC 2 Type II", "ISO 27001"],
      "owner": "pmm@yourcompany.com",
      "routing_hints": {
        "default_destination": "hubspot",
        "tags": ["compliance"]
      }
    }
  ]
}
```

### Required per entry

- `external_id` — stable identifier; unique within the tenant
- `name`
- `description`

### Optional per entry

`category`, `audience`, `pricing_tier`, `existing_url`, `competitors[]`, `proof_points[]`, `owner`, `routing_hints{}`.

### Limits

- Maximum 1,000 entries per request
- Maximum 5 MB request body
- See [Rate limits & errors](/mira/developer-reference/rate-limits-and-errors/) for per-token limits

## Response

```json
{
  "import_id": "imp_…",
  "summary": {
    "imported": 15,
    "rejected": 1,
    "stale": 4
  },
  "rejected": [
    {
      "row": 7,
      "external_id": "sku-9999",
      "errors": ["description: required field missing"]
    }
  ],
  "stale": ["ce_…", "ce_…"]
}
```

| Field | Meaning |
| --- | --- |
| `imported` | New entries created |
| `rejected` | Entries that failed validation |
| `stale` | Existing entries whose hash changed (now flagged for regeneration) |

## Idempotency

Re-POSTing identical entries is a no-op for unchanged rows. The hash detection is documented in [Re-import & change detection](/mira/workflows/onboard-your-catalog/re-import-and-change-detection/).

## Example

```bash
curl -X POST https://api.mira.app/v1/catalog/imports \
  -H "Authorization: Bearer $MIRA_TOKEN" \
  -H "Content-Type: application/json" \
  -d @entries.json
```

## Verifying the import

Check **Imports** in the workspace, or fetch the import record:

```bash
curl https://api.mira.app/v1/catalog/imports/imp_… \
  -H "Authorization: Bearer $MIRA_TOKEN"
```

The response is the same shape as the POST response.

## Related

- [Import via JSON API](/mira/workflows/onboard-your-catalog/import-via-json-api/) — workflow side
- [Re-import & change detection](/mira/workflows/onboard-your-catalog/re-import-and-change-detection/)
- [Rate limits & errors](/mira/developer-reference/rate-limits-and-errors/)
