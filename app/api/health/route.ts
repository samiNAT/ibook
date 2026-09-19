import { NextResponse } from 'next/server'

/**
 * Liveness probe. Returns 200 whenever the app is able to serve requests.
 * Amplify and any uptime monitor can poll this without touching the database.
 */
export function GET() {
  return NextResponse.json({ status: 'ok' }, { status: 200 })
}
