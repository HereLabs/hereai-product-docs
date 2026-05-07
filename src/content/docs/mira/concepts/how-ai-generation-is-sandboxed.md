---
title: How AI generation is sandboxed
description: Generation is the highest-risk operation in the system. Mira contains that risk with two boundaries — process isolation and approval gates — so a bad generation can't escape the workspace.
---

Generating content is the highest-risk operation in the system: it talks to an external LLM with the customer's product data and produces text that may end up in front of prospects.

Each kit generation is a job dispatched to an isolated subprocess that runs the LLM pipeline and writes artifacts back to a sanitized workspace.

Mira contains that risk with two boundaries:

1. **Process isolation.** Generation runs as a separate worker, started for each job and torn down when it completes. The worker can't read application secrets, database credentials, or any tenant data outside the scoped workspace prepared for that job. If the LLM is compromised or the prompt is poisoned by manipulated catalog data, it can't reach the rest of the system.
2. **Approval gates.** Nothing the worker produces is customer-visible until a human approves it. Published pages and exported assets are pinned to approved versions, not to live drafts. Bad output sits in the draft state until rejected.

The blast radius of a bad generation is the affected draft. Nothing more.

## What an agent sees, per job

The sandboxed worker sees only what it needs to do its job:

- The catalog entry (or outcome window) it's working on, and only that
- The prompt templates checked into the application
- The model spec for this job (model id and version)
- An explicit list of allowed tools and allowed network domains

That's the entire input surface. Everything else is unreachable.

## What an agent does NOT see

The worker is explicitly cut off from:

- Database credentials
- Application secrets or session cookies
- Other tenants' data
- The application API itself — even at the network level

If a model is poisoned by manipulated catalog input, or starts producing harmful output, the worst case is a bad draft.

## Reproducibility

Every artifact produced by any agent records what input and which model produced it: a hash of the source content (catalog entry, outcome window, etc.), a hash of the rendered prompts, the provider and model used, and the token cost.

Re-running the same agent against the same input with the same prompts and model is identifiable from those hashes alone — useful for cache invalidation, debugging drift, and tracing which inputs produced a given output.

## Related

- [Agents](/mira/concepts/agents/) — the three agents that all run under this sandbox contract
- [Agent boundaries](/mira/security/agent-boundaries/) — the security treatment with attack-surface analysis
- [Multi-tenancy & isolation](/mira/concepts/multi-tenancy-and-isolation/) — the platform-layer tenant boundary
- [Generate GTM kits](/mira/workflows/generate-gtm-kits/) — the workflow that triggers generation
