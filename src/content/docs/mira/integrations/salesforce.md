---
title: Salesforce
description: Native Salesforce integration — OAuth connection, custom Lead/Contact fields for product context, bidirectional sync of opportunity stage changes.
---

Mira's native Salesforce integration delivers captured leads as Lead or Contact create-or-update operations (configurable per tenant) with custom product fields attached, and pulls opportunity stage changes back for outcome attribution.

:::tip[Capabilities]
- Lead **or** Contact write — pick per tenant
- Custom fields for product context
- Bidirectional sync of opportunity stage transitions and won/lost
- Per-tenant signed webhook verification + replay
:::

## Prerequisites

- Salesforce Enterprise Edition or higher (required for custom fields + Apex webhook subscriptions)
- A Salesforce user with **System Administrator** profile (to install the connected app and create custom fields)
- Mira **Admin** role on your tenant

## Setup

1. In Mira, open **Integrations → Salesforce → Connect**.
2. Pick **Lead** or **Contact** as the write target. Default: Lead. Switch later from this same page if your sales motion changes.
3. You'll be redirected to Salesforce. Approve the connected-app scopes:
   - `api` (read/write objects)
   - `refresh_token, offline_access`
   - `web` (UI access for the OAuth flow)
4. Approve the scope grant. You'll be redirected back to Mira.
5. Mira creates the custom fields on the chosen object (see Field mapping). Existing fields are reused.
6. Pick which Salesforce Stage values correspond to MQL / SQL / Opportunity for the bidirectional sync.
7. (Optional) Mark this as the default destination, or add specific [routing rules](/mira/workflows/capture-and-route-leads/routing-rules/) that target Salesforce.

## Field mapping

| Mira field | Salesforce field | Notes |
| --- | --- | --- |
| Catalog entry id | `Mira_Product_Id__c` | Custom; created on first install |
| Product name | `Mira_Product_Name__c` | Custom |
| Captured positioning | `Mira_Captured_Positioning__c` | Custom; long-text |
| Page URL | `Mira_Page_URL__c` | Custom; URL type |
| Workspace deep link | `Mira_Workspace_URL__c` | Custom; URL type |
| Form: name | `FirstName` + `LastName` | Split on first space |
| Form: email | `Email` | Primary key for dedupe |
| Form: company | `Company` (Lead) / `Account.Name` (Contact) | Standard |

## Verify with a test

1. Submit a test lead through any published landing page.
2. In Mira, **Capture & route → Delivery dashboard** should show `delivered`.
3. In Salesforce, locate the new Lead/Contact. Custom fields populate within seconds.
4. Update the record's stage to MQL; within a minute, Mira's per-product metrics update.

## Switching Lead ↔ Contact

To switch from writing Leads to Contacts (or vice versa) after install:

1. Open **Integrations → Salesforce → Settings → Write target**.
2. Pick the new target.
3. Mira creates the custom fields on the new object if they don't exist.
4. Existing routing rules continue to work; only newly captured leads write to the new object.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `INVALID_SESSION_ID` errors | Refresh token expired | Re-run **Reconnect** in the integration settings |
| Custom fields missing | Installer lacked Customize Application permission | Have a System Administrator complete the install |
| Stage sync not flowing back | Apex outbound message not configured | Mira's installer creates the trigger automatically; if it's missing, click **Repair** in integration settings |

## Related

- [Capture & route leads](/mira/workflows/capture-and-route-leads/)
- [Routing rules](/mira/workflows/capture-and-route-leads/routing-rules/)
- [Replay & bidirectional sync](/mira/workflows/capture-and-route-leads/replay-and-bidirectional-sync/)
