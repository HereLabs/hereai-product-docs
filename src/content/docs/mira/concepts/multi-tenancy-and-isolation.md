---
title: Multi-tenancy & isolation
description: Every business object belongs to a tenant; tenants never see one another's data. Isolation is enforced at the platform layer, not in application code.
---

Mira is multi-tenant from day one. Every business object belongs to a tenant, and tenants never see one another's data — for catalogs, kits, leads, audit logs, and anything else customer-touching.

## Why multi-tenant from day one

Multi-tenancy was designed in before the first real customer, not bolted on later:

- **No migration debt.** There is no "legacy single-tenant schema" to grow out of. Every customer in production gets the same isolation guarantees as every other customer.
- **Same posture for everyone.** A 5-person design partner and an enterprise tenant share the exact same code paths. Security review can reason about the system once, not per customer.
- **Cheap to add tenants.** Onboarding a new tenant is a row in the tenants table and an admin user; no provisioning, no separate database, no new infrastructure.

## What's tenant-scoped

Everything that represents customer state lives behind the tenant boundary:

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

## How isolation is enforced

Tenant identity is established at sign-in (from the password / SSO / SCIM-provisioned session) and threaded through every read and write at the **platform layer** — below application code.

Application code can't accidentally cross the boundary by forgetting a filter, because the boundary doesn't depend on application code remembering. Even a query authored without thinking about tenancy returns only the current tenant's rows.

A continuously-running cross-tenant canary test exercises this on every CI run: it provisions two tenants, writes data into each, and asserts that queries on either side see only their own data.

## What can't be shared

Some shapes are explicitly **not** supported, even if they'd be convenient:

- Cross-tenant queries (no "compare our conversion rate to another tenant's")
- Cross-tenant generation (an agent never sees data from a tenant other than the one whose job it's running)
- Cross-tenant leads (a lead is owned by exactly one tenant)
- Shared catalogs (each tenant ingests its own catalog, even if the source is the same PIM)

If a future feature needs aggregated cross-tenant insight, it goes through an explicit anonymisation + opt-in pipeline, not by relaxing the boundary.

## Related

- [How AI generation is sandboxed](/mira/concepts/how-ai-generation-is-sandboxed/) — the additional isolation around LLM execution
- [Tenant isolation](/mira/security/tenant-isolation/) — the deeper security posture, including continuous canary verification
- [Roles & permissions](/mira/administration/roles-and-permissions/) — what users can do within their tenant
- [Audit log](/mira/administration/audit-log/) — every state-changing action is recorded per tenant
