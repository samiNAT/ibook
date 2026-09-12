---
id: 0012
status: ready-for-review
owner: ibook-pm
inputs: [docs/prd.md]
updated: 2026-09-12
---

# Intent 0012 — Divisible rooms

Derived from PRD requirement 0012, rank 11.

PROBLEM:  Plenty of small offices have one big room with a folding wall down the middle,
          used as one space some days and as two the rest. On a spreadsheet there is no
          way to express that, so the manager either lists it as one room and loses half
          its capacity, or lists it as two and lets someone book a half while a
          company-wide meeting is booked across the whole thing. Either way the
          spreadsheet lies, and the people who find out are standing in the doorway.
USER:     The manager, who knows which room has the divider and has to describe it once
          at setup; and every member booking afterwards, who should never have to hold
          that geometry in their head.
OUTCOME:  The manager says once that a room divides in two. From then on the app refuses
          to let the whole room and either of its halves be held at the same time, while
          still letting two different members take the two halves for the same hour. No
          member has to know which rooms overlap.
SUCCESS:  During the first week at a customer with a declared divisible room, at least
          one booking is refused for overlapping a room the member did not name, and no
          member reports arriving to find someone else in the space they had booked.
LIMITS:   A room divides into exactly two halves, declared once at setup. Declaring a
          room divisible must not change what the company is billed or count extra
          against the 20-room cap — it is one physical room however it is booked. The
          app enforces the exclusivity rule only; it never claims to know where the wall
          actually is, and must not ask anyone to keep it posted. Rooms with no divider
          must behave exactly as they do today.
NOT NOW:  Rooms that divide into three or more, tracking whether a divider is currently
          open or closed, scheduling when a room is combined or split, prompting the
          holders of two halves to give way to someone who wants the whole room, and
          zones or any other grouping of separate rooms.

## Open questions
- Does check-in and auto-release work per half, and if one half is released while the
  other is checked in, what exactly becomes free? See docs/prd.md open question 15.
- Does a divisible room show on the availability view as one entry that opens to reveal
  its halves, or as three entries? See docs/prd.md open question 16.
- Does each half carry its own capacity, and must the halves add up to the whole? See
  docs/prd.md open question 17.
- Can a manager make a room divisible after members have already booked it, and what
  happens to bookings that exist at that moment?
