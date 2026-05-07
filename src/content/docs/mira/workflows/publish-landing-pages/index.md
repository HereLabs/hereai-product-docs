---
title: Publish landing pages
description: Per-product landing pages, parameterized by approved kits, served at your subdomain or your own custom domain with TLS.
---

Mira hosts a landing page for every product whose kit you've approved. Pages are pinned to frozen approved versions, not live drafts, so customers see exactly what was approved.

## How it works

Each landing page is a static HTML/CSS asset built from a template plus the approved kit. Templates parameterize the kit's sections (positioning, messaging pillars, competitive angles, landing-page copy) into a fully rendered page.

When you publish:

1. Mira freezes the current approved versions of each section.
2. The page is rendered and served at your configured slug.
3. The page links back to the workspace for the rep handling captured leads.

## Capabilities

- **Per-tenant subdomain** with configurable slugs (e.g. `yourtenant.mira.app/products/<slug>`)
- **Multiple page templates** — long-form, short-form, comparison
- **Custom CSS per tenant** for brand match
- **Custom domain (CNAME)** with TLS managed by Mira
- **Embedded form** for [lead capture](/mira/workflows/capture-and-route-leads/)
- **Page analytics**: visits, form fills, conversion rate

## Workflow

```
1. Approve all required sections of a kit
2. Pick a template
3. Configure the slug and form fields
4. Preview in iframe
5. Publish — page goes live within minutes
6. Share the URL: sales, email signature, LinkedIn, ad creative
```

## Versioning

Republishing creates a new published version pinned to the currently-approved sections. Previous published versions are archived but recoverable. Customer-facing URLs are stable across republishes.

## Custom domain

Point a CNAME record at your Mira tenant. Mira provisions TLS automatically and serves your pages at `<your-domain>/products/<slug>`. The internal subdomain remains valid for previews and admin views.

## Related

- [Review & approve](/mira/workflows/review-and-approve/) — what gates publishing
- [Capture & route leads](/mira/workflows/capture-and-route-leads/) — forms on these pages
- [Learn from outcomes](/mira/workflows/learn-from-outcomes/) — page-level performance
