---
title: HubSpot
description: Native HubSpot integration — OAuth connection, custom Contact properties for product context, bidirectional sync of stage transitions.
---

Mira's native HubSpot integration delivers captured leads as Contact create-or-update operations with custom product properties attached, and pulls CRM stage changes back for outcome attribution.

:::tip[Capabilities]
- Contact create / update with custom product properties
- Bidirectional sync of stage transitions (lead → MQL → SQL → opportunity → won/lost)
- Per-tenant signed webhook verification + replay
- Routing rules can target HubSpot pipelines or owners
:::

## Prerequisites

- A HubSpot account on a tier that supports custom contact properties and webhook subscriptions (Marketing Hub Pro / Service Hub Pro and above)
- A HubSpot user with **Super Admin** role (required to install the integration and create custom properties)
- Mira **Admin** role on your tenant

## Setup

1. In Mira, open **Integrations → HubSpot → Connect**.
2. You'll be redirected to HubSpot to authorize. Mira requests these scopes:
   - `crm.objects.contacts.read`
   - `crm.objects.contacts.write`
   - `crm.schemas.contacts.read`
   - `crm.schemas.contacts.write`
   - `webhooks`
3. Approve the scope grant. You'll be redirected back to Mira.
4. Mira creates the custom Contact properties (see Field mapping) if they don't exist. You'll see a list of properties created vs already-present.
5. Pick which HubSpot Pipeline maps to MQL / SQL / Opportunity for the bidirectional sync.
6. (Optional) Mark this as the default destination in **Settings → Routing rules**, or add specific [routing rules](/mira/workflows/capture-and-route-leads/routing-rules/) that target HubSpot.

## Field mapping

| Mira field | HubSpot Contact property | Notes |
| --- | --- | --- |
| Catalog entry id | `mira_product_id` | Custom; created on first install |
| Product name | `mira_product_name` | Custom |
| Captured positioning | `mira_captured_positioning` | Custom; long-text |
| Page URL | `mira_page_url` | Custom |
| Workspace deep link | `mira_workspace_url` | Custom |
| Form: name | `firstname` + `lastname` | Split on first space |
| Form: email | `email` | Primary key for dedupe |
| Form: company | `company` | Standard |
| Form: custom field | `mira_custom_<field-name>` | One Custom property per page-defined custom field |

## Verify with a test

1. Submit a test lead through any published landing page.
2. In Mira, **Capture & route → Delivery dashboard** should show `delivered`.
3. In HubSpot, find the Contact. Custom properties should be populated.
4. Move the Contact through your pipeline; within a minute, **Learn from outcomes → per-product metrics** updates.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `401 Unauthorized` on connect | Scopes weren't approved | Re-run the OAuth flow |
| Custom properties missing | Installer lacked permission to create custom properties | Re-install as Super Admin, or create properties manually using the names above |
| Stale sync data | Webhook subscriptions disabled in HubSpot | Confirm account tier supports webhooks |
| Duplicate Contacts | Different email casing | HubSpot dedupes case-insensitively only on the primary key; ensure form input is normalized |

## Related

- [Capture & route leads](/mira/workflows/capture-and-route-leads/) — the workflow this powers
- [Routing rules](/mira/workflows/capture-and-route-leads/routing-rules/)
- [Replay & bidirectional sync](/mira/workflows/capture-and-route-leads/replay-and-bidirectional-sync/)
