import { describe, expect, it } from 'vitest'

import {
  DAY_END,
  DAY_START,
  type Room,
  bookingAt,
  formatHour,
  freeFrom,
  isWithinDay,
  percentOfDay,
  stateAt,
} from '@/lib/availability'

const room: Room = {
  id: 'oak',
  name: 'Oak',
  capacity: 8,
  bookings: [
    { start: 9, end: 10.5, label: 'Design review' },
    { start: 10.5, end: 11, label: 'Handover' },
    { start: 14, end: 15, label: 'Hiring panel' },
  ],
}

const empty: Room = { id: 'annex', name: 'The Annex', capacity: 6, bookings: [] }

describe('bookingAt', () => {
  it('finds the booking covering the hour', () => {
    expect(bookingAt(room, 9.25)?.label).toBe('Design review')
  })

  it('treats the start as inside and the end as outside', () => {
    expect(bookingAt(room, 14)?.label).toBe('Hiring panel')
    expect(bookingAt(room, 15)).toBeNull()
  })

  it('returns null in a gap', () => {
    expect(bookingAt(room, 12)).toBeNull()
  })
})

describe('stateAt', () => {
  it('reports booked inside a booking and free outside one', () => {
    expect(stateAt(room, 9.5)).toBe('booked')
    expect(stateAt(room, 12)).toBe('free')
    expect(stateAt(empty, 9)).toBe('free')
  })
})

describe('freeFrom', () => {
  it('returns null when the room is already free', () => {
    expect(freeFrom(room, 12)).toBeNull()
  })

  it('walks through back-to-back bookings to the real free time', () => {
    // 09:00-10:30 runs straight into 10:30-11:00, so the answer is 11:00.
    expect(freeFrom(room, 9.25)).toBe(11)
  })

  it('returns the end of a single booking', () => {
    expect(freeFrom(room, 14.5)).toBe(15)
  })
})

describe('percentOfDay', () => {
  it('maps the day window onto 0-100', () => {
    expect(percentOfDay(DAY_START)).toBe(0)
    expect(percentOfDay(DAY_END)).toBe(100)
  })

  it('clamps outside the window rather than overflowing the track', () => {
    expect(percentOfDay(3)).toBe(0)
    expect(percentOfDay(23)).toBe(100)
  })
})

describe('formatHour', () => {
  it('zero-pads hours and minutes', () => {
    expect(formatHour(9)).toBe('09:00')
    expect(formatHour(9.5)).toBe('09:30')
    expect(formatHour(17.25)).toBe('17:15')
  })
})

describe('isWithinDay', () => {
  it('accepts the boundaries and rejects outside', () => {
    expect(isWithinDay(DAY_START)).toBe(true)
    expect(isWithinDay(DAY_END)).toBe(true)
    expect(isWithinDay(7.9)).toBe(false)
    expect(isWithinDay(20)).toBe(false)
  })
})
