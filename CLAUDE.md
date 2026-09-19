# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

Scaffolded (KAN-12). Next.js App Router with TypeScript strict mode, Tailwind CSS v4, and
Vitest. The only route with behaviour so far is the health probe; the data model (KAN-13),
PostgreSQL (KAN-14) and Amplify deployment (KAN-15) are not built yet.

### Commands

| Command                | What it does                         |
| ---------------------- | ------------------------------------ |
| `npm run dev`          | Development server on port 3000      |
| `npm run build`        | Production build                     |
| `npm test`             | Run the whole suite once             |
| `npm run test:watch`   | Watch mode                           |
| `npm run lint`         | ESLint                               |
| `npm run typecheck`    | `tsc --noEmit`, strict               |
| `npm run format:check` | Prettier, fails on unformatted files |

Run a single test file: `npx vitest run tests/health.test.ts`
Run a single test by name: `npx vitest run -t "responds with 200"`

### Architecture

```
app/                Next.js App Router. Pages and API routes in one project.
app/layout.tsx      Root layout: fonts, Tailwind, <html>/<body> shell.
app/page.tsx        Landing page placeholder.
app/api/<name>/route.ts   API route handlers. Export GET/POST as named functions.
app/globals.css     Tailwind entry point.
tests/              Vitest suite. setup.ts registers jest-dom matchers.
docs/               Product documents (PRD, intents, specs).
.claude/SKILLS/     Agent role skills.
```

Route handlers are plain exported functions, so tests import and call them directly
rather than going over HTTP — see [tests/health.test.ts](tests/health.test.ts). The `@/*`
import alias maps to the repository root.

## What this project is

A self-serve SaaS room-reservation app for small-to-medium businesses (5-20 meeting rooms) whose office/facilities manager currently manages bookings via a shared spreadsheet. It replaces that with live availability, instant conflict-free booking/cancellation, and automatic release of no-show bookings. The v1 wedge against incumbents (Skedda, Whatspot, Robin) is radical simplicity and lower price for small offices those tools overshoot, not a new feature category.

Full problem statement, competitive positioning, pricing, MVP feature scope, onboarding flow, and go-to-market plan: see [pitch.txt](pitch.txt).

## Decided tech stack (not yet implemented)

- Language: TypeScript throughout (frontend + backend)
- App type: responsive web app, not native iOS/Android for v1; installable as a PWA on mobile
- Framework: Next.js (React) - handles UI and backend API routes in one project
- Auth: Auth.js (NextAuth) - Google as primary provider (enables one-way Google Calendar sync), email/magic-link as fallback for non-Google users
- Database: PostgreSQL via Amazon RDS or Aurora Serverless v2
- Hosting: AWS Amplify Hosting
- Billing: Stripe Checkout + Billing (self-serve subscriptions from day one)
- Notifications: Web Push (Service Worker + Push API) as primary channel; iOS only supports web push if the PWA has been added to home screen (Apple platform restriction - onboarding must prompt for this on iOS). Amazon SES email is a guaranteed fallback, critical for the no-show check-in prompt.
- Live availability: simple polling/refresh (10-15s or on focus), not WebSockets, for v1

## Artifact chain and handover protocol

This project is built by a chain of roles. Each role reads files, writes files, and
stops. **No role calls another role.** The artifact is the interface.

### The chain

```
pitch.txt
   └─ ibook-pm        → docs/prd.md
                      → docs/intents/NNNN-<slug>.md      (one per requirement)
      └─ ibook-architect → docs/adr/NNNN-<slug>.md       (decisions, product-wide)
                         → docs/specs/NNNN-<slug>.md     (one per intent, on request)
         └─ ibook-engineer   → source code and tests
            └─ ibook-platform → deployment.md, live URL
               └─ ibook-validator → docs/validation/NNNN-<slug>.md
```

`docs/prd.md` is the root document. Every requirement in it has an ID. That ID travels:
requirement `0003` becomes intent `0003`, spec `0003`, validation `0003`. Anything without
a traceable ID does not belong in this repository.

### Every artifact carries a status header

Every generated document starts with this block, and nothing else may precede it:

```yaml
---
id: 0003
status: draft # draft | ready-for-review | approved | blocked | superseded
owner: ibook-architect # the role that produced it
inputs: [docs/prd.md, docs/intents/0003-capture-summary.md]
updated: 2026-09-08
---
```

### The handover rules

1. **A role may only start when every input it needs is `approved`.**
   If any input is `draft`, `ready-for-review` or `blocked`, stop and say which file and
   what state it is in. Do not proceed on an unapproved input.

2. **A role may never set its own output to `approved`.**
   When you finish, set `status: ready-for-review` and stop. Approval is a human act.
   This is the gate. Marking your own work approved removes it.

3. **Hand over only when the task is ready.**
   Before setting `ready-for-review`, verify your own skill's "Done when" list and state
   the result item by item. If any item fails, set `status: blocked`, write why under an
   `## Blocked on` heading, and stop.

4. **Unanswered questions block the chain.**
   If you cannot complete the artifact without a decision that is not yours to make, set
   `status: blocked` and list the questions. Never guess and continue.

5. **Stay in your lane.**
   Write only the artifacts your role owns. If you find a fault in an upstream document,
   report it — do not edit it. Corrections go back to the role that owns that file.

6. **Traceability is mandatory.**
   Every artifact names its `inputs` and shares the `id` of the requirement it serves.
   An artifact whose ID appears nowhere upstream is scope drift, and gets reported.

7. **Superseding, never overwriting.**
   When a decision changes, set the old artifact to `superseded`, add
   `superseded-by: <path>`, and write a new one. History is evidence.

### What to say at the end of every run

Finish every run with exactly these four lines:

```
ARTIFACT:  <path you wrote>
STATUS:    ready-for-review | blocked
DONE-WHEN: <each item, met or not met>
NEXT:      <the role that should run next, and what it needs from the human first>
```

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
