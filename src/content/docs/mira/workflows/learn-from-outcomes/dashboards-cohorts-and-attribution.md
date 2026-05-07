---
title: Dashboards, cohorts & attribution
description: Per-product dashboards, cohort comparison, narrative-variant attribution, CSV export, and threshold alerts.
---

This guide shows how to navigate the analytics views, compare cohorts, and read variant attribution.

## Before you start

- At least one published landing page receiving traffic
- Optional: bidirectional CRM sync configured (for stage-progression metrics)

## Per-product dashboard

For each product the dashboard shows:

- **Imports**, **approvals**, **pages published** — workflow throughput
- **Visits**, **form fills**, **conversion rate** — top-of-funnel signal
- **Routed leads** and routing success rate — delivery health
- **Replies**, **meetings**, **CRM stage progression** — outcome signal (requires bidirectional sync)
- **Cost** — AI generation + page hosting amortized

Drill from the catalog-level summary into a specific product to see its history.

## Time-range filters

The dashboard scopes to:

- Last 7 / 30 / 90 / 365 days
- Custom range
- Tag-based filters (product line, segment, owner)

Saved views remember your filter set per user.

## Cohort comparison

Compare cohorts of products to test whether a change moved the needle:

1. Open **Learn → Cohort comparison**.
2. Define cohort A — for example, products launched in week of 2026-04-15.
3. Define cohort B — for example, products launched in week of 2026-04-22.
4. Pick the metrics to compare (visits, fills, replies, conversion).

Common cohort tests:

- Same product line, different launch weeks
- Same launch week, different prompt-template versions
- Same product, before and after a positioning rewrite

## Narrative-variant attribution

For products with [side-by-side variants](/mira/workflows/generate-gtm-kits/variants-and-risky-claim-flags/):

1. Open the product detail page.
2. Click **Variants → Attribution**.
3. The view shows each variant's traffic share and per-variant metrics.

The [learning agent](/mira/concepts/agents/#learning-agent) uses this attribution to propose which variants to keep, retire, or experiment with next. Proposals appear in the workspace; you decide whether to act on them.

## CSV export

Any metric table — dashboard, cohort comparison, attribution — has an **Export CSV** button. Use for offline analysis or board reporting.

## Threshold alerts

Set alerts on metrics in **Settings → Alerts**:

- Delivery success rate drops below 99%
- Form-fill conversion rate drops below tenant-set baseline
- Cost per product exceeds a budget

Alerts fire to the configured admin channel.

## Verify

- The dashboard updates within a minute of a real event (visit, form fill, CRM stage change).
- A CSV export matches the on-screen totals.

## Related

- [Agents](/mira/concepts/agents/) — the learning agent that consumes this data
- [Variants & risky-claim flags](/mira/workflows/generate-gtm-kits/variants-and-risky-claim-flags/) — variant generation
- [Replay & bidirectional sync](/mira/workflows/capture-and-route-leads/replay-and-bidirectional-sync/) — what feeds CRM stage metrics
