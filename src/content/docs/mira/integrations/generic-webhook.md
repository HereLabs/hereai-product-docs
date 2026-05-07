---
title: Generic webhook
description: Signed JSON-POST webhook for delivering captured leads to any system you operate, with HMAC-SHA256 signing, retry, and replay.
---

The generic webhook is Mira's fallback destination — a signed JSON POST to your endpoint. Use it when neither HubSpot nor Salesforce is your system of record.

:::tip[Capabilities]
- Signed JSON POST to any HTTPS endpoint
- HMAC-SHA256 signature with rotatable per-tenant secret
- Retry with exponential backoff up to 24 hours
- Replay from the delivery dashboard
- Same product context as the native integrations
:::

## Prerequisites

- A publicly reachable HTTPS endpoint that accepts POST requests
- The ability to verify HMAC-SHA256 signatures on incoming requests
- Mira **Admin** role on your tenant

## Setup

1. In Mira, open **Integrations → Generic webhook → Configure**.
2. Enter your endpoint URL (must be HTTPS).
3. Mira generates a signing secret. Copy it and store it securely on your side. The secret is shown once.
4. (Optional) Enable additional signing-secret rotation in **Settings → Integrations → Signing keys**.
5. (Optional) Mark as the default destination, or add specific [routing rules](/mira/workflows/capture-and-route-leads/routing-rules/) that target this webhook.

## Payload reference

```json
{
  "event": "lead.captured",
  "captured_at": "2026-05-06T12:34:56Z",
  "tenant_id": "tnt_…",
  "lead": {
    "email": "prospect@example.com",
    "name": "Jane Prospect",
    "company": "Acme Inc",
    "form": {
      "question": "Pricing for 50 seats?"
    }
  },
  "product": {
    "catalog_entry_id": "ce_…",
    "external_id": "sku-1234",
    "name": "Compliance Logs",
    "page_url": "https://gtm.acme.com/products/compliance-logs",
    "captured_positioning": "Audit-ready logging for SOC 2 …",
    "workspace_url": "https://yourtenant.mira.hereai.ai/workspace/products/ce_…"
  },
  "delivery": {
    "routing_event_id": "re_…",
    "attempt": 1
  }
}
```

## Signature verification

Each request carries:

```
X-Mira-Signature: sha256=<hex>
X-Mira-Timestamp: 2026-05-06T12:34:56Z
```

Verify on your side. Pseudo-code:

```
expected = hex(hmac_sha256(secret, raw_body))
provided = header[X-Mira-Signature].split("=", 1)[1]
if not constant_time_equal(expected, provided):
    return 401
if abs(now - parse(header[X-Mira-Timestamp])) > 5_minutes:
    return 401  # reject stale requests
```

Reject requests with mismatched signatures or stale timestamps.

## Response semantics

- **2xx**: Mira marks the routing event `delivered`.
- **4xx (except 429)**: Mira marks the event `failed` immediately and does not retry.
- **429**: respect `Retry-After` header; Mira backs off accordingly.
- **5xx**: retry with exponential backoff up to 24 hours.

## Verify with a test

1. Submit a test lead through any published landing page.
2. In Mira, **Capture & route → Delivery dashboard** shows the routing event.
3. On your endpoint side, verify:
   - The signature checks out
   - The timestamp is recent
   - The payload includes the product context

## Signing-key rotation

1. Open **Settings → Integrations → Signing keys → Rotate**.
2. Mira issues a new secret. Copy it.
3. The old secret remains valid for 24 hours so your endpoint can roll over.
4. After your endpoint is using the new secret, click **Revoke old**.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| All requests failing 401 | Signature mismatch | Confirm the secret matches and that you're hashing the raw body, not parsed JSON |
| All requests failing 5xx | Endpoint can't keep up | Mira retries; consider queueing on your side |
| Some requests failing | Replay window stale | Your clock is out of sync; install NTP |

## Related

- [Capture & route leads](/mira/workflows/capture-and-route-leads/)
- [Replay & bidirectional sync](/mira/workflows/capture-and-route-leads/replay-and-bidirectional-sync/)
- [HubSpot](/mira/integrations/hubspot/) and [Salesforce](/mira/integrations/salesforce/) — native alternatives
