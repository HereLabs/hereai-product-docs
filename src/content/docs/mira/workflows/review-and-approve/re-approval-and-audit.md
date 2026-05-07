---
title: Re-approval & audit
description: How edits to approved kits flow — new versions in draft, the previously published version stays live until republish, every transition logged.
---

This guide shows what happens when you edit a section that's already been approved, and how to inspect the audit trail.

## Before you start

- A product with at least one approved kit and a published landing page

## Edit flow

1. Open an approved section.
2. Edit inline and save. Mira creates a new version starting at `draft`. The previously approved version stays in history, untouched.
3. The published page **doesn't change** — it's still pinned to the previously approved version.
4. Move the new draft through `pending → approved` (or `rejected`) the same way you handled the original.
5. Once approved, click **Republish** on the product to pin the new version to the live page.

## What this protects

Customer-facing surfaces never reflect a half-finished revision. A reviewer can experiment with a new draft for hours; nothing leaks until the new version is approved and you explicitly republish.

## Inspect the audit trail

Open **Administration → [Audit log](/mira/administration/audit-log/)** to see every transition. Filter by:

- **Resource** — a specific catalog entry, section, or page
- **Action** — `approve`, `reject`, `request-changes`, `claim.accepted`, `page.publish`, `page.unpublish`
- **Actor** — a specific user
- **Time range**

Each entry records the version id before and after, the actor, the timestamp, and any comment. Records are immutable; retention is at least 12 months.

## Verify

- After your edit, the section's history shows both versions.
- The published page still serves the previous version (open it to confirm).
- After republish, the page now serves the new version.
- Both transitions appear in the audit log.

## Related

- [Versioning & approval](/mira/concepts/versioning-and-approval/) — the full state machine
- [Audit log](/mira/administration/audit-log/) — what's captured
- [Multi-approver workflows](/mira/workflows/review-and-approve/multi-approver-workflows/) — re-approval also runs through configured workflows
