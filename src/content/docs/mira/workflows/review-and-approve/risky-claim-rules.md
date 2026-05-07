---
title: Risky-claim rules
description: Configure tenant-level rules that flag claims for explicit review — comparative claims, regulated-industry language, unsupported assertions.
---

This guide shows how to configure the rules that drive risky-claim flags during review.

## Before you start

- Admin role
- A list of language patterns or topics your team needs to flag (e.g., comparative claims against named competitors, regulated-industry jargon, unsupported quantitative assertions)

## Rule types

Mira ships with three kinds of rules:

- **Pattern rules** — regex or keyword lists (e.g., flag any mention of "FDA-approved")
- **Category rules** — pre-built bundles for compliance, healthcare, finance, marketing claims
- **Critique-pass thresholds** — the LLM's own critique pass returns a confidence score per section; flag below a tenant-set threshold

## Steps

1. Open **Settings → Risky-claim rules**.
2. Click **New rule**.
3. Pick a rule type and configure it.
4. Set severity: **warn** (visible flag, can accept with comment) or **block** (must be rewritten before approval).
5. Choose which sections the rule applies to (typically Positioning, Competitive angles, Landing-page copy).
6. Save.

## Accept-with-comment

Even `warn`-severity flags must be acknowledged. A reviewer can:

- **Rewrite** the claim until the flag clears, or
- **Accept with comment** — provide a justification that lands in the [audit log](/mira/administration/audit-log/) under `claim.accepted`

`block`-severity flags can't be accepted with comment — the claim must be rewritten.

## Verify

- Open a section in the workspace.
- Flagged claims show in the margin with the rule name and a hover-explanation.
- Approval is gated on every flag being addressed.

## Related

- [Multi-approver workflows](/mira/workflows/review-and-approve/multi-approver-workflows/)
- [Variants & risky-claim flags](/mira/workflows/generate-gtm-kits/variants-and-risky-claim-flags/) — reviewer-side experience
- [Audit log](/mira/administration/audit-log/) — where accepted-with-comment lands
