---
id: 0005
status: ready-for-review
owner: ibook-pm
inputs: [docs/prd.md]
updated: 2026-09-12
---

# Intent 0005 — Instant conflict-free booking

Derived from PRD requirement 0005, rank 5.

PROBLEM:  On a spreadsheet, two people can book the same room for the same time because
          edits silently overwrite each other, and nobody finds out until they both show
          up.
USER:     Any approved member trying to reserve a room for a specific time.
OUTCOME:  A member can book a free room and know immediately it's theirs; a member who
          tries to book an already-booked slot is told so immediately and cannot create
          the conflict.
SUCCESS:  Zero double-bookings occur across the first week of live usage, verified by
          manager report or booking log review.
LIMITS:   Must resolve the conflict at the moment of the booking attempt, not after the
          fact.
NOT NOW:  Recurring bookings, booking on behalf of someone else, waitlisting for a full
          room.

## Open questions
- None beyond docs/prd.md.
