---
title: Webhook signing
description: HMAC-SHA256 signing details for Mira webhooks — header format, verification pseudocode, signing-key rotation, replay protection.
---

Every Mira webhook is signed with HMAC-SHA256 using a per-tenant signing secret. Verify the signature on your side before acting on the request.

## Headers

```
X-Mira-Signature: sha256=<hex>
X-Mira-Timestamp: 2026-05-06T12:34:56Z
X-Mira-Event: lead.captured
```

## Signing input

The signed value is the **raw request body** as bytes. Mira does not include the timestamp in the HMAC input — it's in a separate header for replay protection (see below).

## Verification

Pseudo-code (any language):

```
def verify(headers, body_bytes, secret):
    provided = headers["X-Mira-Signature"].split("=", 1)[1]
    expected = hex(hmac_sha256(secret, body_bytes))
    if not constant_time_equal(expected, provided):
        return False
    if abs(now_utc() - parse_iso8601(headers["X-Mira-Timestamp"])) > 300:
        return False  # reject if older than 5 minutes
    return True
```

### Why constant-time compare

`==` on string hashes leaks timing information. Use:

- Python: `hmac.compare_digest`
- Node: `crypto.timingSafeEqual`
- Go: `subtle.ConstantTimeCompare`
- Rust: `subtle::ConstantTimeEq`

### Why timestamp check

Without it, an attacker who captures one signed request could replay it indefinitely. The 5-minute window allows for clock skew without permitting replay attacks.

## Per-tenant secrets

Each tenant has its own signing secret. Mint or view the secret in **Settings → Integrations → Signing keys**. The full secret is shown once at issuance; only the prefix is shown afterward.

## Rotation

1. Open **Settings → Integrations → Signing keys → Rotate**.
2. Mira issues a new secret. Copy it.
3. The old secret remains valid for 24 hours so your endpoint can roll over.
4. After your endpoint is using the new secret, click **Revoke old**.

During rotation, Mira sends webhooks signed with the new secret only; the old secret is accepted on inbound verification (e.g., for SCIM) only if you've explicitly opted in to dual-key acceptance.

## Don't trust unsigned webhooks

Mira sends signed webhooks for every supported destination. If you see an unsigned webhook claiming to be from Mira, reject it — it's not.

## Related

- [Webhook payload formats](/mira/developer-reference/webhook-payload-formats/)
- [Generic webhook](/mira/integrations/generic-webhook/) — the integration that surfaces these signatures
- [Replay & bidirectional sync](/mira/workflows/capture-and-route-leads/replay-and-bidirectional-sync/) — what happens when a webhook fails
