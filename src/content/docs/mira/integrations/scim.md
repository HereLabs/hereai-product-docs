---
title: SCIM provisioning
description: Automate user and group lifecycle from your IdP — create, update, deactivate, and group-driven role binding via SCIM 2.0.
---

SCIM provisioning automates user lifecycle for enterprise tenants. Users and groups sync from your IdP; role assignments follow group membership.

:::tip[Capabilities]
- SCIM 2.0 endpoint
- User create / update / deactivate
- Group sync (groups become Mira role bindings per tenant)
- De-provisioning revokes Mira access on the next sync
- Compatible with Okta, Entra ID, OneLogin, JumpCloud, and other SCIM 2.0 sources
:::

## Prerequisites

- An IdP that supports SCIM 2.0 outbound provisioning
- Mira **Admin** role
- Tenant on the **Enterprise** plan (SCIM is enterprise-only)

## Setup

1. In Mira, open **Integrations → SCIM → Configure**.
2. Mira generates a **base URL** and a **bearer token**:
   - Base URL: `https://yourtenant.mira.app/scim/v2`
   - Token: shown once; copy and store securely
3. In your IdP, create a SCIM provisioning configuration with the base URL and bearer token.
4. Map your IdP users + groups to Mira's expected attributes (see Attribute mapping).
5. Push an initial sync from the IdP. Check Mira's **Integrations → SCIM → Activity log** to confirm users land.

## Supported operations

| SCIM operation | Mira behavior |
| --- | --- |
| `POST /Users` | Creates a new user; sends optional welcome email |
| `PATCH /Users/{id}` | Updates user attributes (name, email, active state) |
| `DELETE /Users/{id}` (or `active=false`) | Deactivates the user; revokes session immediately |
| `POST /Groups` | Creates a Mira role-binding group |
| `PATCH /Groups/{id}` | Updates group membership |
| `DELETE /Groups/{id}` | Removes the group; affected users lose role bindings |

## Attribute mapping

| Mira field | SCIM attribute |
| --- | --- |
| Email | `userName` (and `emails[primary=true].value`) |
| First name | `name.givenName` |
| Last name | `name.familyName` |
| External id | `externalId` |
| Active | `active` |
| Group → role | `groups[].displayName` matched against Mira role names |

## Group-to-role mapping

Mira maps SCIM groups to roles by display name. Default role names: `Mira Admin`, `Mira Editor`, `Mira Viewer`. Map your IdP groups onto those names; group membership in your IdP becomes role assignment in Mira.

For more granular control:

1. Open **Settings → Roles → Group bindings**.
2. Define custom mappings: `<IdP group display name>` → `<Mira role>` + optional approval rights overrides.

## De-provisioning

When a user is deactivated in your IdP, the next SCIM sync sets `active=false` in Mira. On detection:

1. Active sessions for that user are revoked immediately.
2. Pending approvals owned by that user are reassigned to the role-default approver, or to Admin if no default exists.
3. Audit log records the deactivation under `user.deactivate` with the SCIM source.

## Verify

1. In your IdP, create a test user and assign them to a Mira-mapped group.
2. Trigger a sync.
3. The user appears in Mira's **Settings → Users** with the expected role.
4. Disable the user in the IdP.
5. After the next sync, the user is deactivated in Mira; their session is revoked.

## Troubleshooting

- **`401 Unauthorized` from SCIM endpoint** — bearer token incorrect or expired. Rotate from **Integrations → SCIM → Rotate token**.
- **Users sync but get no role** — group display names don't match Mira's role names. Either rename groups in your IdP or add a custom mapping.
- **Sync seems stale** — your IdP's polling interval is long. Most IdPs poll every 40 minutes; trigger a manual sync to test.

## Related

- [SSO](/mira/integrations/sso/) — pair with SCIM for full lifecycle automation
- [Roles & permissions](/mira/administration/roles-and-permissions/) — what the synced groups grant
