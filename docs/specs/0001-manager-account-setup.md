---
id: 0001
status: ready-for-review
owner: ibook-architect
inputs: [docs/prd.md, docs/intents/0001-manager-account-setup.md]
updated: 2026-09-12
---

# Spec 0001 — Manager account & company setup

Derived from requirement 0001 and intent 0001.

## Goal

Enable a first-time office/facilities manager to create a company account without sales or IT assistance, add rooms immediately after signup, and get a shareable join link for approved employees.

## Problem statement

The current path is blocked by a blank slate: a user can open the app, but there is no company, no membership, and no onboarding state. The product must guide a new manager from first visit to a usable room inventory in a single self-serve flow.

## Scope

In scope for v1:
- email or Google sign-up
- first-time user creates a company
- company name captured at signup or immediately after first sign-in
- manager becomes company owner automatically
- join link generated for later employee onboarding
- initial account lands on an empty availability view that is ready for room setup

Out of scope:
- multi-manager company roles
- SSO or enterprise provisioning
- custom branding / white-label
- additional company settings beyond name + join link

## User flow

1. Visitor lands on signup screen.
2. User chooses Google OAuth or email magic link.
3. If no company exists for that user, app prompts for company name.
4. App creates a `Company` record and assigns current user as owner.
5. App creates an initial user-company membership with role `manager`.
6. App redirects to a room-setup screen or availability screen with empty state.
7. App exposes a generated join URL for employees.

## Data model

### User
- id
- auth_provider (`google` | `email`)
- email
- name
- created_at
- updated_at

### Company
- id
- name
- owner_user_id
- join_code or invite_slug
- status (`trial` | `active`)
- created_at
- updated_at

### CompanyMember
- id
- company_id
- user_id
- role (`manager` | `member`)
- status (`pending` | `approved` | `rejected`)
- created_at
- updated_at

## Functional requirements

### FR-0001-01: Sign-up choice
The app must allow a new user to register with Google OAuth or email magic link.

### FR-0001-02: Company creation
The first authenticated user who does not already belong to a company must be prompted to create a company. A company requires a non-empty name.

### FR-0001-03: Manager ownership
The creator of a company is assigned the `manager` role and acts as the sole owner for v1. The app must prevent a second manager role from being created in the same company unless product scope is expanded later.

### FR-0001-04: Join link generation
A company must have a shareable join link or URL that is valid for new users to request membership.

### FR-0001-05: Empty-state onboarding
After company creation, the user lands in a state where rooms can be added and the room list is visible.

## Non-functional requirements

- Sign-up must complete in under 2 minutes for a first-time user.
- No external approval process should be required.
- The app must tolerate a user who signs in with a Google account that already exists as a previous email sign-in and should merge identity correctly without duplicate company ownership.
- Security: only authenticated users may create or access their own company record; join-link access must not create company membership without approval.

## Derived API surface

### Auth endpoints
- `POST /api/auth/signin` (handled by Auth.js adapter)
- `GET /api/auth/callback` (handled by Auth.js adapter)

### Company endpoints
- `POST /api/company` — create a company and assign owner
- `GET /api/company/me` — fetch current company context for the signed-in user
- `GET /api/company/join-link` — fetch or regenerate the shareable join URL

### Membership endpoints
- `POST /api/company/members/requests` — request to join a company by link
- `GET /api/company/members/pending` — list pending join requests (manager view)
- `POST /api/company/members/:id/approve` — approve a pending member

## Validation notes

This spec covers the acceptance criteria in PRD requirement 0001:
- first-time visitor can complete signup and company creation without contacting anyone
- manager arrives at room setup or availability screen without manual intervention
- company-level join link is generated and ready for coworkers

## Open decisions / risks

### Decision captured
The v1 product treats each company as having one manager, with employees joining via a single shareable link. This matches the PRD and keeps the onboarding flow simple.

### Remaining question
- Can a company have more than one manager account? This is still unresolved in the PRD and is explicitly called out in the intent.

## Implementation notes

- Prefer a single-company-per-user rule at the database/query level, even before UI enforcement.
- Store join URLs as a stable slug associated with the company, not as a user-specific token.
- Email magic-link sign-in should create a user record without forcing company completion on every login.
- If a user already has a company, the app should route them directly to the empty or populated availability view instead of the signup flow.
