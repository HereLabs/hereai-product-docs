---
title: Webhook payload formats
description: JSON schemas for the webhooks Mira sends — lead.captured, lead.routed, and crm.stage_changed.
---

Mira emits three webhook event types. All payloads are JSON, signed with HMAC-SHA256 (see [Webhook signing](/mira/developer-reference/webhook-signing/)).

## Common envelope

Every event shares the top-level shape:

```json
{
  "event": "<event-name>",
  "captured_at": "2026-05-06T12:34:56Z",
  "tenant_id": "tnt_…",
  "delivery": {
    "routing_event_id": "re_…",
    "attempt": 1
  },
  "<event-specific keys>": …
}
```

Headers:

```
Content-Type: application/json
X-Mira-Event: <event-name>
X-Mira-Signature: sha256=<hex>
X-Mira-Timestamp: <iso-8601>
```

## `lead.captured`

Fired when a visitor submits a form on a published landing page.

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
    },
    "lawful_basis": "consent"
  },
  "product": {
    "catalog_entry_id": "ce_…",
    "external_id": "sku-1234",
    "name": "Compliance Logs",
    "page_url": "https://gtm.acme.com/products/compliance-logs",
    "captured_positioning": "Audit-ready logging for SOC 2 …",
    "workspace_url": "https://yourtenant.mira.app/workspace/products/ce_…"
  },
  "delivery": {
    "routing_event_id": "re_…",
    "attempt": 1
  }
}
```

## `lead.routed`

Fired after a `lead.captured` is dispatched to its destination. Useful when your downstream system isn't the receiving destination but wants to record routing decisions.

```json
{
  "event": "lead.routed",
  "captured_at": "2026-05-06T12:34:57Z",
  "tenant_id": "tnt_…",
  "lead_id": "ld_…",
  "destination": {
    "type": "hubspot",
    "name": "HubSpot — Compliance Pod"
  },
  "rule_matched": "compliance-products-to-compliance-pod",
  "delivery": {
    "routing_event_id": "re_…",
    "attempt": 1
  }
}
```

## `crm.stage_changed`

Fired when a synced CRM (HubSpot or Salesforce) reports a stage transition for a lead Mira routed.

```json
{
  "event": "crm.stage_changed",
  "captured_at": "2026-05-08T09:01:23Z",
  "tenant_id": "tnt_…",
  "lead_id": "ld_…",
  "from_stage": "MQL",
  "to_stage": "SQL",
  "crm": {
    "type": "salesforce",
    "record_id": "00Q…"
  },
  "delivery": {
    "routing_event_id": "re_…",
    "attempt": 1
  }
}
```

## Versioning

Payload shapes are stable per major version (currently `v1`). Additions are non-breaking; removals or renames trigger a major bump and 6-month migration notice via the [changelog](/mira/resources/changelog/).

## Related

- [Webhook signing](/mira/developer-reference/webhook-signing/)
- [Generic webhook](/mira/integrations/generic-webhook/) — the destination shape
- [Rate limits & errors](/mira/developer-reference/rate-limits-and-errors/)
