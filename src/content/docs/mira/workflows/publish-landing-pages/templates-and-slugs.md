---
title: Templates & slugs
description: Pick a landing-page template, configure the slug, and preview before publishing.
---

This guide shows how to pick a template and set up the URL where a published page lives.

## Before you start

- A product with all required sections approved
- Editor role to publish

## Templates

Mira ships three templates, each optimized for a different visit pattern:

- **Long-form** — full positioning, all messaging pillars, competitive comparison, FAQ. Use for considered evaluations.
- **Short-form** — hero + 3 messaging pillars + form. Use for outbound-driven traffic where intent is already high.
- **Comparison** — focused side-by-side against named competitors. Use for "vs." pages.

You can swap templates without rewriting content — the kit's sections drop into whichever template you pick.

## Steps

1. Open the product detail page.
2. Click **Publish**.
3. Pick a template from the dropdown.
4. Configure the slug. The default is the product's `external_id` slugified; you can override it. Slugs are unique per tenant.
5. Configure the form fields (see [Configure capture forms](/mira/workflows/capture-and-route-leads/configure-capture-forms/)).
6. Click **Preview**. The page renders inside an iframe.
7. Verify; click **Publish**.

## Slug rules

- Lowercase letters, digits, and hyphens
- 3-80 characters
- Must be unique within your tenant
- Once published, changing the slug breaks any links you've shared — Mira issues a 301 from the old slug for 30 days

## Verify

- The published URL is `<your-tenant>.mira.app/products/<slug>` (or your [custom domain](/mira/workflows/publish-landing-pages/custom-domain/)).
- The page reflects the approved sections.

## Related

- [Custom CSS](/mira/workflows/publish-landing-pages/custom-css/)
- [Custom domain](/mira/workflows/publish-landing-pages/custom-domain/)
- [Configure capture forms](/mira/workflows/capture-and-route-leads/configure-capture-forms/)
