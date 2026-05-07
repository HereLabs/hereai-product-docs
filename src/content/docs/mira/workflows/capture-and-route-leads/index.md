---
title: Capture & route leads
description: Forms on landing pages capture intent, validate, dedupe, and route to your CRM with full product context attached. HubSpot, Salesforce, generic webhook, retry, and bidirectional sync.
---

Every published landing page can include a capture form. Submissions become tenant-scoped leads with product context attached, then route to your CRM with retry and bidirectional sync.

## How capture works

When a visitor submits a form on a Mira-hosted page:

1. Input is validated (required fields, format checks).
2. Mira dedupes against the last N days (configurable per tenant) using email + tenant.
3. A lead record is persisted with full form data plus product context.
4. A form-fill metric event is recorded for [analytics](/mira/workflows/learn-from-outcomes/).
5. The routing engine fires.

The whole flow takes seconds.

## Capture capabilities

- **Configurable form fields** per page: name, email, company, optional question
- **Validation** at submission with inline error messages
- **Dedupe windows** configurable per tenant (default: 7 days)
- **GDPR-aware fields** — lawful basis, opt-in checkbox, data-retention disclosure
- **Lead enrichment hooks** for plugged-in enrichment services
- **Spam protection** via rate limiting and optional CAPTCHA

## Lead context

Every lead carries the product context that captured it:

- Catalog entry id and product name
- Published page URL
- The version of each artifact section the visitor saw
- Captured positioning excerpt (for sales handoff)

This context flows into the CRM webhook, so reps know what the prospect cared about before the first call.

## Routing engine

The routing engine selects a destination based on tenant-configured rules and emits a webhook with the lead payload. Delivery is retried with exponential backoff; failures surface in a delivery dashboard.

For destination setup (HubSpot, Salesforce, generic webhook), see [Integrations](/mira/integrations/hubspot/).

### Routing rules

Configure rules per:

- Product line (route compliance products to the compliance pod)
- Segment (mid-market vs enterprise)
- Region
- Tag combinations

Rules are evaluated in order; the first match wins. A default destination handles unmatched leads.

### Bidirectional sync

For HubSpot and Salesforce, status changes (lead → MQL → SQL → opportunity stage, won/lost) flow back into Mira. The [learning agent](/mira/concepts/agents/#learning-agent) uses these signals to attribute conversion to the variants that produced it.

### Routing capabilities

- **Retry with exponential backoff** up to 24 hours
- **Webhook signing** with shared secret per tenant (HMAC-SHA256)
- **Per-tenant signing keys** rotatable on demand
- **Delivery dashboard**: success, failure, retry, last error
- **Replay**: re-send failed routing events after fixing the destination
- **Alerting** when delivery success rate drops below a threshold

## Workflow

```
1. Visitor lands on a published page
2. Visit metric event recorded
3. Visitor fills form, submits
4. Validation runs
5. Dedupe check
6. Lead record persisted with product context
7. Routing rules evaluated, destination selected
8. Webhook fired
9. On 2xx: marked delivered. On non-2xx: retry with backoff
10. After retry budget: marked failed, alert raised
```

## Related

- [Publish landing pages](/mira/workflows/publish-landing-pages/) — where forms live
- [HubSpot](/mira/integrations/hubspot/) / [Salesforce](/mira/integrations/salesforce/) / [Generic webhook](/mira/integrations/generic-webhook/) — destination setup
- [Learn from outcomes](/mira/workflows/learn-from-outcomes/) — delivery success and outcome attribution
