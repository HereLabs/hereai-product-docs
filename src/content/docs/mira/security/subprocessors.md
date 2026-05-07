---
title: Subprocessors
description: Every third-party processor in Mira's data path, what they touch, and where they're hosted.
---

Mira uses a small number of subprocessors. Each is documented below with the data they touch and their hosting region. The list is updated when subprocessors change; tenants on the **Enterprise** plan are notified 30 days in advance.

## Hosting & infrastructure

| Subprocessor | Purpose | Data | Region |
| --- | --- | --- | --- |
| **AWS** | Application hosting, database, object storage, backups | All tenant data at rest and in transit | US (`us-east-1`) by default; EU (`eu-west-1`) for EU-residency tenants |
| **Cloudflare** | CDN, DDoS protection, Access policy gating, public-page edge serving | TLS termination for public pages and admin UI | Global edge with regional cache pinning where required |

## LLM provider

| Subprocessor | Purpose | Data |
| --- | --- | --- |
| **OpenAI** | LLM for all agent calls (generation, outbound, learning) | The catalog entry and prompt templates for the current job; the model returns generated text |

The LLM is managed centrally by Mira; tenants don't configure providers. For tenants on **EU data residency**, Mira routes through OpenAI's EU endpoint automatically. See [Agent boundaries](/mira/security/agent-boundaries/) for the per-job sandbox controlling what the LLM can see.

## Email & messaging

| Subprocessor | Purpose | Data |
| --- | --- | --- |
| **Postmark** | Transactional email (sign-in links, alerts, account events) | Recipient email, message body |
| **Customer's ESP** (Outreach, Salesloft, Apollo, custom SMTP) | Outbound sequences | Outbound copy, recipient lists — held by the ESP, not Mira |

## Observability

| Subprocessor | Purpose | Data |
| --- | --- | --- |
| **Datadog** | Application metrics, traces | Aggregated metrics, request traces with PII redacted |
| **Sentry** | Error monitoring | Exception traces with PII redacted |

## Adding a subprocessor

When Mira adds a new subprocessor:

1. The change is announced 30 days in advance to Enterprise tenants.
2. Tenants can object; if objection isn't resolvable, the contract terms apply.
3. The subprocessor is added to this page on the effective date.

## Removing or replacing

Subprocessor removals or replacements follow the same 30-day notice. Replacements that change data scope materially require renewed DPA.

## Related

- [Data handling & retention](/mira/security/data-handling-and-retention/)
- [GDPR](/mira/security/gdpr/) — lawful basis and SCCs for cross-border transfers
- [Agent boundaries](/mira/security/agent-boundaries/) — the sandbox the LLM provider sits inside
