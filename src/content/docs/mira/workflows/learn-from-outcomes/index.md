---
title: Learn from outcomes
description: Per-product, per-narrative performance — visits, form fills, replies, meetings, CRM stages, plus narrative-variant attribution and CSV export.
---

Analytics surfaces what's working, by product, by narrative, by channel. The same data feeds the [learning agent](/mira/concepts/agents/#learning-agent), which uses it to propose narrative changes for the next generation pass.

## How it works

Mira records metric events at every step:

- **Page visits** when a published landing page is loaded
- **Form fills** when a capture form is submitted
- **Routing** events (delivered, retrying, failed)
- **Replies** to outbound sequences
- **Meetings** booked (via CRM sync)
- **CRM stage transitions** (lead → MQL → SQL → opportunity → won/lost)
- **Approval** and **publish** events for workflow visibility

Events are time-series and indexed by tenant, product, and narrative variant.

## Per-product metrics

For each product:

- Imports, approvals, pages published
- Visits, form fills, conversion rate
- Routed leads (and routing success rate)
- Replies, meetings, CRM stage progression
- Cost: AI generation + page hosting amortized

## Cohort comparison

Compare cohorts of products: products launched in week X vs week Y, products in line A vs line B, narratives generated with prompt template v1 vs v2. Useful for measuring whether a change actually moved the needle.

## Narrative-variant attribution

For products with side-by-side variants, Mira attributes conversion back to the specific variant that produced it. The learning agent uses this to propose which variants to keep, which to retire, and what to try next.

## Capabilities

- **Time-range filters** (last 7 / 30 / 90 / 365 days, custom)
- **Tag filters** (product line, segment, owner)
- **Drill-down** from catalog-level summary to per-product detail
- **CSV export** of any metric table
- **Saved views** per user
- **Threshold alerts** (e.g. delivery success rate drops below 99%)

## Workflow

```
1. Filter the dashboard for the time window you care about
2. Identify outliers (high visits + low form fills, or high form fills + low CRM progression)
3. Drill into the product
4. Inspect variants; see attribution
5. Either iterate manually or accept a learning-agent proposal
6. Re-generate and re-approve
7. Compare next cohort vs previous
```

## Related

- [Agents](/mira/concepts/agents/) — the learning agent that consumes this data
- [Capture & route leads](/mira/workflows/capture-and-route-leads/) — bidirectional sync that feeds CRM-stage metrics
