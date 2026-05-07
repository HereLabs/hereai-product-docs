---
title: ESPs (Outreach, Salesloft, Apollo, custom)
description: Mailbox / ESP integration for outbound sequences — Mira owns sequencing logic; your existing tool owns sending.
---

Mira's outbound sequences integrate with your existing mailbox or ESP. Mira owns the sequencing logic, variant selection, and personalization; your ESP owns sending.

:::tip[Capabilities]
- Native integration with Outreach, Salesloft, Apollo
- Custom SMTP-based tools via a generic export format
- Per-product personalization rendered at export time
- Reply / open / bounce signals flow back into Mira
- Deliverability guardrails pause sequences that trip thresholds
:::

## What Mira does NOT do

- SMTP / IP infrastructure
- Inbox warming
- Mailbox provisioning
- Deliverability across cold IPs

You keep your sending stack.

## Outreach

### Prerequisites

- An Outreach account on Standard or higher
- A user with **Admin** role
- Mira **Admin** role

### Setup

1. **Integrations → ESPs → Outreach → Connect**.
2. Authorize via Outreach OAuth.
3. Pick a default mailbox / sender for exports. You can override per sequence.
4. Map deliverability signals (Outreach uses bounce + complaint events natively).

### What flows out

A Mira sequence becomes an Outreach sequence with one step per Mira step. Tokens render server-side at export time:

- `{{product_name}}` → catalog entry's product name
- `{{captured_pillar}}` → the messaging pillar that drove the visitor
- `{{competitor}}` → the named competitor relevant to the prospect

### What flows back

- Open / reply rates per step (per variant)
- Meeting bookings (when Outreach's calendar features are enabled)
- Bounce + complaint events (drives [deliverability guardrails](/mira/workflows/run-outbound-sequences/variant-rotation-and-deliverability/))

## Salesloft

### Prerequisites

- A Salesloft account on Advanced or higher (required for cadence API)
- An Admin user
- Mira **Admin** role

### Setup

1. **Integrations → ESPs → Salesloft → Connect**.
2. Authorize via Salesloft OAuth.
3. Pick a default cadence team and sender mailbox.

### What flows out / back

Mira sequences become Salesloft cadences. Step-level metrics (delivered, opened, replied, bounced) flow back the same way as Outreach.

## Apollo

### Prerequisites

- An Apollo account on Professional or higher
- An Admin user
- Mira **Admin** role

### Setup

1. **Integrations → ESPs → Apollo → Connect**.
2. Authorize via Apollo API key.
3. Pick a default mailbox.

Apollo's metric coverage is similar to Outreach and Salesloft.

## Custom SMTP / generic ESP

For tools without a native integration:

1. **Integrations → ESPs → Custom → Configure**.
2. Pick **CSV export** (you import into your tool) or **JSON push** (your tool pulls or accepts a webhook).
3. For JSON push, configure the destination URL and signing secret (same shape as the [generic webhook](/mira/integrations/generic-webhook/)).
4. Map the inbound metric format your tool uses (open/reply/bounce events) onto Mira's normalized signals.

## Common: deliverability signal mapping

Regardless of provider, signals normalize to:

| Mira signal | Triggered by |
| --- | --- |
| `delivered` | Provider confirms inbox delivery |
| `opened` | Pixel-tracked open or provider-reported open |
| `clicked` | Tracked link click |
| `replied` | Reply received (provider-side detection) |
| `meeting_booked` | Calendar booking (where supported) |
| `bounced` | Hard bounce |
| `complained` | Spam complaint |
| `spam_trap_hit` | Provider-flagged spam trap |

## Verify

1. Configure one sequence and approve it.
2. Export to your ESP.
3. Send to a single test address you control.
4. Open the test message; reply to it.
5. Within a minute, **Outbound → sequence detail** in Mira reflects the open and reply.

## Troubleshooting

- **Export fails** — provider API rate limit; retry; if persistent, check your provider's API quota.
- **Tokens don't render** — ensure the catalog entry has the source field the token references; otherwise tokens fall back to the empty string and a warning is logged.
- **Signals not flowing back** — webhook subscription on the provider side wasn't created; click **Repair** in integration settings.

## Related

- [Run outbound sequences](/mira/workflows/run-outbound-sequences/)
- [Draft from approved snippets](/mira/workflows/run-outbound-sequences/draft-from-approved-snippets/)
- [Variant rotation & deliverability](/mira/workflows/run-outbound-sequences/variant-rotation-and-deliverability/)
