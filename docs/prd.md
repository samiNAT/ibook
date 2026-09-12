---
id: prd
status: ready-for-review
owner: ibook-pm
inputs: [pitch.txt, CLAUDE.md]
updated: 2026-09-12
---

# PRD — Room Reservation App

## 1. Problem

Office/facilities managers at small-to-medium businesses (roughly 5–20 meeting rooms)
manage room bookings via shared spreadsheets or basic calendar invites. This causes
double-bookings, because edits to a shared file silently overwrite each other, and rooms
that sit reserved-but-empty, because a no-show never releases its slot. Enterprise tools
solve both problems but require an IT-led rollout, per-room hardware, and calendar-suite
licensing that doesn't make sense at this size, so these businesses stay on spreadsheets.

## 2. Users

### Facilities/office manager
Runs the company account: signs up, adds rooms, approves who can join, and holds the
subscription. Has no dedicated IT or facilities-software budget and no one to file a
ticket with — whatever they can't do themselves in the app doesn't get done.

### Approved member (employee)
A coworker who books and cancels rooms once the manager has approved them. Has no admin
capability — no room setup, no approving other members, no billing access.

## 3. Journeys

### Manager self-serve setup
1. Manager signs up and gives a company name and roughly how many meeting rooms they
   have.
2. Manager adds rooms (name + capacity), and says which of them can be divided in two.
3. Manager gets a shareable company join link.
4. Manager is shown the monthly price for the rooms they added and enters card details
   to start a one-week free trial.
End state: the company exists with an active trial, its rooms are visible on the
availability screen, and the manager has a link to hand to coworkers — with no ticket
filed and no one else involved.

### Employee joins and books first room
1. Employee opens the company's join link and signs in.
2. Employee lands in a pending-approval state — can see the app, can't book yet.
3. Manager is notified of the join request and approves with one tap.
4. Employee books a free room and sees it reflected on the availability screen
   immediately.
5. Employee can cancel that booking from the same screen if plans change.
End state: the employee is a full member who can book and cancel on their own, and —
where their sign-in method supports it — sees the booking on their own personal calendar.

### Check-in, or the room comes back
1. A booking's start time arrives and the booker gets a check-in prompt, on whichever
   device they have with them.
2. If the booker checks in with one tap, the room reads as occupied to everyone else for
   the rest of the booked slot.
3. If nobody has checked in once the grace period elapses, the booking is released
   automatically.
4. The room reads as free again and is booked by someone else.
End state: every room's state tells the truth about whether anyone is actually in it,
and a room that would have sat empty on a spreadsheet is back in circulation without any
manager noticing or intervening — with nothing mounted on any wall to make that happen.

### Trial converts to a paid subscription
1. The manager has entered card details and the one-week trial is running.
2. Before the trial ends, the manager is told it is about to end and what the first
   charge will be.
3. If the manager does nothing, the card is charged when the trial ends and the
   subscription continues uninterrupted.
4. If the manager cancels before the trial ends, nothing is charged and the company
   stops being able to book.
End state: the company is either paying without anyone on the vendor side lifting a
finger, or has left without being charged — either way with no sales call, order form or
manually issued invoice.

## 4. Requirements

Every row gets an ID. That ID becomes the intent, the spec and the validation.

| ID | Rank | Requirement | Serves journey | Intent |
|------|------|-------------|----------------|--------|
| 0001 | 1 | Manager account & company setup (company name + room count) | Manager self-serve setup | docs/intents/0001-manager-account-setup.md |
| 0002 | 2 | Room setup (name + capacity) | Manager self-serve setup | docs/intents/0002-room-setup.md |
| 0003 | 3 | Team join & approval | Employee joins and books first room | docs/intents/0003-team-join-and-approval.md |
| 0004 | 4 | Live availability view (free / booked / occupied) | Employee joins and books first room; Check-in, or the room comes back | docs/intents/0004-live-availability-view.md |
| 0005 | 5 | Instant conflict-free booking | Employee joins and books first room | docs/intents/0005-instant-conflict-free-booking.md |
| 0006 | 6 | Cancellation | Employee joins and books first room | docs/intents/0006-cancellation.md |
| 0007 | 7 | Check-in marks a room occupied; no-show auto-release | Check-in, or the room comes back | docs/intents/0007-no-show-auto-release.md |
| 0008 | 8 | Notifications (confirmation, reminder, release notice, trial-ending notice) | Check-in, or the room comes back; Trial converts to a paid subscription | docs/intents/0008-notifications.md |
| 0009 | 10 | Card-on-file trial & self-serve subscription billing | Manager self-serve setup; Trial converts to a paid subscription | docs/intents/0009-self-serve-billing.md |
| 0010 | 12 | One-way sync of a booking, and its later changes, to the booker's own personal calendar | Employee joins and books first room | docs/intents/0010-oneway-calendar-sync.md |
| 0011 | 9 | Room-count pricing & 20-room cap | Manager self-serve setup; Trial converts to a paid subscription | docs/intents/0011-room-pricing-and-cap.md |
| 0012 | 11 | Divisible rooms — booking a whole room and its halves without conflict | Manager self-serve setup; Employee joins and books first room | docs/intents/0012-divisible-rooms.md |

## 5. Acceptance

| ID | Countable criterion |
|------|---------------------|
| 0001 | A first-time visitor can complete signup, enter a company name and a room count, and reach the room-setup screen in under 2 minutes on the deployed URL, without contacting anyone. |
| 0002 | A manager can add a room with a name and a capacity number and see it appear on the availability list within 5 seconds, without contacting anyone outside the app. |
| 0003 | A person who is not yet an approved member can open the company join link, sign in, and see a pending-approval screen; once the manager taps approve, that person can complete a booking within 2 minutes of approval. |
| 0004 | An approved member can open the availability view on a phone and on a desktop and see every room in the correct one of three states — free, booked (nobody has checked in yet), or occupied (someone checked in) — refreshed at least once every 15 seconds, or as soon as the member returns to the screen. Checked on both a phone and a desktop with the same room in each of the three states. |
| 0005 | When two members attempt to book the same room for an overlapping time slot, the first request succeeds and the second is rejected with a conflict message, in 20 out of 20 concurrent-attempt trials. |
| 0006 | A member who owns a booking can cancel it, and the room shows as available to a second device within 15 seconds. |
| 0007 | In a pre-launch test company: a booking checked in within the grace period is never released, and the room reads as occupied to a second member's device within 15 seconds, in 5 out of 5 trials; a booking left unchecked past its configured grace period is released within 1 minute of the grace period elapsing and reads as free to other members with no manager action, in 5 out of 5 trials. Check-in is completed from a phone and from a desktop, with no equipment in the room involved in either case. Confirmed again for at least one real booking during the first two weeks of use. |
| 0008 | In a pre-launch test company, a confirmation, a reminder, a release notice and a trial-ending notice are each delivered to their recipient on at least one channel, and each is still delivered when the member's primary channel is switched off. Across the first week of live use, every booking generates at least one delivered confirmation notification, and (where applicable) a reminder and a release notice, verified by delivery log review; and every company in a trial receives at least one trial-ending notice naming the first charge amount, delivered at least 24 hours before the trial ends. |
| 0009 | In a pre-launch test company: entering card details at the end of setup marks the trial active with an end date exactly 7 days later; a company whose trial expires without cancellation is charged its room-count price within 24 hours of expiry and keeps booking access; a company that cancels before expiry is charged nothing and cannot create a booking after expiry; and a company with no active trial or subscription cannot create a booking at all. All four checked before launch, and at least one real company completes the uncancelled path with no manual intervention within the first month of launch. |
| 0010 | In a pre-launch test account, a member whose sign-in method supports calendar sync books a room and the event appears on that member's own personal calendar within 5 minutes of confirmation with no manual sync step; cancelling that booking removes or visibly cancels the event within 5 minutes; a booking auto-released for no-show does the same; and a member whose sign-in method does not support sync books successfully and is shown no error. All four confirmed before launch, and the create and the cancel paths confirmed again for at least one real booking in the first week of use. |
| 0011 | The monthly price shown for a company with 3 rooms is $49, for 10 rooms is $154, and for 20 rooms is $304 — matching $49 for the first 3 rooms plus $15 for each room beyond the third. An attempt to add a 21st room is refused with a message naming the 20-room limit, in 3 out of 3 trials. Adding or approving members never changes the price, checked at 1 member and at 50 members for the same room count. Marking a room as divisible never changes the price either, checked before and after on the same company. |
| 0012 | In a pre-launch test company with one room declared divisible into two halves: booking the whole room leaves both halves unbookable for that time, and booking either half leaves the whole room unbookable for that time, in 10 out of 10 concurrent-attempt trials; two different members can hold the two halves for the same time, in 5 out of 5 trials; and the availability view never shows the whole room and either of its halves as free at the same moment. A room not declared divisible behaves exactly as it does today, checked against one undivided room in the same company. |

## 6. Out of scope

- Zones and floor/building groupings — v1 targets 5–20-room offices where a flat room
  list is enough; revisit if customers with larger footprints ask. Divisible rooms
  (requirement 0012) are not zones: a zone groups rooms for browsing, whereas a divider
  creates an exclusivity rule between one room and its halves. The flat list stays flat.
- Rooms that divide into more than two — v1 handles a single divider making two halves,
  which is the common case; a room with two dividers is a different model and would have
  to wait.
- Tracking whether a divider is actually open or closed right now, and scheduling when a
  room is combined or split — the app enforces that a room and its halves are never
  double-booked and leaves the physical wall to whoever booked it. Anything more is a
  second thing for the manager to keep accurate, and it goes stale the moment someone
  moves the wall without saying so.
- Approval workflows for individual bookings (beyond the one-time join approval) — the
  v1 wedge is radical simplicity against incumbents' configurable approval chains.
- Analytics/utilization dashboards — not needed to prove the core booking/no-show loop
  works.
- Recurring bookings — keeps the v1 booking model to a single, easy-to-reason-about case.
- Multi-location support — target customer has one office.
- Booking from inside a chat tool — an integration surface not worth building before the
  core product is validated.
- Two-way calendar sync — one-way keeps the app as sole source of truth without
  conflict-resolution complexity.
- Apps downloaded from an app store — v1 is reached from any phone or desktop without a
  download, which avoids store submission entirely.
- Any equipment in the room itself — door panels, wall screens, badge readers, occupancy
  sensors. Booking, check-in and the occupied state all happen in the app on the member's
  own phone or desktop. This is the whole reason a manager can roll the product out
  without a purchase order, an installer or an IT project, so nothing in v1 may assume a
  device in the room exists.
- Companies needing more than 20 rooms — above that the flat room list and the single
  pack both stop fitting, and the customer is no longer the one this product targets.
- Per-user or per-seat pricing — the pack is priced per room with unlimited members, so
  the manager never has to decide who is worth a licence.
- More than one plan or tier, annual billing, discounts and coupon codes — one pack with
  one published price is the whole point of the pricing wedge.
- Paid add-ons and metered usage — nothing in v1 is billed by consumption.

## 7. Constraints

| Constraint | Source | Note for the architect |
|------------|--------|------------------------|
| Frontend and backend in TypeScript, single Next.js project (UI + API routes together) | user | Already decided in CLAUDE.md — plan routing/API layer accordingly. |
| Auth via Auth.js (NextAuth): Google OAuth as primary (enables calendar sync), email/magic-link as fallback | user | Google sign-in is also the gate for requirement 0010 (calendar sync). |
| Database: PostgreSQL via Amazon RDS or Aurora Serverless v2 | user | — |
| Hosting: AWS Amplify Hosting | user | — |
| Billing processor: Stripe Checkout + Billing | user | Backs requirements 0009 and 0011. The card is captured at the end of setup, before the trial starts, and the subscription converts automatically at day 7 unless cancelled — so the processor must support trials with a card on file and scheduled first charges, not just immediate checkout. |
| Pricing is fixed at $49/month for the first 3 rooms plus $15/month per additional room, capped at 20 rooms, with unlimited members | user | Price depends on room count only. A room that can be divided counts as one room however it is booked, so partitioning must not touch the billed count or the 20-room cap. Room count changes must be reflected in what the company is billed — see open question 2 for when that change takes effect. |
| Trial is 7 days, starts when the card is captured, and converts automatically unless cancelled | user | Backs requirement 0009. Booking must be blocked for any company without an active trial or subscription. |
| Notifications: Web Push (Service Worker + Push API) primary, Amazon SES email fallback | user | iOS only supports web push after the PWA is added to the home screen (Apple platform restriction) — onboarding must prompt this on iOS, or requirement 0008's "no channel without a fallback" limit isn't met on iOS. |
| Live availability via polling/refresh (10–15s or on focus), not WebSockets, for v1 | user | Backs the refresh interval named in requirement 0004's acceptance line. |
| Responsive web app only for v1 — no native iOS/Android; installable as a PWA | user | Check-in and the occupied state both happen in this app on the member's own device. There is no in-room panel, screen or sensor to build against, integrate with, or fall back to — see Out of scope. |

## 8. Risks

| Risk | Likelihood | What would tell us early |
|------|-----------|--------------------------|
| Asking for a card before the trial starts could stop evaluators who would otherwise have tried the product | High | Drop-off rate between reaching the card screen and starting a trial, across the first 20 signups |
| A 7-day trial may be too short for an office to get coworkers approved and actually book rooms, so the trial converts on a company that never saw the product work | Medium | Share of trials that reach a first booking by a non-manager member before day 7 |
| Automatic charging at trial end, rather than an explicit purchase, could produce disputes and chargebacks from managers who forgot | Medium | Refund requests or chargebacks in the first month, and whether they cite not knowing they would be charged |
| The published price ($49 for 3 rooms, $15 per room after) is a decision, not a validated number, and the 20-room cap turns away anyone larger | Medium | Whether the first 5 self-serve signups convert at the published price without asking for a discount, and how many enquiries name a room count above 20 |
| Members on one major phone platform may end up with no working notification channel, because the primary channel there needs a manual setup step most people will skip — which would silently break the no-show check-in for them | Medium | Share of members who received no delivered notification in their first week, split by phone platform |
| Syncing only to the calendar tied to one sign-in method may read as incomplete next to incumbents, at companies whose staff keep their day somewhere else | Medium | Signup drop-off, or support requests asking for a different calendar to be supported, during trial |
| The app enforces that a divisible room and its halves are never double-booked, but it does not know where the physical wall actually is — two members can hold the two halves while the divider stands open, or one can book the whole room while it is closed | Medium | Complaints or support requests about a divider being in the wrong position, in the first month at any customer that declared a divisible room |
| Divisible rooms are the first spatial configuration in a product pitched on having none, and every follow-on request (three-way splits, divider schedules, zones) will cite it as precedent | Medium | Whether the next five feature requests from trial customers ask for more spatial configuration rather than for the core loop |
| Auto-release could reclaim a room from a meeting that is genuinely happening — the booker is running late, or is sitting in the room but never saw the check-in prompt. With no panel at the door, check-in depends entirely on someone having their own device to hand and noticing it | Medium | Share of auto-released bookings where the booker afterwards says the meeting did take place, plus complaints tied to auto-released bookings in the first two weeks |

## 9. Open questions

1. What is the v1 success metric — the concrete, countable go/no-go signal (e.g., paying
   customer count, active-usage threshold) decided before or shortly after launch? The
   pitch explicitly leaves this TBD.
2. When a manager adds or removes a room mid-cycle, does the bill change immediately
   (prorated) or at the next renewal? Adding a room is the common case and the answer
   decides whether room setup can stay as simple as it is today.
3. If the card is declined when the trial ends, does the company lose booking access
   immediately, or is there a grace period — and how long, with how many retries?
4. If a manager cancels during the trial, do they keep access until the trial's original
   end date, or does access stop at the moment they cancel?
5. The price at the card step is based on the rooms the manager actually added, so the
   room count captured back at signup is not what anyone is billed on. What is that
   count for, then — sizing the offer up front, segmentation, pre-creating that many
   rooms — or should it be dropped from signup entirely?
6. Is the published price USD-only, and who is responsible for sales tax or VAT on it?
   This decides whether a non-US company can self-serve at all.
7. How long is the no-show grace period, and is it a single fixed value for all rooms/
   companies, or configurable per room or per company?
8. What happens if a booker cancels or checks in at the exact moment the grace period
   elapses — which one wins? Undefined edge case.
9. Members whose sign-in method does not support calendar sync get none at all — should
   they see any calendar-related information, or be told why, or is "no sync, no
   mention" the complete answer for that path?
10. Can a company have more than one manager, or is the manager role strictly limited to
    one person per company? The pitch only ever describes a single manager acting.
11. Can a member check in before the booked start time — walking into a free room a few
    minutes early — or is check-in only possible from the start time onward?
12. Is there a check-out? Once checked in, a room stays occupied for the rest of the
    booked slot, so a meeting that finishes early leaves the room reading as occupied
    while it is actually empty — the same waste this product exists to remove, only at
    the other end of the booking.
13. Can anyone check in to a booking, or only the member who made it? A colleague
    arriving first cannot rescue the room under a booker-only rule.
14. If a booking is auto-released and the original booker then turns up while the room is
    still free, do they get it back automatically, or must they rebook like anyone else?
15. Does check-in and auto-release (requirement 0007) work per half? If one half is
    released for a no-show while the other is checked in, the whole room cannot come
    back — so what exactly becomes free, and what does the availability view then show?
16. Does a divisible room appear on the availability view as one entry that opens up to
    reveal its halves, or as three entries side by side? Three entries is the honest
    model but triples what the member scans past on a phone, against requirement 0004's
    at-a-glance bar.
17. Does each half get its own capacity, and must the two halves' capacities add up to
    the whole room's? A manager who enters 20, 8 and 8 has said something contradictory
    and nothing currently catches it.
18. When a booking is auto-released for a no-show, should its calendar event be deleted
    outright or left behind marked as cancelled? Deleting it silently removes the only
    trace the booker had that they ever held the room.
