/**
 * Availability model for the live room view (KAN-31).
 *
 * Times are decimal hours on a 24-hour clock: 9.5 is 09:30. The whole screen
 * shows one day, so a plain number beats a Date here — it compares, subtracts
 * and renders without a timezone in sight.
 */

export const DAY_START = 8
export const DAY_END = 19

export type Booking = {
  readonly start: number
  readonly end: number
  readonly label: string
}

export type Room = {
  readonly id: string
  readonly name: string
  readonly capacity: number
  readonly bookings: readonly Booking[]
}

export type RoomState = 'free' | 'booked'

/** The booking covering `hour`, or null when the room is free. */
export function bookingAt(room: Room, hour: number): Booking | null {
  return room.bookings.find((b) => hour >= b.start && hour < b.end) ?? null
}

export function stateAt(room: Room, hour: number): RoomState {
  return bookingAt(room, hour) ? 'booked' : 'free'
}

/**
 * When the room next becomes free, or null if it is free already.
 * Consecutive back-to-back bookings are walked through, so a room booked
 * 09:00–10:00 and 10:00–11:00 reports 11:00, not 10:00.
 */
export function freeFrom(room: Room, hour: number): number | null {
  let cursor = hour
  let current = bookingAt(room, cursor)

  while (current) {
    cursor = current.end
    current = bookingAt(room, cursor)
  }

  return cursor === hour ? null : cursor
}

/** Position of an hour across the day, as a 0–100 percentage. */
export function percentOfDay(hour: number): number {
  const clamped = Math.min(Math.max(hour, DAY_START), DAY_END)
  return ((clamped - DAY_START) / (DAY_END - DAY_START)) * 100
}

/** 9.5 → "09:30". Zero-padded so the figures line up in tabular-nums. */
export function formatHour(hour: number): string {
  const whole = Math.floor(hour)
  const minutes = Math.round((hour - whole) * 60)
  return `${String(whole).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

/** True when `hour` falls inside the day the view renders. */
export function isWithinDay(hour: number): boolean {
  return hour >= DAY_START && hour <= DAY_END
}

/**
 * Fixture rooms. The database lands in KAN-13/KAN-14; until then this is
 * stand-in data so the view can be built and reviewed. Nothing here is a
 * real booking.
 */
export const FIXTURE_ROOMS: readonly Room[] = [
  {
    id: 'oak',
    name: 'Oak',
    capacity: 8,
    bookings: [
      { start: 9, end: 10.5, label: 'Design review' },
      { start: 13, end: 14, label: 'Hiring panel' },
    ],
  },
  {
    id: 'birch',
    name: 'Birch',
    capacity: 4,
    bookings: [{ start: 11, end: 12, label: 'One-to-one' }],
  },
  {
    id: 'harbour',
    name: 'Harbour',
    capacity: 12,
    bookings: [
      { start: 8, end: 9, label: 'Standup' },
      { start: 9, end: 11, label: 'Quarterly planning' },
      { start: 15, end: 17.5, label: 'Supplier workshop' },
    ],
  },
  {
    id: 'annex',
    name: 'The Annex',
    capacity: 6,
    bookings: [],
  },
  {
    id: 'studio',
    name: 'Studio',
    capacity: 2,
    bookings: [
      { start: 10, end: 10.5, label: 'Call' },
      { start: 16, end: 18, label: 'Recording' },
    ],
  },
]
