---
title: Multi-approver workflows
description: Configure who must sign off on which sections — for example PMM + legal + brand — with per-section approver assignment.
---

This guide shows how to require sign-off from multiple approvers before a kit can be published.

## Before you start

- Admin role
- Defined approver groups (the people or roles that must sign off — e.g. PMM, legal, brand)

## Steps

1. Open **Settings → Approval workflows**.
2. Click **New workflow**.
3. Pick the trigger scope — for example, **All products tagged "regulated"** or **All products in the EU region**.
4. Add approver requirements per section. Common patterns:

   - **Positioning**: PMM + legal
   - **Competitive angles**: PMM + legal
   - **Landing-page copy**: PMM + brand
   - **ICP / pillars / outbound**: PMM only

5. Set the order: parallel (any order) or sequential (PMM first, then legal, then brand). Sequential is useful when later approvers depend on earlier ones (e.g., legal reviews after positioning is final).
6. Save.

## Verify

- Open a product matching the trigger scope.
- The Review pane now shows each required approver per section.
- A section can't move to `approved` until every required approver has signed off.

## Per-product overrides

For exceptions, an Admin can override the workflow on a single product (e.g., a one-off launch under a tight deadline). Overrides are recorded in the [audit log](/mira/administration/audit-log/) with the override reason.

## Related

- [Risky-claim rules](/mira/workflows/review-and-approve/risky-claim-rules/) — what the approvers will see flagged
- [Re-approval & audit](/mira/workflows/review-and-approve/re-approval-and-audit/) — what happens after edits
- [Roles & permissions](/mira/administration/roles-and-permissions/)
