---
title: Audit log
description: Every action that changes tenant state is recorded — approvals, publishes, configuration changes, user events, catalog edits, and lead deletes. 12 months immutable.
---

Every action that changes tenant state in Mira is recorded in the audit log. Retention is at least 12 months and the log is immutable.

## What's recorded

- **Approval events** — approve / reject / request-changes on a section
- **Publish events** — publish / unpublish a page, with the artifact versions pinned
- **Configuration changes** — integrations, routing rules, billing settings
- **User events** — invites, role changes, removals, SSO logins
- **Catalog events** — entry edits and bulk operations
- **Lead deletes** (subject to GDPR)

## How it's used

- **On demand** — admins review the log per user, per resource, or per time window
- **Scheduled exports** — push the log to your SIEM or cold storage
- **Forensics** — trace any state change back to who did it and when

## Related

- [Roles & permissions](/mira/administration/roles-and-permissions/) — who can take which actions
- [Review & approve](/mira/workflows/review-and-approve/) — approvals are first-class audit events
