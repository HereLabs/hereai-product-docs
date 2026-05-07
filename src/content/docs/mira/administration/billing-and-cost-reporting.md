---
title: Billing & cost reporting
description: Per-tenant cost dashboard, usage breakdowns, plan limits, and threshold alerts.
---

Mira tracks AI generation cost, page hosting, and routing volume per tenant.

## What's tracked

- **AI generation cost** by agent (generation, outbound, learning) and by underlying model
- **Pages hosted** — count of published landing pages and their bandwidth
- **Routed leads** — count of webhook deliveries
- **Per-product cost** — generation + hosting + routing amortized across each product

## Dashboard

Open **Settings → Billing → Cost dashboard**. Filter by:

- Time range (this billing cycle, last 30 / 90 / 365 days, custom)
- Cost driver (generation, hosting, routing)
- Product / tag

The dashboard shows current cycle usage vs plan limit and projected end-of-cycle usage.

## Plan limits

Each plan has limits on:

- **Active products** (catalog entries with at least one approved kit)
- **Monthly generations** (per kit and per regen)
- **Routed leads per month**
- **Hosted pages**

Approaching a limit triggers a warning notification; exceeding triggers a soft block on the relevant action (no surprise overage charges).

## Threshold alerts

Configure alerts in **Settings → Billing → Alerts**:

- Cost in the current cycle exceeds X
- Cost projection for the cycle exceeds X
- Per-product cost exceeds X
- Variant rotation cost spike (sudden change vs baseline)

Alerts fire to the tenant's configured admin channel.

## CSV export

Any cost view exports as CSV for offline analysis or upstream reporting.

## Related

- [Roles & permissions](/mira/administration/roles-and-permissions/) — who can view billing
- [Audit log](/mira/administration/audit-log/) — billing-affecting actions are recorded
