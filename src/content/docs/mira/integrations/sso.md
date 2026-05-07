---
title: SSO (Google & Microsoft)
description: Single sign-on via Google Workspace or Microsoft Entra ID using OIDC. Per-IdP setup with claim mapping and verification.
---

Mira supports SSO via Google or Microsoft using OIDC. After SSO is configured, your team signs in with their workplace identity instead of an email + password.

:::tip[Capabilities]
- Google Workspace (OIDC)
- Microsoft Entra ID / Azure AD (OIDC)
- Tenant-scoped sessions
- Group-based role assignment when paired with [SCIM](/mira/integrations/scim/)
:::

## Prerequisites

- An IdP admin who can register OIDC applications
- Mira **Admin** role on your tenant
- Optional: SCIM provisioning enabled (for group-based role binding)

## Google Workspace (OIDC)

### IdP-side setup

1. In Google Cloud Console, open **APIs & Services → Credentials**.
2. Click **Create Credentials → OAuth client ID**.
3. Application type: **Web application**.
4. Authorized redirect URI: copy from Mira's **Integrations → SSO → Google** page (it looks like `https://yourtenant.mira.hereai.ai/auth/sso/google/callback`).
5. Save. Note the **Client ID** and **Client secret**.

### Mira-side setup

1. **Integrations → SSO → Google → Configure**.
2. Paste the Client ID and Client secret.
3. (Optional) Restrict to a Google Workspace domain (e.g. only `@yourcompany.com` accounts).
4. Save.

### Claim mapping

| Mira user field | Google claim |
| --- | --- |
| Email | `email` |
| First name | `given_name` |
| Last name | `family_name` |
| External id | `sub` |

### Verify

1. Open your tenant's sign-in page in a private window.
2. Click **Sign in with Google**.
3. Authorize.
4. You should land in the Mira workspace; check the user's email and name match.

## Microsoft Entra ID (OIDC)

### IdP-side setup

1. In Entra admin center, open **App registrations → New registration**.
2. Name the app `Mira`.
3. Supported account types: **Accounts in this organizational directory only** (single-tenant).
4. Redirect URI: copy from Mira's **Integrations → SSO → Microsoft** page.
5. Save.
6. Open the registered app → **Certificates & secrets → New client secret**. Note the value.
7. **API permissions** → add `openid`, `profile`, `email`, `User.Read`.
8. **Token configuration** → add the `email` claim if it's not present.

### Mira-side setup

1. **Integrations → SSO → Microsoft → Configure**.
2. Paste the Application (client) ID and the client secret.
3. Paste the Directory (tenant) ID.
4. Save.

### Claim mapping

| Mira user field | Microsoft claim |
| --- | --- |
| Email | `email` (or `preferred_username` if `email` is absent) |
| First name | `given_name` |
| Last name | `family_name` |
| External id | `oid` |

### Verify

1. Open your tenant's sign-in page in a private window.
2. Click **Sign in with Microsoft**.
3. Authorize.
4. You should land in the Mira workspace.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `redirect_uri_mismatch` | URI in IdP doesn't match Mira's | Copy the URI from the Mira config page exactly |
| `email` claim missing on first sign-in | IdP not configured to release email | Add the email claim/scope on the IdP side |
| User signed in but lands in a wrong tenant | Tenant binding misconfigured | Ensure the IdP app is registered against the same tenant subdomain |
| Group-based role assignment not working | SCIM not enabled | See [SCIM provisioning](/mira/integrations/scim/) |

## Related

- [SCIM provisioning](/mira/integrations/scim/) — pair with SSO for full lifecycle automation
- [Roles & permissions](/mira/administration/roles-and-permissions/) — what users can do once signed in
