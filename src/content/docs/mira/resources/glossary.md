---
title: Glossary
description: Every Mira-specific term used in the docs, with a short definition and a link to the page that goes deeper.
---

Every Mira-specific term used in the docs.

## Approval

The act of moving a [section](#section) from `pending` to `approved` (or `rejected`). Approval is a one-way state transition per [version](#version). See [Versioning & approval](/mira/concepts/versioning-and-approval/).

## Artifact

The Mira term for one section of a [GTM kit](#gtm-kit) — for example, the positioning artifact, the landing-page-copy artifact. Each artifact is independently versioned and approved.

## Artifact version

One immutable bodied copy of an artifact. Edits create new versions; existing versions never change. See [Versioning & approval](/mira/concepts/versioning-and-approval/).

## Audit log

Immutable record of every state-changing action in the tenant. See [Audit log](/mira/administration/audit-log/).

## Bidirectional sync

The pull from a CRM (HubSpot, Salesforce) back into Mira. Stage transitions and won/lost flow back. See [Replay & bidirectional sync](/mira/workflows/capture-and-route-leads/replay-and-bidirectional-sync/).

## Capture

The act of a visitor submitting a form on a published landing page, becoming a [lead](#lead). See [Capture & route leads](/mira/workflows/capture-and-route-leads/).

## Catalog entry

The atomic unit Mira works around — one row in the product catalog. Each entry has source fields, a content hash, a tenant owner, and zero or more associated [artifacts](#artifact). See [The GTM kit](/mira/concepts/the-gtm-kit/).

## Cohort

A set of products grouped for analytics comparison — e.g. "products launched in week of 2026-04-15". See [Dashboards, cohorts & attribution](/mira/workflows/learn-from-outcomes/dashboards-cohorts-and-attribution/).

## Generation

The act of producing a [GTM kit](#gtm-kit) for a [catalog entry](#catalog-entry) by running the [generation agent](#generation-agent) against the entry's source fields.

## Generation agent

The Mira agent that drafts the GTM kit. Runs in an [isolated subprocess](#isolated-subprocess). See [Agents](/mira/concepts/agents/).

## GTM kit

The set of [artifacts](#artifact) Mira produces for one catalog entry — ICP, positioning, pillars, competitive angles, landing-page copy, outbound snippets. See [The GTM kit](/mira/concepts/the-gtm-kit/).

## Isolated subprocess

The per-job worker process Mira spawns to run an [agent](#agent). The subprocess has no DB credentials, no app secrets, no cross-tenant visibility, and no general internet egress. See [Agent boundaries](/mira/security/agent-boundaries/).

## Lead

A captured-form submission, persisted with full product context. See [Capture & route leads](/mira/workflows/capture-and-route-leads/).

## Learning agent

The Mira agent that ingests outcome data and proposes narrative changes for the next generation pass. See [Agents](/mira/concepts/agents/).

## Outbound agent

The Mira agent that turns approved outbound snippets into channel-ready sequences with variant rotation. See [Agents](/mira/concepts/agents/).

## Risky-claim flag

An automated marker on a generated section indicating the claim should be reviewed before approval — could be from a regex / keyword rule or a critique-pass threshold. See [Risky-claim rules](/mira/workflows/review-and-approve/risky-claim-rules/).

## Routing event

The record of one webhook delivery attempt for one [lead](#lead). Has its own retry / replay history. See [Replay & bidirectional sync](/mira/workflows/capture-and-route-leads/replay-and-bidirectional-sync/).

## Routing rule

A tenant-configured rule that maps captured leads to destinations. See [Routing rules](/mira/workflows/capture-and-route-leads/routing-rules/).

## Sandbox

The per-job process boundary that contains the agent. See [Agent boundaries](/mira/security/agent-boundaries/) for the full contract.

## Section

One of the six pieces of a [GTM kit](#gtm-kit) — ICP, positioning, pillars, competitive angles, landing-page copy, outbound snippets. Synonymous with [artifact](#artifact) in most contexts.

## Stale

A flag on a [catalog entry](#catalog-entry) indicating its source fields have changed since the last [generation](#generation). The kit is still live; regeneration is suggested but not automatic. See [Re-import & change detection](/mira/workflows/onboard-your-catalog/re-import-and-change-detection/).

## Subprocessor

A third-party processor in Mira's data path. See [Subprocessors](/mira/security/subprocessors/) for the list.

## Tenant

One Mira customer instance. All customer state is tenant-scoped; tenants never see one another's data. See [Tenant isolation](/mira/security/tenant-isolation/).

## Variant

An alternate generated version of a [section](#section) for narrative experiments. The [learning agent](#learning-agent) attributes conversion back to the variant that produced it. See [Variants & risky-claim flags](/mira/workflows/generate-gtm-kits/variants-and-risky-claim-flags/).

## Version

See [Artifact version](#artifact-version).
