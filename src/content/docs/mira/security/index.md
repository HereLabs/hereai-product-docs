---
title: Security & trust
description: How Mira protects tenant data and contains the risk of generative AI — tenant isolation, agent boundaries, data handling, GDPR posture, and subprocessors.
---

Mira processes customer product data and generates customer-facing copy with external LLMs. Both responsibilities require explicit boundaries. This section documents the boundaries and how Mira enforces them.

## What's in this section

- **[Tenant isolation](/mira/security/tenant-isolation/)** — how tenants stay out of each other's data, with platform-layer enforcement and a continuous canary test.
- **[Agent boundaries](/mira/security/agent-boundaries/)** — the per-job sandbox, allowlist contract, and human-approval gate that contain the blast radius of bad LLM output.
- **[Data handling & retention](/mira/security/data-handling-and-retention/)** — encryption at rest and in transit, retention windows, backups.
- **[GDPR](/mira/security/gdpr/)** — DPA, lawful basis, data-subject rights, EU data residency.
- **[Subprocessors](/mira/security/subprocessors/)** — every third-party processor in the data path, with what they touch.

## Related

- [Multi-tenancy & isolation](/mira/concepts/multi-tenancy-and-isolation/) — the conceptual model
- [How AI generation is sandboxed](/mira/concepts/how-ai-generation-is-sandboxed/) — the conceptual model
- [Audit log](/mira/administration/audit-log/) — every state change is recorded
