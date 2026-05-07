---
title: Variant rotation & deliverability
description: Configure how the outbound agent rotates between approved variants based on observed performance, plus the deliverability guardrails that pause bad sequences.
---

This guide shows how the outbound agent picks variants over time and how to set deliverability guardrails.

## Variant rotation

The outbound agent rotates among approved variants based on observed signal. After enough opens, replies, and meetings have accrued, it weights toward variants that perform.

Rotation policy is tenant-set:

- **Equal split** — even distribution across approved variants until a clear winner emerges
- **Performance-weighted** — variants with higher reply / meeting rates get a larger share over time
- **Pinned** — manual selection; agent doesn't rotate

To configure:

1. Open **Settings → Outbound → Variant policy**.
2. Pick the policy and any thresholds.
3. Save.

The learning agent's variant attribution feeds the rotation decisions. See [Dashboards, cohorts & attribution](/mira/workflows/learn-from-outcomes/dashboards-cohorts-and-attribution/) for the visibility side.

## Deliverability guardrails

Mira monitors signals coming back from your ESP and pauses or throttles sequences that trip thresholds. Configure in **Settings → Outbound → Deliverability**:

| Signal | Default threshold | Action |
| --- | --- | --- |
| Bounce rate | > 5% in 24h | Pause sequence |
| Spam complaint rate | > 0.1% in 24h | Pause sequence + alert |
| Spam-trap hit | Any | Block the recipient permanently; alert |
| Open rate | < 5% in 7d | Warn (no auto-pause) |

When a guardrail trips, the sequence is paused and a notification fires to the configured admin channel. Resume manually after investigating.

## Suppression and throttling

- **Suppression list** — tenant-level do-not-contact list. Recipients added here are excluded from any sequence going forward.
- **Per-mailbox throttling** — respects the limits configured in your ESP. Mira queues and batches exports so you don't burn through warm-up budgets.

## Verify

- Open the **Outbound → Sequences** view; per-sequence performance shows current variant share, deliverability status, and recent signal.
- Trigger a test bounce (e.g., send to an invalid address); the sequence pauses if the threshold trips.

## Related

- [Draft from approved snippets](/mira/workflows/run-outbound-sequences/draft-from-approved-snippets/)
- [ESPs](/mira/integrations/esps/) — what signals the integration carries back
- [Dashboards, cohorts & attribution](/mira/workflows/learn-from-outcomes/dashboards-cohorts-and-attribution/) — performance visibility
