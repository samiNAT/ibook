---
id: 0001
status: ready-for-review
owner: ibook-pm
inputs: [docs/prd.md]
updated: 2026-09-12
---

# Intent 0001 — Manager account & company setup

Derived from PRD requirement 0001, rank 1.

PROBLEM:  A prospective facilities manager who wants to replace a spreadsheet has no way
          to start using the product without emailing sales or filing an IT ticket —
          every enterprise competitor requires an IT-led rollout before a single room
          can be tracked.
USER:     An office/facilities manager at a 5–20 room business, evaluating the product
          alone, usually outside work hours, with no developer or IT support to lean on.
OUTCOME:  The manager has a company account carrying the company's name and how many
          meeting rooms they have, and is looking at their own (empty) availability
          screen, ready to add rooms, with no ticket filed and no one else involved.
SUCCESS:  At least one manager per week who starts signup completes it and reaches the
          room-setup screen, measured from signup analytics.
LIMITS:   Must work with nothing more than an email address or an account the manager
          already has elsewhere — no invite code, no sales approval, no calendar-suite
          licence required. No payment details are
          asked for at this stage; the card is only requested once the manager has added
          rooms and can see what they would pay.
NOT NOW:  Company-level settings/branding, SSO/SAML for larger companies, multi-company
          management by one manager account.

## Open questions
- Can a company have more than one manager account? See docs/prd.md open question 10.
- The price the manager is eventually shown is based on the rooms they actually add, not
  on the count captured here, so this count bills nothing. What is it for — sizing the
  offer, segmentation, pre-creating rooms — or should it leave signup entirely? See
  docs/prd.md open question 5.
