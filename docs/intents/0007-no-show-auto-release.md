---
id: 0007
status: ready-for-review
owner: ibook-pm
inputs: [docs/prd.md]
updated: 2026-09-12
---

# Intent 0007 — Check-in marks a room occupied; no-show auto-release

Derived from PRD requirement 0007, rank 7.

PROBLEM:  On a spreadsheet, or even in most calendar tools, a booked room that nobody
          actually uses stays reserved-but-empty for its full slot, because nothing
          notices the no-show. And nothing anywhere distinguishes a room someone is
          sitting in from a room someone merely claimed, so every other member has to
          treat both the same.
USER:     Any approved member who booked a room and either turns up, doesn't, or is
          running late — and every other member who wanted that room during that slot.
OUTCOME:  One tap at the start of a meeting does two things: it tells everyone else the
          room is genuinely in use, and it keeps the booking. Skip it, and the booking
          releases itself after a grace period so the room becomes bookable again,
          without a manager having to notice or intervene.
SUCCESS:  During the first week of use, at least one no-show booking is auto-released
          and rebooked by someone else, and at least one checked-in booking is seen as
          occupied by a second member, both verified by booking log review.
LIMITS:   Must not release a booking before its configured grace period has elapsed, and
          the member must be able to keep their booking with a single tap. Check-in has
          to be possible from the member's own phone or desktop alone — there is no
          panel, screen or sensor in the room, and v1 must never assume one, so the
          prompt has to reach the member wherever they are.
NOT NOW:  Manager override of an in-progress grace period, per-member no-show history or
          reporting, escalating penalties for repeat no-shows, and any automatic
          occupancy detection that would infer use without someone tapping.

## Open questions
- How long is the grace period, and is it fixed globally or configurable per room/
  company? See docs/prd.md open question 7.
- What happens if a cancellation and a check-in confirmation arrive at the exact moment
  the grace period elapses? See docs/prd.md open question 8.
- Can a member check in before the booked start time? See docs/prd.md open question 11.
- Is there a check-out, or does a room stay occupied for the whole slot even when the
  meeting finishes early? See docs/prd.md open question 12.
- Can any member check in to a booking, or only the one who made it? See docs/prd.md
  open question 13.
- If a released booking's original booker turns up while the room is still free, do they
  get it back or must they rebook? See docs/prd.md open question 14.
