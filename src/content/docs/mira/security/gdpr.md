---
title: GDPR
description: Mira's GDPR posture — DPA, lawful basis, data-subject rights, EU data residency, and breach notification.
---

Mira processes data on behalf of its customers (the data controllers) and supports the obligations EU data protection law places on customers and processors alike.

## Data Processing Addendum (DPA)

A Data Processing Addendum is available on request and is part of the contract for any tenant on the **Enterprise** plan. The DPA covers:

- Roles (Mira as processor, customer as controller)
- Scope of processing (catalog data, generated kits, captured leads, outcome metrics)
- Standard Contractual Clauses (SCCs) for transfers outside the EEA
- Sub-processor list (see [Subprocessors](/mira/security/subprocessors/))
- Breach notification timelines (24 hours from awareness)

## Lawful basis on capture

Captured leads can include lawful-basis indicators submitted with the form:

- **Consent** — visitor explicitly opted in
- **Legitimate interest** — for B2B prospecting where applicable
- **Contractual necessity** — when capture is part of a service request

The lawful basis is stored on the lead record and propagated to the CRM webhook. See [Configure capture forms](/mira/workflows/capture-and-route-leads/configure-capture-forms/) for enabling these fields.

## Data-subject rights

Mira supports the following requests from data subjects (typically forwarded by your operations team):

- **Access** — export every record about a given email (`/scim/v2` admin tool, or via support ticket)
- **Rectification** — admin update via the workspace
- **Erasure / right to be forgotten** — see [Data handling & retention](/mira/security/data-handling-and-retention/#lead-data-deletion); the deletion is propagated to relevant subprocessors
- **Restriction** — flag a lead so it isn't routed or referenced in analytics
- **Portability** — CSV export of any tenant's lead data
- **Objection** — block lead from analytics and outbound

Each action lands in the [audit log](/mira/administration/audit-log/).

## EU data residency

Tenants on the **Enterprise** plan can select **EU data residency**. With EU residency:

- All tenant data is stored in `eu-west-1`.
- Backups remain in EU regions.
- The configured LLM provider must support an EU endpoint; Mira validates this at tenant setup.
- See [Subprocessors](/mira/security/subprocessors/) for the EU-resident processor list.

## Breach notification

If Mira detects a security breach affecting your tenant, you'll be notified within 24 hours of awareness. The notification includes:

- Scope (which tenants, which data types)
- Containment status
- Impact assessment
- Remediation steps in progress

You handle controller-level notification to data subjects.

## Related

- [Data handling & retention](/mira/security/data-handling-and-retention/) — deletion and retention mechanics
- [Subprocessors](/mira/security/subprocessors/) — third-party processors in the data path
- [Configure capture forms](/mira/workflows/capture-and-route-leads/configure-capture-forms/) — lawful-basis fields
