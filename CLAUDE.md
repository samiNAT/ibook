# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

This repository currently contains no code, only a product brainstorm document ([pitch.txt](pitch.txt)). There are no build, lint, or test commands yet because nothing has been scaffolded. Once a project is initialized, replace this section with the real commands (build, lint, test - including how to run a single test) and add an architecture section describing the actual code structure.

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
