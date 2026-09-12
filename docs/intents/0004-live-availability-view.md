---
id: 0004
status: ready-for-review
owner: ibook-pm
inputs: [docs/prd.md]
updated: 2026-09-12
---

# Intent 0004 — Live availability view

Derived from PRD requirement 0004, rank 4.

PROBLEM:  On a spreadsheet, a member can't tell at a glance which rooms are actually
          free right now, especially if someone else edited the sheet minutes ago. Even
          a correct spreadsheet only says a room is claimed — it never says whether
          anyone is in it, so the member still has to walk over and look through the
          glass.
USER:     Any approved member (manager or employee) who wants a room, checking from a
          phone in a hallway or from a desktop at their desk.
OUTCOME:  Opening the app shows each room as free, booked but not yet checked into, or
          occupied by someone who has checked in — close enough to real time, and
          honest enough about the middle case, that the member trusts it instead of
          walking the corridor.
SUCCESS:  During the first week of use, no member reports (verbally or via support)
          finding a room's real state different from what the app showed.
LIMITS:   Must work on both a phone and a desktop with nothing to install, and must
          reflect changes within the refresh window the product uses rather than pushing
          them live. The three states must be distinguishable at a glance on a phone,
          including for a member who cannot rely on colour alone. Nothing on this screen
          may depend on a device in the room reporting anything.
NOT NOW:  Floor-plan and visual maps, filtering by capacity or amenity, utilization
          analytics, and showing who booked or who checked in.

## Open questions
- A room that is booked but not yet checked into is not bookable by anyone else, yet it
  is also not in use. Should the view say anything about how long is left before it
  would be auto-released, or is that more detail than the glance is worth?
- If a meeting ends early there is no way to say so, so the room reads as occupied until
  its slot ends. See docs/prd.md open question 12.
