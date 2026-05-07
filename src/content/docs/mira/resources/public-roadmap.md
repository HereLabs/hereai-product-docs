---
title: Public roadmap
description: What we're working on now, what's next, and what's later. Updated weekly.
---

What's in flight, what's queued, and what's further out. Updated weekly.

:::note
Items here are not commitments; priorities can shift in response to customer signal. Anything **shipping** is captured in the [Changelog](/mira/resources/changelog/) instead.
:::

## Now (in flight)

- **Per-product autonomous outbound experiments.** The outbound agent currently rotates variants based on observed performance; we're adding bounded experiment design (pre-registered hypotheses, sample-size targets, automatic stopping) so variant testing produces statistically defensible results.
- **Workspace-side editor for risky-claim rules.** Today rules are configured via YAML in admin settings; bringing parity to a UI editor.
- **Granular cost telemetry per kit-section.** Today cost rolls up per-product; surfacing per-section so reviewers can trade off model strength per artifact type.

## Next (queued, ~next quarter)

- **HubSpot Deals support.** Currently Contact-only; Deals integration adds end-to-end pipeline visibility.
- **Markdown / MDX in landing-page templates.** Authors who want richer pages without a custom CSS build will be able to author in MDX directly.
- **A/B test orchestration UI.** Run formal A/B tests from the workspace, with statistical significance built in.
- **Granular audit-log filters and saved queries.** For SOC 2 and ISO 27001 audits.

## Later (no firm date)

- **LinkedIn ad creative drafts.** Approved messaging compiled into LinkedIn ad assets.
- **Voice / call-prep brief generation.** Per-prospect call briefs from the captured product context.
- **PIM connector for Akeneo and Salsify Channel Optimisation.**
- **Per-product autonomous agents for ICP refinement.** Agent surfaces ICP refinement proposals from outcome data; the human still approves.
- **SDK in Python and TypeScript.** When the API surface grows beyond what cURL covers comfortably.

## How priorities shift

Priorities respond to:

- **Pipeline volume per feature** — features that unblock pipeline jump the queue.
- **Security review feedback** — anything flagged for compliance shifts up.
- **Customer-direct asks** — Enterprise tenants can submit roadmap requests via support; tracked in the `mira-roadmap` Linear project.

## Related

- [Changelog](/mira/resources/changelog/) — what already shipped
- [Support & SLA](/mira/resources/support-and-sla/) — submit a feature request
