---
id: 0010
status: ready-for-review
owner: ibook-pm
inputs: [docs/prd.md]
updated: 2026-09-12
---

# Intent 0010 — One-way sync of a booking, and its later changes, to the booker's calendar

Derived from PRD requirement 0010, rank 12.

PROBLEM:  A member who books a room here but lives in their personal calendar for
          everything else has no record of the booking anywhere they would normally look
          for it, and so risks double-booking their own time against a room they
          themselves reserved. A booking that syncs once and then never again is worse
          than none at all: cancel the room, or lose it to a no-show release, and the
          calendar still shows a meeting in a room that somebody else is now sitting in.
USER:     An approved member who signed in with a method that carries a calendar, and
          who plans their day in that calendar rather than in this app.
OUTCOME:  A booking the member makes here appears on their own personal calendar
          automatically, and stays truthful for as long as it exists — when the booking
          is cancelled or auto-released, the calendar stops showing it too. Nothing to
          configure, and nothing to tidy up by hand.
SUCCESS:  A member who books a room with a sync-capable sign-in sees the event on their
          personal calendar without asking anyone how, and a member who cancels sees it
          disappear, both verified for at least one booking in the first week of use.
LIMITS:   One-way only — this app remains the sole source of truth for room
          availability, and nothing done in another calendar can create, move, cancel or
          block a booking here. The event goes to the booker's own calendar only, never
          to a shared or company-wide one. A member whose sign-in method carries no
          calendar must still be able to book normally, with no error and no dead end.
NOT NOW:  Two-way sync, sync for sign-in methods that carry no calendar, syncing to a
          shared company or resource calendar, and inviting other attendees to the
          synced event.

## Open questions
- Members whose sign-in method carries no calendar get no sync at all — is that the
  complete answer, or should they be told why? See docs/prd.md open question 9.
- When a booking is auto-released for a no-show, should the event be deleted outright or
  left marked as cancelled? See docs/prd.md open question 18.
- If the member edits or deletes the synced event in their own calendar, the booking
  here is unaffected — one-way means exactly that. Should they be warned of that the
  first time, or is a silent divergence acceptable?
