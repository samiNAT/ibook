---
id: 0006
status: ready-for-review
owner: ibook-pm
inputs: [docs/prd.md]
updated: 2026-09-12
---

# Intent 0006 — Cancellation

Derived from PRD requirement 0006, rank 6.

PROBLEM:  On a spreadsheet, cancelling a booking means someone has to remember to erase
          the entry, and often nobody does, so the room reads as busy when it's actually
          free.
USER:     An approved member who booked a room and no longer needs it.
OUTCOME:  The member cancels in the app and the room shows as available to everyone else
          immediately.
SUCCESS:  A cancelled booking's room shows as free to a second device within 15 seconds,
          verified manually at least once during the first week of use.
LIMITS:   A member can only cancel their own bookings, not another member's.
NOT NOW:  Manager-initiated cancellation of someone else's booking, cancellation
          reasons/notes, partial/split-time cancellation.

## Open questions
- None beyond docs/prd.md.
