---
title: Re-import & change detection
description: How Mira detects what changed between imports — per-row hashing, stale flags, and bounded regeneration cost.
---

This guide explains what happens when you re-import a catalog and how to scope regeneration to just the entries that changed.

## How it works

Each catalog entry stores a **content hash** computed from its source fields. When you re-import (CSV upload, JSON API push, or connector sync):

1. Mira hashes each incoming row.
2. Rows whose hash matches an existing entry are no-ops.
3. Rows whose hash differs become a new version of that entry, and the entry is marked **stale**.
4. New rows become new catalog entries in `imported` state.

A stale entry's existing artifacts (kits, published pages) **stay live** — they don't disappear. Only when you regenerate are new artifacts produced.

## Steps to scope regeneration

1. Filter the catalog list by **State: stale**.
2. Select the entries you want to refresh.
3. Click **Bulk regenerate**.
4. Each entry's kit regenerates with the new source fields; previous artifact versions stay in history.

## Verify

- After regeneration, each entry's state moves from `stale` to `imported` (clean).
- New artifact versions appear in version history; previously approved versions remain pinned to any published pages until you republish.

## Why it matters

The hash-based detection means regeneration cost is **bounded to what actually changed**. A catalog of 200 products with 3 edits costs 3 regenerations, not 200.

## Related

- [Import from CSV](/mira/workflows/onboard-your-catalog/import-from-csv/)
- [Import via JSON API](/mira/workflows/onboard-your-catalog/import-via-json-api/)
- [Generate GTM kits](/mira/workflows/generate-gtm-kits/) — what regeneration runs
