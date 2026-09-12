---
id: 0009
status: ready-for-review
owner: ibook-pm
inputs: [docs/prd.md]
updated: 2026-09-12
---

# Intent 0009 — Card-on-file trial & self-serve subscription billing

Derived from PRD requirement 0009, rank 10.

PROBLEM:  A manager who wants to pay for the product today has to talk to a salesperson
          and wait for an invoice, which is exactly the procurement friction this product
          is meant to avoid. And a trial with no card attached ends by quietly breaking,
          so a manager who was already convinced has to be chased to keep using
          something they wanted.
USER:     A facilities manager who has just added their rooms and is about to let
          coworkers in — and the same manager a week later, when the trial runs out.
OUTCOME:  The manager starts a one-week trial by entering card details themselves, is
          warned before it ends and told what the charge will be, and then either keeps
          the product by doing nothing or cancels and is charged nothing. No one on the
          vendor side is involved at any point.
SUCCESS:  Every trial started in a given week either converted to a paid subscription or
          was cancelled with no charge, with no manual intervention, checked against the
          payment records at the end of that week.
LIMITS:   Must not require a sales call, a signed order form, or a manually issued
          invoice — to start, to convert, or to cancel. The manager must be able to
          cancel alone, in the app, at any point during the trial. No company without an
          active trial or subscription may create a booking.
NOT NOW:  Annual or multi-year contracts, coupon codes and discounts, more than one
          plan, usage-based add-ons, and invoicing/PO support for companies that require
          it.

## Open questions
- If the card is declined when the trial ends, is booking access cut immediately or is
  there a grace period, and how many retries? See docs/prd.md open question 3.
- If the manager cancels during the trial, do they keep access to the original trial end
  date or lose it at once? See docs/prd.md open question 4.
- When a room is added or removed mid-cycle, does the amount charged change immediately
  or at the next renewal? See docs/prd.md open question 2.
