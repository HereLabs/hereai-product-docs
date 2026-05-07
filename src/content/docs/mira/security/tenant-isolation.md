---
title: Tenant isolation
description: How Mira enforces the boundary between tenants — platform-layer enforcement, what's tenant-scoped, what can't be shared, and continuous canary verification.
---

Mira is multi-tenant from day one. This page covers how the boundary is enforced, what it covers, and how it's verified continuously.

## Where the boundary lives

Tenant identity is established at sign-in (from password, SSO, or SCIM-provisioned session) and threaded through every read and write at the **platform layer** — below application code.

Application code can't accidentally cross the boundary by forgetting a filter. Even a query authored without tenancy in mind returns only the current tenant's rows.

## What's tenant-scoped

Everything that represents customer state:

- Catalog entries and import history
- Generated kits and every artifact version
- Approval events and approver identities
- Published landing pages and their pinned versions
- Captured leads and routing events
- Outcome metrics (visits, form fills, replies, meetings, CRM stages)
- Audit-log entries
- Tenant settings, integrations, billing
- Users, roles, and SSO/SCIM bindings

The only data not tenant-scoped is global infrastructure config, which is never customer-readable.

## What can't be shared

Some shapes are explicitly **not** supported even where they'd be convenient:

- Cross-tenant queries
- Cross-tenant generation (an agent never sees data from a tenant other than the one whose job it's running)
- Cross-tenant leads
- Shared catalogs (each tenant ingests its own catalog, even if the source is the same PIM)

Any future feature requiring aggregated cross-tenant insight goes through an explicit anonymisation + opt-in pipeline.

## Continuous verification

A **cross-tenant canary** test runs on every CI build:

1. Provisions two test tenants
2. Writes representative data into each (catalogs, kits, leads, audit entries)
3. Asserts that queries on either side see only their own data
4. Asserts that direct API calls authenticated as one tenant cannot read or write to the other

Any break stops the build. The pattern means the boundary is exercised continuously, not just at design time.

## Related

- [Multi-tenancy & isolation](/mira/concepts/multi-tenancy-and-isolation/) — concept-level overview
- [Agent boundaries](/mira/security/agent-boundaries/) — additional isolation around AI generation
- [Roles & permissions](/mira/administration/roles-and-permissions/) — what users can do within their tenant
