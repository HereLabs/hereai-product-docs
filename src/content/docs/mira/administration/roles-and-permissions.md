---
title: Roles & permissions
description: Three default roles (Admin, Editor, Viewer) per tenant, with configurable approval rights and multi-approver workflows.
---

Mira's RBAC model defines three default roles per tenant. Each role grants a different scope of action; approval rights are layered on top.

## Default roles

| Role | Can do |
| --- | --- |
| **Admin** | Manage tenant settings, users, integrations, billing; everything below |
| **Editor** | Edit catalog entries, regenerate kits, edit sections, request approval |
| **Viewer** | Read-only access to catalog, kits, analytics |

## Approval rights

Approval permissions are configurable per tenant: any of the three roles can be granted approval rights. [Multi-approver workflows](/mira/workflows/review-and-approve/) can require sign-off from specific role combinations (e.g. PMM + legal + brand).

## Authentication

- **Email + password** with cookie sessions
- **[SSO](/mira/integrations/sso/)** via Google or Microsoft (OIDC)
- **[SCIM provisioning](/mira/integrations/scim/)** for enterprise tenants — users and groups sync from your IdP

Sessions are tenant-scoped: the cookie embeds the tenant identity established at sign-in.

## Related

- [Audit log](/mira/administration/audit-log/) — every state-changing action is recorded
- [Review & approve](/mira/workflows/review-and-approve/) — what approval rights gate
