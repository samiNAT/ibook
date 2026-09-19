# ibook

Meeting room booking for small offices. Live availability, conflict-free booking, and
automatic release of no-show reservations — replacing the shared spreadsheet that most
5–20 room offices run on today.

See [pitch.txt](pitch.txt) for the product rationale and [CLAUDE.md](CLAUDE.md) for the
stack decisions.

## Requirements

- Node.js 22 or later
- npm 11 or later

## Getting started

```bash
npm install
npm run dev
```

The app runs at http://localhost:3000. The health probe is at
http://localhost:3000/api/health and returns `{"status":"ok"}` with HTTP 200.

## Commands

| Command                | What it does                                           |
| ---------------------- | ------------------------------------------------------ |
| `npm run dev`          | Start the development server on port 3000              |
| `npm run build`        | Production build                                       |
| `npm start`            | Serve the production build (run `npm run build` first) |
| `npm test`             | Run the test suite once (Vitest)                       |
| `npm run test:watch`   | Run tests in watch mode                                |
| `npm run lint`         | ESLint                                                 |
| `npm run typecheck`    | TypeScript, no emit — strict mode                      |
| `npm run format`       | Rewrite files with Prettier                            |
| `npm run format:check` | Fail if anything is unformatted                        |

## Project layout

```
app/              Next.js App Router — pages and API routes
app/api/health/   Liveness probe
tests/            Vitest suite
docs/             Product documents (PRD, intents, specs)
.claude/          Agent role skills
```

## Stack

TypeScript throughout, Next.js App Router (React 19), Tailwind CSS v4, Vitest with
Testing Library. PostgreSQL and AWS Amplify Hosting arrive with KAN-14 and KAN-15.
