---
id: 0003
status: ready-for-review
owner: ibook-pm
inputs: [docs/prd.md]
updated: 2026-09-12
---

# Intent 0003 — Team join & approval

Derived from PRD requirement 0003, rank 3.

PROBLEM:  A manager has rooms set up but no way to let coworkers book them without
          manually inviting each person one by one, the way per-seat enterprise tools
          require.
USER:     The facilities manager (approving) and their coworkers (joining), at a
          company with no formal user-provisioning process.
OUTCOME:  Any coworker who has the company's link can ask to join, and the manager can
          let them in with one tap — no email invite list, no roles to configure beyond
          manager vs. member.
SUCCESS:  At least one non-manager employee is approved and using the app within the
          first week of a company signing up.
LIMITS:   Only two roles exist — manager and approved member; no per-room permissions.
NOT NOW:  Bulk/CSV employee import, employee removal/offboarding workflows, multiple
          manager roles or delegated approval.

## Open questions
- Can a company have more than one manager to share approval duties? See docs/prd.md
  open question 10.
