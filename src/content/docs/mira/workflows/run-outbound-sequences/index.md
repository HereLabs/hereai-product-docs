---
title: Run outbound sequences
description: The outbound agent turns approved messaging into channel-ready sequences with variant rotation and deliverability guardrails — your mailbox or ESP does the actual sending.
---

Outbound takes approved messaging and turns it into ready-to-send sequences. The [outbound agent](/mira/concepts/agents/#outbound-agent) drafts variants, rotates them based on observed performance, and watches deliverability — but never owns the sending infrastructure.

## How it works

Once an outbound snippet is approved, the outbound agent can build a sequence: a multi-step email cadence with per-product personalization. Sequences are exported to your mailbox or ESP, where sending happens.

The agent monitors:

- Open / reply / meeting rates per variant
- Bounce, complaint, and spam-trap signals
- Throttling and suppression rules

If guardrails trip (e.g. bounce rate spikes), the agent throttles or pauses the sequence and flags it in the workspace.

## Capabilities

- **Sequence drafts** from approved outbound snippets, with per-product personalization
- **Variant rotation** based on observed open / reply / meeting rates
- **Deliverability guardrails** — bounce / complaint thresholds, spam-trap detection, automatic throttling
- **Suppression** lists at the tenant level (do-not-contact)
- **Reply tracking** — replies routed back into the workspace and into your CRM
- **Throttling** — per-mailbox sending limits respected

For ESP integration setup (Outreach, Salesloft, Apollo, custom), see [ESPs](/mira/integrations/esps/).

## Workflow

```
1. Approve outbound snippets in the workspace
2. Outbound agent drafts a multi-step sequence
3. You review and approve the sequence
4. Sequence exported to your ESP / mailbox tool
5. Customer activates it; sending happens there
6. Reply, open, bounce, complaint signals flow back to Mira
7. Outbound agent rotates variants and adjusts throttling
```

## What Mira does NOT own

- SMTP / IP infrastructure
- Inbox warming
- Mailbox provisioning
- Deliverability across cold IPs

Mira owns the **sequencing logic**, **variant selection**, and **personalization**. You keep your sending stack.

## Related

- [Review & approve](/mira/workflows/review-and-approve/) — what gates outbound copy
- [Agents](/mira/concepts/agents/) — the outbound agent's trust contract
- [ESPs](/mira/integrations/esps/) — mailbox / ESP integration setup
- [Learn from outcomes](/mira/workflows/learn-from-outcomes/) — sequence performance attribution
