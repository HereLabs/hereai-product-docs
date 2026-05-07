---
title: Draft from approved snippets
description: Turn approved outbound snippets into a multi-step sequence with per-product personalization, ready to export to your ESP.
---

This guide shows how to build an outbound sequence from approved snippets.

## Before you start

- A product with the **Outbound snippets** section approved
- Editor role
- Your [ESP integration](/mira/integrations/esps/) configured (Outreach, Salesloft, Apollo, or custom)

## Steps

1. Open the product's detail page.
2. Click **Outbound → New sequence**.
3. The [outbound agent](/mira/concepts/agents/#outbound-agent) drafts a multi-step sequence from your approved snippets. Default: 3 steps with day-2 / day-5 / day-10 cadence. You can adjust step count and cadence before continuing.
4. Each step includes per-product personalization tokens (`{{product_name}}`, `{{captured_pillar}}`, `{{competitor}}`). The agent picks tokens that fit the snippet.
5. Review each step. Edit inline if needed; edits create a new sequence version (same versioning rules as kits).
6. Click **Approve** when ready. Approval is required before export.
7. Click **Export to ESP**. Pick the destination, the sender mailbox or list, and confirm.

The export converts the sequence into your ESP's native format (a sequence in Outreach, a cadence in Salesloft, a sequence in Apollo, or a CSV for custom SMTP setups).

## Verify

- The sequence shows in your ESP under the configured account.
- Per-step personalization tokens render correctly when you preview a recipient.

## What stays in Mira

- Sequence definition + version history
- Approval state per step
- The link back from sent messages → variants → analytics

What lives in your ESP:

- Recipient lists
- Send-time scheduling
- Mailbox warming and IP reputation
- The actual sending

## Related

- [Variant rotation & deliverability](/mira/workflows/run-outbound-sequences/variant-rotation-and-deliverability/)
- [ESPs](/mira/integrations/esps/) — destination integration setup
- [Review & approve](/mira/workflows/review-and-approve/) — the same approval model applies to sequences
