---
title: Support & SLA
description: How to reach Mira support, response-time SLAs by plan, severity definitions, and incident notification.
---

How to reach Mira support, expected response times by plan, and what to do during incidents.

## Channels

| Channel | What for |
| --- | --- |
| **Email** — `support@mira.app` | Most things; tickets are the canonical record |
| **Shared Slack** (Enterprise) | Real-time questions and incident triage |
| **Status page** — `status.mira.app` | Real-time service status, incident timeline, scheduled maintenance |
| **In-app help** | Quick self-serve docs lookup; opens a ticket if it doesn't resolve |

For security incidents, prefer email so the response chain is documented from minute zero.

## Severity

| Severity | Definition | Examples |
| --- | --- | --- |
| **S1** | Service down, data at risk, multiple tenants affected | Workspace inaccessible; webhooks not delivering at all |
| **S2** | Major function impaired for one tenant | Generation failing; specific integration not delivering |
| **S3** | Minor function impaired | UI glitch; slow page load; one routing rule misbehaving |
| **S4** | Question or feature request | "How do I…"; feature suggestions |

## Response-time SLAs

| Plan | S1 | S2 | S3 | S4 |
| --- | --- | --- | --- | --- |
| Pilot | 4h | 1 business day | 3 business days | Best effort |
| Growth | 1h | 4h business hours | 1 business day | 3 business days |
| **Enterprise** | 30m, 24×7 | 2h, 24×7 | 1 business day | 3 business days |

Response time = time-to-acknowledge, not time-to-resolve. Resolution times depend on root cause; we'll communicate progress at least every 4h on S1 and once per business day on S2.

## Incident notification

If Mira detects an incident affecting your tenant:

1. The status page updates within minutes.
2. Customers are notified via email and (Enterprise) Slack within 15m of detection for S1, 1h for S2.
3. Hourly progress updates until resolution.
4. A post-incident review (PIR) is shared within 5 business days for S1 and S2 incidents.

Security incidents follow the breach-notification timeline in [GDPR](/mira/security/gdpr/#breach-notification).

## Feature requests

File feature requests via support email; tracked in the `mira-roadmap` project. Enterprise tenants can also request roadmap reviews on a quarterly cadence.

## Documentation feedback

Spotted a doc bug? Email `docs@mira.app` with the URL and the issue. Most fixes ship the same day.

## Related

- [Changelog](/mira/resources/changelog/) — what's shipped
- [Public roadmap](/mira/resources/public-roadmap/) — what's coming
- [Subprocessors](/mira/security/subprocessors/) — third parties we depend on
