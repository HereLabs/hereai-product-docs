---
title: Custom CSS
description: Apply tenant-level CSS overrides so published pages match your brand without editing the HTML.
---

This guide shows how to apply tenant-level CSS so every published landing page matches your brand.

## Before you start

- Admin role
- Your brand's colors, fonts, and any other styles you want to apply

## Brand tokens vs full CSS

Mira supports two layers:

- **Brand tokens** — the easy path. A short YAML form in the admin UI: primary color, accent color, font family, logo, header style. Tokens compile into the underlying CSS variables the templates already consume.
- **Full CSS overrides** — for tenants that need more. A free-form CSS block scoped to your tenant.

Most tenants only need tokens. Use full CSS when token coverage isn't enough.

## Steps — brand tokens

1. Open **Settings → Branding**.
2. Set the primary color, accent color, font family, and logo.
3. (Optional) Pick a header style — `compact`, `centered`, or `split`.
4. Save. New publishes pick up the tokens immediately. Existing published pages keep their pinned styling until republished.

## Steps — full CSS overrides

1. Open **Settings → Branding → Custom CSS**.
2. Paste your CSS block. Use the documented selectors (see the inline reference panel).
3. Save. **Preview** opens a live published page rendered with your CSS.

## Verify

- Open a published page; styling matches your brand.
- The browser dev tools confirm your CSS is loaded.

## Limits

- Maximum 100 KB of custom CSS per tenant
- No external `@import` URLs (CSS is served from Mira's CDN)
- No JavaScript-injecting `expression()` or `url(javascript:…)`; sanitised at save

## Related

- [Templates & slugs](/mira/workflows/publish-landing-pages/templates-and-slugs/)
- [Custom domain](/mira/workflows/publish-landing-pages/custom-domain/)
