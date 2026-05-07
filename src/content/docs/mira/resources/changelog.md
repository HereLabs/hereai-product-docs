---
title: Changelog
description: Release notes for Mira, in reverse-chronological order. Major releases get a dedicated entry; minor improvements roll up into the closest weekly entry.
---

Release notes for Mira, in reverse-chronological order. Major releases get a dedicated entry; minor improvements roll up into the closest weekly entry.

## 2026

### Week of 2026-05-04

- **Outbound agent — variant rotation tuning.** New `performance-weighted` policy ramps weights faster on the first 100 sends per variant, slowing down as confidence grows. Existing tenants on the previous policy keep their behavior.
- **PIM connector for Productsup.** Native connector ships alongside the existing Salsify integration. See [PIM (Salsify, Productsup)](/mira/integrations/pim/).
- **Risky-claim rules — category bundles.** Pre-built rule bundles for compliance, healthcare, finance, and marketing claims. Tenants can adopt a bundle in one click instead of authoring from scratch.

### Week of 2026-04-27

- **Multi-approver workflows.** Configure who must sign off on which sections; e.g. PMM + legal + brand. See [Multi-approver workflows](/mira/workflows/review-and-approve/multi-approver-workflows/).
- **Custom domains with auto-TLS.** Point a CNAME at Mira; we provision and renew TLS certificates automatically. See [Custom domain](/mira/workflows/publish-landing-pages/custom-domain/).
- **Audit-log scheduled exports.** Weekly or daily exports to S3, GCS, or Azure Blob.

### Week of 2026-04-20

- **Bidirectional CRM sync — Salesforce.** Stage transitions and won/lost flow back into Mira; the [learning agent](/mira/concepts/agents/#learning-agent) uses these signals for variant attribution.
- **JSON catalog ingestion API.** Programmatic catalog ingestion alongside CSV and PIM connectors. See [Catalog ingestion API](/mira/developer-reference/catalog-ingestion-api/).

### Week of 2026-04-13

- **Side-by-side narrative variants.** Generate alternate versions of a section for narrative experiments. See [Variants & risky-claim flags](/mira/workflows/generate-gtm-kits/variants-and-risky-claim-flags/).
- **Comment threads on sections.** Per-version threading with mention support; resolved threads archive but stay recoverable.

### Week of 2026-04-06

- **Generation streaming.** Per-section progress events stream to the workspace UI as the [generation agent](/mira/concepts/agents/#generation-agent) runs.
- **Cost estimate dialog before generation.** Confirm expected token spend before triggering generation.

## Versioning

Webhook payloads and API endpoints follow semver per major version. See [Webhook payload formats — Versioning](/mira/developer-reference/webhook-payload-formats/#versioning).

## Subscribing

- **RSS / Atom**: `https://docs.hereai.com/mira/changelog.xml` (auto-generated)
- **Email**: opt in from **Settings → Notifications**
- **Slack**: configure the `mira-changelog` integration to post to a channel
