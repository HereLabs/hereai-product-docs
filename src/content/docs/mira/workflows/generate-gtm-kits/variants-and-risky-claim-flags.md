---
title: Variants & risky-claim flags
description: Generate side-by-side variants for narrative experiments, address risky-claim flags, and use comment threads for review.
---

This guide shows how to generate multiple variants of a section for experimentation, and how to handle risky-claim flags when reviewing.

## Side-by-side variants

For products where you want to A/B narratives:

1. Open a section.
2. Click **Generate variant**. Mira generates a new variant alongside the existing draft (not replacing it).
3. Review both variants side by side.
4. Approve the variant you want to ship; reject the other.

After publishing, the [learning agent](/mira/concepts/agents/#learning-agent) attributes performance back to the variant that produced it. See [Dashboards, cohorts & attribution](/mira/workflows/learn-from-outcomes/dashboards-cohorts-and-attribution/) for what that looks like.

## Risky-claim flags

The generation agent runs each section through a critique pass and tenant-configurable [risky-claim rules](/mira/workflows/review-and-approve/risky-claim-rules/). Flagged claims show a warning marker in the section editor.

For each flag:

1. Hover the flag to see the rule that triggered it and an explanation.
2. Either:
   - **Rewrite** the claim and remove the flag, or
   - **Accept with comment** — provide a justification that lands in the [audit log](/mira/administration/audit-log/)

Flagged claims must be addressed before the section can be approved.

## Comment threads

For multi-reviewer collaboration:

1. Highlight any text in a section.
2. Click **Comment**.
3. Other reviewers can reply. Threads stay tied to the version they were left on.

Resolved threads are archived but recoverable from the section's history.

## Related

- [Risky-claim rules](/mira/workflows/review-and-approve/risky-claim-rules/) — how rules are configured
- [Multi-approver workflows](/mira/workflows/review-and-approve/multi-approver-workflows/) — inviting legal and brand reviewers
- [Dashboards, cohorts & attribution](/mira/workflows/learn-from-outcomes/dashboards-cohorts-and-attribution/) — variant performance
