---
title: Rate limits & errors
description: Per-token rate limits, error response shape, and retry semantics for the catalog ingestion API.
---

Mira enforces per-token rate limits on the catalog ingestion API. Errors follow a single envelope shape regardless of endpoint.

## Rate limits

| Endpoint | Limit | Burst |
| --- | --- | --- |
| `POST /v1/catalog/imports` | 60 / minute | 10 |
| `GET /v1/catalog/imports/:id` | 600 / minute | 60 |

Rate limits are per token; mint additional tokens for separate workloads if you need more headroom.

### Rate-limit headers

Every API response includes:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 47
X-RateLimit-Reset: 1715000000
```

When you exceed the limit:

```
HTTP/1.1 429 Too Many Requests
Retry-After: 12
Content-Type: application/json

{
  "error": {
    "code": "rate_limited",
    "message": "Rate limit exceeded; retry after 12 seconds"
  }
}
```

Respect `Retry-After`. Repeated immediate retries can result in temporary token suspension.

## Error envelope

Non-2xx responses share this shape:

```json
{
  "error": {
    "code": "<machine-readable code>",
    "message": "<human-readable explanation>",
    "details": { ... }
  }
}
```

| HTTP | `code` | When |
| --- | --- | --- |
| 400 | `validation_failed` | Per-row validation errors; see `details.rejected[]` |
| 401 | `unauthenticated` | Missing or invalid bearer token |
| 403 | `forbidden` | Token lacks the required scope |
| 404 | `not_found` | The resource referenced doesn't exist in this tenant |
| 409 | `conflict` | Duplicate `external_id` within the same import |
| 413 | `payload_too_large` | Body exceeds 5 MB or 1,000 entries |
| 429 | `rate_limited` | Token exceeded its rate limit |
| 500 | `internal_error` | Server-side error; retry with backoff |
| 503 | `service_unavailable` | Maintenance or capacity event; retry later |

## Retry semantics

- **2xx**: success
- **400 / 401 / 403 / 404 / 409 / 413**: do **not** retry; fix the request
- **429**: respect `Retry-After`; retry after the specified delay
- **500 / 502 / 503**: retry with exponential backoff (e.g. 1s, 2s, 4s, 8s, capped at 60s)

Webhooks Mira sends out follow the same retry pattern — see [Replay & bidirectional sync](/mira/workflows/capture-and-route-leads/replay-and-bidirectional-sync/).

## Authentication errors

Two distinct cases:

- **`401 unauthenticated`** — token missing, malformed, or revoked. Re-mint or rotate.
- **`403 forbidden`** — token authenticated but lacks the scope. Check the token's scopes in **Settings → API tokens**; mint a new one with the right scope if needed.

## Related

- [Catalog ingestion API](/mira/developer-reference/catalog-ingestion-api/)
- [Webhook signing](/mira/developer-reference/webhook-signing/)
- [Replay & bidirectional sync](/mira/workflows/capture-and-route-leads/replay-and-bidirectional-sync/)
