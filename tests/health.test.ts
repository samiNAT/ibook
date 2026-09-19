import { describe, expect, it } from 'vitest'

import { GET } from '@/app/api/health/route'

describe('GET /api/health', () => {
  it('responds with 200', async () => {
    const response = await GET()

    expect(response.status).toBe(200)
  })

  it('reports status ok', async () => {
    const response = await GET()

    await expect(response.json()).resolves.toEqual({ status: 'ok' })
  })
})
