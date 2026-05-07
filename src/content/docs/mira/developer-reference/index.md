---
title: Developer reference
description: The integrator-facing API surface — webhook payload formats, the catalog ingestion API, signing, rate limits, and error semantics.
---

The Developer reference covers the small but real surface Mira exposes to integrators. It's intentionally narrow: catalog ingestion in, signed webhooks out. Most of the product is workspace-driven; this section is what you need when you're wiring Mira into systems you operate.

## What's in this section

- **[Webhook payload formats](/mira/developer-reference/webhook-payload-formats/)** — JSON schemas Mira sends out for lead-captured, lead-routed, and CRM-stage events.
- **[Catalog ingestion API](/mira/developer-reference/catalog-ingestion-api/)** — push catalog entries programmatically.
- **[Webhook signing](/mira/developer-reference/webhook-signing/)** — HMAC-SHA256 verification details.
- **[Rate limits & errors](/mira/developer-reference/rate-limits-and-errors/)** — limits per endpoint, error response shape, retry semantics.

## What's NOT here

- A general-purpose REST API for catalog reads, kit reads, or workspace operations. Those surfaces are workspace + UI; deep-link integrations should use the [generic webhook](/mira/integrations/generic-webhook/) for outbound, [JSON ingestion](/mira/developer-reference/catalog-ingestion-api/) for inbound, and [SCIM](/mira/integrations/scim/) for users.
- SDKs in Python, TypeScript, Go, etc. The surface is small enough that cURL examples cover the realistic integration paths.

## Related

- [Generic webhook](/mira/integrations/generic-webhook/) — the integration that uses the payload formats
- [Capture & route leads](/mira/workflows/capture-and-route-leads/) — the workflow generating the payloads
