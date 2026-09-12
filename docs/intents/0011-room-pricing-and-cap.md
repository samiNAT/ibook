---
id: 0011
status: ready-for-review
owner: ibook-pm
inputs: [docs/prd.md]
updated: 2026-09-12
---

# Intent 0011 — Room-count pricing & 20-room cap

Derived from PRD requirement 0011, rank 9.

PROBLEM:  A manager evaluating the product cannot find out what it will cost without
          asking someone — which is the exact friction every incumbent imposes and this
          product exists to remove. Worse, a price that depends on how many coworkers
          get approved turns every join request into a spending decision.
USER:     A facilities manager who has just added their rooms and is deciding, alone and
          often outside work hours, whether this is affordable enough to put a card
          against.
OUTCOME:  The manager sees a single monthly number for their office, derived only from
          how many rooms they have, with no per-person arithmetic and no quote to
          request. A company larger than this product is built for is told so plainly at
          the point it matters, rather than sold something that will not fit.
SUCCESS:  In the first week of live use, every manager who reached the card step had
          been shown a price first, and no manager contacted support to ask what the
          product costs, verified from the signup records and the support inbox.
LIMITS:   The price must depend on room count alone — approving members, however many,
          must never change it. There is one published price and no negotiation: $49 per
          month covers the first 3 rooms, each room after that adds $15 per month, and
          the company cannot exceed 20 rooms.
NOT NOW:  More than one plan tier, annual billing and discounts, coupon codes, per-seat
          or per-booking pricing, and custom quotes for companies above 20 rooms.

## Open questions
- Is the published price USD-only, and who is responsible for sales tax or VAT on top of
  it? This decides whether a company outside the US can self-serve at all. See
  docs/prd.md open question 6.
- When a room is added or removed mid-cycle, does the price charged change immediately
  or at the next renewal? See docs/prd.md open question 2.
- What should a company that needs more than 20 rooms actually see at the cap — a plain
  refusal, or a way to register interest? The PRD puts them out of scope but does not say
  what they are told.
