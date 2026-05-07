---
title: Quickstart
description: Import a catalog, generate a GTM kit, approve it, publish a page, and route a captured lead — end to end, in about 30 minutes.
---

In about 30 minutes you'll:

- Import a 5-product sample catalog
- Generate a full GTM kit for one product, watching it stream live
- Edit a section, address a risky-claim flag, and approve the kit
- Publish a hosted landing page with a capture form
- Submit a test lead and watch it route to your CRM (or a webhook)

By the end you'll have one product fully live: a published page, a captured lead, a CRM record with product context attached, and the analytics events that feed the [learning agent](/mira/concepts/agents/#learning-agent).

## Prerequisites

- A Mira tenant with the **Admin** or **Editor** role.
- A small product catalog. Use the sample at `[sample-catalog.csv](placeholder)` or any CSV with `name`, `external_id`, and `description` columns.
- One destination for the routing step:
  - A HubSpot account you can connect, **or**
  - A publicly reachable webhook endpoint — [webhook.site](https://webhook.site) gives you one for free.

## 1. Sign in

Open your tenant subdomain (e.g. `yourtenant.mira.hereai.ai`) and sign in. If your team uses [SSO](/mira/integrations/sso/), you'll be redirected to your IdP and back.

After sign-in, you'll land in an empty workspace with an onboarding checklist on the right.

![Empty workspace with onboarding checklist](placeholder)

## 2. Import a catalog

In the workspace, click **Import catalog** → **Upload CSV**.

1. Drop in `sample-catalog.csv` (or your own).
2. Mira auto-detects column types and proposes a mapping. Review it; tweak any column that needs to point elsewhere.
3. Click **Validate**. You'll see a per-row report. Fix any errors in the file and re-upload, or accept a partial import if the rows you care about are clean.
4. Click **Import**.

After a moment, your products appear in the catalog list with state **imported**. Re-imports are idempotent — Mira hashes each row and only marks rows whose hash changed as **stale** for regeneration. See [Onboard your catalog](/mira/workflows/onboard-your-catalog/) for the full mechanics.

## 3. Generate a GTM kit

Open one product's detail page from the catalog list. Click **Generate**.

The [generation agent](/mira/concepts/agents/#generation-agent) starts in an isolated subprocess. You'll see per-section progress events stream in:

```
Drafting ICP …
Done ICP
Drafting Positioning …
Done Positioning
Drafting Pillars …
Done Pillars
Drafting Competitive …
Done Competitive
Drafting Landing-page …
Done Landing-page
Drafting Outbound snippets …
Done Outbound snippets
```

When generation finishes, six sections render in the workspace, each in **draft** state:

- ICP hypotheses
- Positioning
- Messaging pillars
- Competitive angles
- Landing-page copy
- Outbound snippets

Skim them. If any section has a **risky-claim flag** in its margin, you'll address it in the next step.

## 4. Review and approve

Click any section to open it in the editor.

1. Edit one section inline — even a small word change is enough to see how versioning works. When you save, Mira creates a new version starting at `draft`. The previous version stays in history.
2. If a risky-claim flag is showing, hover the warning to see why. Either rewrite the claim or click **Accept with comment** and explain why it's fine — the comment lands in the [audit log](/mira/administration/audit-log/).
3. Click **Approve** on the section. Repeat for the other five.

When all six are approved, the **Publish** button at the top unlocks. See [Review & approve](/mira/workflows/review-and-approve/) for multi-approver setups (PMM + legal + brand) and the full state machine.

## 5. Publish a landing page

Click **Publish** on the product.

1. Pick **Long-form** as the template.
2. Set the slug — for the sample catalog, something like `/products/sample-product`.
3. Configure the capture form: keep `name`, `email`, `company`, and add an optional `question` field.
4. Click **Preview**. The page renders inside an iframe; verify it reads correctly.
5. Click **Publish**.

Within seconds the page is live at `<your-tenant>.mira.hereai.ai/products/sample-product`. Copy the URL.

The published page is pinned to the **frozen approved versions** of each section. If you edit a section now, that edit creates a new draft — the live page won't change until you re-approve and republish.

## 6. Capture a test lead

Open the URL you just copied in a private/incognito window so you don't pollute your own analytics.

1. Scroll to the form.
2. Fill it with dummy data (`Quickstart User`, `quickstart+test@example.com`, `Acme Inc`, "Tell me more about pricing").
3. Submit.

Switch back to the workspace. Within a few seconds the lead appears in **Capture & route → Recent leads** with full product context — catalog entry id, page URL, the version of each artifact section the visitor saw, and the captured positioning excerpt.

Mira also dedupes by tenant + email. If you submit the form twice within the configured dedupe window (default 7 days), the second submission shares the existing lead record.

## 7. Route to your CRM

Now wire the routing destination.

### Option A — HubSpot

1. Open **Integrations → [HubSpot](/mira/integrations/hubspot/) → Connect**.
2. Sign in to HubSpot when prompted; grant the requested scopes.
3. Back in Mira, set a routing rule: **Product matches "sample-product" → HubSpot**.
4. Replay the test lead from the capture dashboard (or submit the form once more).
5. In HubSpot, look for the new Contact. The custom properties carry product context:

   - `mira_product_id`
   - `mira_product_name`
   - `mira_captured_positioning`
   - `mira_workspace_url`

### Option B — Generic webhook

1. Open `https://webhook.site` in another tab; copy the unique URL it gives you.
2. In Mira, open **Integrations → [Generic webhook](/mira/integrations/generic-webhook/) → Configure**.
3. Paste the webhook.site URL; set a per-tenant signing secret.
4. Set a routing rule: **Product matches "sample-product" → Generic webhook**.
5. Replay the test lead.
6. webhook.site shows the inbound POST. The body looks like:

   ```json
   {
     "event": "lead.captured",
     "lead": {
       "email": "quickstart+test@example.com",
       "name": "Quickstart User",
       "company": "Acme Inc"
     },
     "product": {
       "catalog_entry_id": "…",
       "name": "Sample Product",
       "page_url": "https://yourtenant.mira.hereai.ai/products/sample-product",
       "captured_positioning": "…"
     },
     "captured_at": "2026-05-06T12:34:56Z"
   }
   ```

   The `X-Mira-Signature` header is HMAC-SHA256 of the body using your signing secret — verify it on your side before processing.

Either way, the **delivery dashboard** in Mira now shows your lead routed successfully. If something goes wrong, the dashboard records the last error and offers a **Replay** button — see [Capture & route leads](/mira/workflows/capture-and-route-leads/) for retry mechanics.

## What you built

In the last 30 minutes:

- A 5-product catalog landed in your tenant.
- One product has a fully approved GTM kit pinned in version history.
- A landing page is live at a public URL with a capture form.
- One lead was captured, deduped, and routed with full product context to your CRM or webhook.
- Every state-changing action was recorded in the [audit log](/mira/administration/audit-log/).

That's the entire seven-phase loop except outbound sequencing and learning, which kick in once real visits and CRM outcomes flow back.

## Next steps

- **[Onboard your real catalog](/mira/workflows/onboard-your-catalog/)** — re-run the import with your live product list, including [JSON API](/mira/workflows/onboard-your-catalog/) and [PIM connector](/mira/workflows/onboard-your-catalog/) options.
- **[Set up multi-approver review](/mira/workflows/review-and-approve/)** — add legal and brand approvers for customer-facing claims.
- **[Point a custom domain at Mira](/mira/workflows/publish-landing-pages/)** — serve published pages from your own domain with TLS.
- **[Run outbound sequences](/mira/workflows/run-outbound-sequences/)** — turn approved outbound snippets into channel-ready cadences for your existing ESP.
- **[Watch outcomes feed the learning agent](/mira/workflows/learn-from-outcomes/)** — once visits and CRM stages accrue, see narrative-variant attribution and the proposals the learning agent surfaces.
