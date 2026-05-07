---
title: Agent boundaries
description: The per-job sandbox, the allowlist contract, and the human-approval gate that together contain the risk of generative AI.
---

Generative AI is the highest-risk operation in Mira: it talks to an external LLM with customer data and produces text that may end up in front of prospects. This page describes the three boundaries that contain that risk.

## Per-job sandbox

Every agent invocation (generation, outbound, learning) runs as a **fresh subprocess** started from a sealed workspace and torn down on completion. There's no long-running agent process; nothing carries from one job to the next except what the application persists.

A compromised LLM, a poisoned prompt, or an adversarial catalog row can affect at most one job's output — never the surrounding system, never another job, never another tenant.

## Allowlist contract

The agent process sees only what it needs:

| Allowed | Not allowed |
| --- | --- |
| The catalog entry (or outcome window) for this job | Database credentials |
| The prompt templates | Application secrets or session cookies |
| The model spec for this job | Other tenants' data |
| The explicit list of allowed tools | The application API itself |
| The explicit list of allowed network domains | General internet egress |

The allowlists are part of the job manifest and enforced at process spawn — even if the agent code requests a network domain not on the list, the request fails at the network layer.

## Human-approval gate

Anything customer-visible — a published page, an outbound message, a CRM-attached note — is pinned to a **human-approved version**. If an agent proposes new content, that content sits in `draft` state until rejected or approved. Bad output cannot reach customers without explicit human sign-off.

The state machine is one-way per version (see [Versioning & approval](/mira/concepts/versioning-and-approval/)) so an approval can't be quietly undone.

## Reproducibility

Every artifact records what produced it:

- A hash of the source content (catalog entry, outcome window)
- A hash of the rendered prompts
- The provider and model id used
- Token usage for the call

If output later proves wrong or harmful, you can trace back to the exact inputs and the exact model that produced it.

## What this is not

- **Not perfect.** The sandbox doesn't prevent the LLM from generating misleading-but-coherent text. The approval gate exists precisely because automated output can't be trusted at face value.
- **Not infinite.** A determined attacker who compromises the host operating system would defeat process isolation. The sandbox is one layer; combined with tenant isolation, audit logging, and approval gates, it produces a multi-layered defense.

## Related

- [How AI generation is sandboxed](/mira/concepts/how-ai-generation-is-sandboxed/) — concept-level overview
- [Tenant isolation](/mira/security/tenant-isolation/) — the surrounding layer
- [Versioning & approval](/mira/concepts/versioning-and-approval/) — the approval-gate mechanics
- [Subprocessors](/mira/security/subprocessors/) — the LLM provider is a subprocessor
