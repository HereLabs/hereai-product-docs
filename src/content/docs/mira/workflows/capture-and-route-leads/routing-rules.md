---
title: Routing rules
description: Configure rules that decide which CRM destination handles each captured lead — by product line, segment, region, or tag.
---

This guide shows how to configure the rules that route captured leads to specific destinations.

## Before you start

- At least one [destination](/mira/integrations/) configured (HubSpot, Salesforce, or generic webhook)
- Admin role

## Rule shape

Each rule has:

- **Match condition** — one or more of:
  - Product line / category
  - Tag combinations (e.g., `tag: enterprise AND tag: emea`)
  - Region (derived from form fields or IP geolocation)
  - Segment (custom-field driven)
- **Destination** — one of the configured integrations
- **Override behavior** — what to do when multiple rules match (default: first-match wins)

## Steps

1. Open **Settings → Routing rules**.
2. Click **New rule**.
3. Set the match condition. The rule editor previews how many of your existing leads from the last 30 days would have matched.
4. Pick the destination.
5. Set rule priority. Rules are evaluated top-to-bottom; the first match wins.
6. Save.

## Default destination

A default destination handles any lead that no rule matches. Set this in **Settings → Routing rules → Default destination**. Without one, unmatched leads land in a quarantine queue for manual triage.

## Verify

- Submit a test form on a page that should match your rule.
- Check the delivery dashboard within seconds — the rule that matched is shown next to the routing event.
- The destination receives the webhook with the right payload.

## Multi-pod routing

A common pattern: route by product line so each sales pod sees leads tagged for them.

- Rule 1: `category = compliance` → HubSpot pipeline `compliance-pod`
- Rule 2: `category = data` → HubSpot pipeline `data-pod`
- Default: HubSpot pipeline `general`

The product context attached to each lead lets reps see what the prospect cared about before opening the record.

## Related

- [Replay & bidirectional sync](/mira/workflows/capture-and-route-leads/replay-and-bidirectional-sync/) — recovering from failed deliveries
- [HubSpot](/mira/integrations/hubspot/), [Salesforce](/mira/integrations/salesforce/), [Generic webhook](/mira/integrations/generic-webhook/) — destination setup
