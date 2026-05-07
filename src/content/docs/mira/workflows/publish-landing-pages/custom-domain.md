---
title: Custom domain
description: Serve published pages from your own domain (CNAME) with TLS provisioned automatically by Mira.
---

This guide shows how to point a custom domain at your tenant so published pages live at `<your-domain>/products/<slug>` instead of the default subdomain.

## Before you start

- Admin role
- DNS access for the domain you want to use
- A subdomain you can dedicate (e.g. `gtm.yourcompany.com` or `learn.yourcompany.com`) — apex domains are not supported because of CNAME constraints

## Steps

1. Open **Settings → Domains**.
2. Click **Add domain**.
3. Enter the subdomain (e.g. `gtm.yourcompany.com`).
4. Mira shows a CNAME target like `<your-tenant>.cname.mira.hereai.ai`. Note it.
5. In your DNS provider, add a CNAME record:
   - **Host**: `gtm` (or whatever subdomain you picked)
   - **Type**: `CNAME`
   - **Value**: the target Mira gave you
   - **TTL**: 300 (5 minutes) for the first switch; raise after stable
6. Back in Mira, click **Verify**. Mira polls DNS until propagation succeeds (can take a few minutes).
7. Once verified, Mira provisions a TLS certificate via Let's Encrypt automatically. The certificate auto-renews.

## Verify

- `https://<your-domain>/products/<slug>` serves the page.
- The browser shows a valid TLS certificate.
- The default subdomain still works for previews and admin views.

## Switching back

Removing the custom domain reverts published URLs to the default subdomain. Mira keeps a 30-day 301 from the custom domain to the default while DNS propagates.

## Related

- [Templates & slugs](/mira/workflows/publish-landing-pages/templates-and-slugs/)
- [Custom CSS](/mira/workflows/publish-landing-pages/custom-css/)
