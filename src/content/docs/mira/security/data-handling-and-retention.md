---
title: Data handling & retention
description: Encryption at rest and in transit, retention windows for catalog data, kits, leads, and metrics, and tenant-configurable controls.
---

Mira encrypts all customer data at rest and in transit, with retention windows configurable per tenant where the data type allows.

## Encryption

| State | Standard |
| --- | --- |
| At rest | AES-256-GCM at the storage layer |
| In transit | TLS 1.3 (TLS 1.2 acceptable for legacy clients); HSTS on all hostnames |
| Backups | Encrypted with a separate KMS key; 30-day retention |
| Secrets (API keys, signing keys) | Stored in tenant-scoped secret storage; rotatable on demand |

Customer-managed keys (CMK) are available on the **Enterprise** plan.

## Retention defaults

| Data type | Default retention | Configurable? |
| --- | --- | --- |
| Catalog entries | Indefinite while the tenant is active | No |
| Kits and artifact versions | Indefinite | No (history is the audit trail) |
| Captured leads | 24 months | Yes (per tenant) |
| Routing events | 24 months | Yes |
| Metric events | 36 months | Yes |
| Audit log | 12 months minimum, indefinite by default | Lower bound only |

## Lead-data deletion

When a captured lead's email matches a deletion request:

1. The lead record is soft-deleted (referenced rows preserve referential integrity).
2. PII fields (name, email, company, custom-field values) are erased.
3. The product context, page URL, and routing-event metadata remain (they describe the *interaction*, not the *person*).
4. The deletion is recorded in the [audit log](/mira/administration/audit-log/) under `lead.delete`.

Hard-delete (with referential integrity broken) is available on request for tenants whose contracts require it.

## Backups and recovery

- Daily incremental backups, weekly fulls
- 30-day backup retention
- Tested restore quarterly
- Recovery point objective (RPO): 1 hour
- Recovery time objective (RTO): 4 hours

## Data residency

Default region: US (`us-east-1`). EU data residency (data stored in `eu-west-1`) is available on the **Enterprise** plan and required for GDPR-sensitive deployments. See [GDPR](/mira/security/gdpr/).

## Related

- [GDPR](/mira/security/gdpr/) — lawful basis and data-subject rights
- [Subprocessors](/mira/security/subprocessors/) — third parties in the data path
- [Audit log](/mira/administration/audit-log/) — what changed and when
