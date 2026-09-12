---
id: 0008
status: ready-for-review
owner: ibook-pm
inputs: [docs/prd.md]
updated: 2026-09-12
---

# Intent 0008 — Notifications

Derived from PRD requirement 0008, rank 8.

PROBLEM:  Without a prompt at the right moment, members forget to confirm they're using
          a room, forget upcoming bookings, and don't know when a room they wanted
          opened up — and a manager whose trial ends silently gets charged without
          warning, which reads as a trick rather than a purchase.
USER:     Any approved member with an active or upcoming booking, or waiting on a room
          that just got released; and the manager whose trial is about to convert.
OUTCOME:  The member is told, through at least one channel that reaches them, when their
          booking is confirmed, shortly before it starts, and if it gets released — and
          the manager is told their trial is ending, and what they are about to be
          charged, in time to do something about it.
SUCCESS:  Across the first week of live use, every booking generates at least one
          delivered confirmation notification, and every trial that reaches its final
          day generated a trial-ending notice at least 24 hours earlier, both verified
          by delivery log review.
LIMITS:   Must still reach the member when one channel is unavailable or was never set
          up — including on phones where the primary channel needs a setup step the
          member will probably skip. No notification type may depend on a single channel
          with no fallback. The trial-ending notice carries money consequences,
          so it must go out on a channel that does not depend on the manager having set
          anything up.
NOT NOW:  Notification preference controls, digest/summary notifications, SMS as a
          channel.

## Open questions
- Is one trial-ending notice enough, or should there be a second one on the final day?
  The PRD sets a floor of one, at least 24 hours out, and does not settle the rest.
