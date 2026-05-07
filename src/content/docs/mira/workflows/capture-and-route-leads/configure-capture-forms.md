---
title: Configure capture forms
description: Configure form fields, validation, GDPR fields, dedupe windows, and spam protection per published page.
---

This guide shows how to set up the capture form on a published landing page.

## Before you start

- A page being published (or already published — forms can be reconfigured without republishing the kit)
- Editor role

## Field configuration

Default fields:

- **Name** — required
- **Email** — required, validated
- **Company** — optional
- **Question** — optional, free text

Add custom fields per page from a typed library:

- **Text** (single line)
- **Long text** (multi-line)
- **Phone** (validated by region)
- **Picklist** (single-select)
- **Multipicklist** (multi-select)
- **Number**
- **Boolean** (checkbox)

Custom field values flow into the lead record and the [CRM webhook payload](/mira/integrations/generic-webhook/).

## GDPR-aware fields

For tenants subject to GDPR or similar regimes, enable:

- **Lawful-basis selector** — let the visitor pick their basis (e.g., consent, legitimate interest)
- **Opt-in checkbox** — for marketing communications, separate from the form submission
- **Data-retention disclosure** — short text linking to your privacy policy

These options are tenant-defaulted and can be overridden per page.

## Dedupe windows

Set the dedupe window per tenant in **Settings → Lead capture**:

- Default: 7 days
- Range: 0 (no dedupe) to 90 days

Dedupe key is `tenant + email`. Within the window, repeat submissions update the existing lead instead of creating a new one.

## Spam protection

- **Rate limiting** — max submissions per IP per minute (tenant-set)
- **CAPTCHA** — optional; enable for high-traffic pages
- **Honeypot field** — always on; invisible to humans, captured submissions are silently dropped

## Verify

- Submit the form from a private window with dummy data.
- Check **Capture & route → Recent leads**; the submission appears within seconds.
- Submit again with the same email; verify it dedupes.

## Related

- [Routing rules](/mira/workflows/capture-and-route-leads/routing-rules/) — what happens after capture
- [Generic webhook](/mira/integrations/generic-webhook/) — payload shape including custom fields
