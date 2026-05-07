---
title: Replay & bidirectional sync
description: Recover from delivery failures with replay; pull CRM stage changes back into Mira so the learning agent can attribute conversion.
---

This guide shows how to replay failed deliveries and how bidirectional CRM sync feeds outcomes back into Mira.

## Replay failed deliveries

When a webhook delivery fails (non-2xx response), Mira retries with exponential backoff for up to 24 hours. After the retry budget is exhausted, the routing event is marked **failed** and an alert fires.

To replay:

1. Open **Capture & route → Delivery dashboard**.
2. Filter by **Status: failed**.
3. (Optional) Drill into a failure to see the last response and error message.
4. Fix the underlying issue at your destination.
5. Click **Replay** on a single event, or select multiple and **Bulk replay**.

Replays go through the same routing rules and signing as the original delivery. If a replay succeeds, the event moves to **delivered**.

## Webhook signing

Outbound webhooks (HubSpot, Salesforce, generic) are signed with HMAC-SHA256 using your tenant's signing secret. Verify the `X-Mira-Signature` header on your side before processing:

```
X-Mira-Signature: sha256=<hex>
```

Compute the expected signature server-side as `hmac_sha256(secret, raw_body)` and compare in constant time. If signatures don't match, reject the request.

Per-tenant signing keys are rotatable in **Settings → Integrations → Signing keys**. Rotation issues a new key; the old key remains valid for 24 hours so your endpoint can roll over.

## Bidirectional sync

For HubSpot and Salesforce, status changes flow back into Mira:

- `lead → MQL → SQL → opportunity stage → won/lost`
- The corresponding catalog entry's metrics update
- The [learning agent](/mira/concepts/agents/#learning-agent) uses these signals to attribute conversion to the variants that produced it

Bidirectional sync runs continuously; latency from CRM event to Mira's view is typically under a minute.

## Verify

- After replaying a failed event, the destination shows the inbound write.
- After a CRM stage change, **Learn from outcomes → per-product metrics** updates within a minute.

## Related

- [Routing rules](/mira/workflows/capture-and-route-leads/routing-rules/)
- [Dashboards, cohorts & attribution](/mira/workflows/learn-from-outcomes/dashboards-cohorts-and-attribution/)
- [Generic webhook](/mira/integrations/generic-webhook/) — signature verification
