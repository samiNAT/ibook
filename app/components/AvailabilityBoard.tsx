'use client'

import { useEffect, useState } from 'react'

import {
  DAY_END,
  DAY_START,
  type Room,
  bookingAt,
  formatHour,
  freeFrom,
  isWithinDay,
  percentOfDay,
} from '@/lib/availability'

const HOURS = Array.from({ length: DAY_END - DAY_START + 1 }, (_, i) => DAY_START + i)

/** Decimal hours since midnight, local time. */
function hourOf(date: Date): number {
  return date.getHours() + date.getMinutes() / 60
}

type Props = {
  rooms: readonly Room[]
  /** Server-rendered clock, so first paint matches hydration exactly. */
  initialHour: number
  initialLabel: string
}

export default function AvailabilityBoard({ rooms, initialHour, initialLabel }: Props) {
  const [now, setNow] = useState(initialHour)
  const [updated, setUpdated] = useState(initialLabel)

  // KAN-32 replaces this with a real poll against the API. For now it only
  // advances the clock, which is enough to keep the marker honest on screen.
  useEffect(() => {
    const tick = () => {
      const date = new Date()
      setNow(hourOf(date))
      setUpdated(formatHour(hourOf(date)))
    }

    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  const showMarker = isWithinDay(now)
  const freeCount = rooms.filter((room) => !bookingAt(room, now)).length

  return (
    <main className="board">
      <header className="board__head">
        <div>
          <h1 className="board__title">Rooms</h1>
          <p className="board__sub tnum">
            {freeCount} of {rooms.length} free at <span className="tnum">{formatHour(now)}</span>
          </p>
        </div>

        <ul className="legend" aria-label="Key">
          <li className="legend__item">
            <span className="legend__swatch is-free" aria-hidden="true" />
            Free
          </li>
          <li className="legend__item">
            <span className="legend__swatch is-booked" aria-hidden="true" />
            Booked
          </li>
          <li className="legend__item">
            <span className="legend__swatch legend__swatch--now" aria-hidden="true" />
            Now
          </li>
        </ul>
      </header>

      <div className="ruler" aria-hidden="true">
        <div className="ruler__spacer" />
        <div className="ruler__track">
          {HOURS.map((hour) => (
            <span
              key={hour}
              className="ruler__tick tnum"
              style={{ left: `${percentOfDay(hour)}%` }}
            >
              {String(hour).padStart(2, '0')}
            </span>
          ))}
        </div>
        <div className="ruler__spacer ruler__spacer--end" />
      </div>

      <ol className="rooms">
        {rooms.map((room) => {
          const booking = bookingAt(room, now)
          const free = freeFrom(room, now)

          return (
            <li key={room.id} className="room">
              <div className="room__id">
                <h2 className="room__name">{room.name}</h2>
                <p className="room__seats tnum">Seats {room.capacity}</p>
              </div>

              <div
                className="room__track"
                role="img"
                aria-label={`${room.name}: ${room.bookings
                  .map(
                    (b) => `booked ${formatHour(b.start)} to ${formatHour(b.end)} for ${b.label}`,
                  )
                  .join('; ')
                  .replace(/^$/, 'no bookings today')}`}
              >
                {room.bookings.map((b) => (
                  <div
                    key={`${b.start}-${b.end}`}
                    className="block is-booked"
                    style={{
                      left: `${percentOfDay(b.start)}%`,
                      width: `${percentOfDay(b.end) - percentOfDay(b.start)}%`,
                    }}
                  >
                    <span className="block__label">{b.label}</span>
                  </div>
                ))}

                {showMarker && (
                  <div className="nowline" style={{ left: `${percentOfDay(now)}%` }}>
                    <span className="nowline__cap" />
                  </div>
                )}
              </div>

              <p className={`room__state ${booking ? 'room__state--booked' : 'room__state--free'}`}>
                {booking ? (
                  <>
                    <span className="room__word">Booked</span>
                    <span className="room__detail tnum">
                      free from {formatHour(free ?? DAY_END)}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="room__word">Free</span>
                    <span className="room__detail tnum">now</span>
                  </>
                )}
              </p>
            </li>
          )
        })}
      </ol>

      <footer className="board__foot">
        <span>ibook</span>
        <span className="tnum">
          Checked {updated} · refreshes every 30s · showing fixture data until the rooms API lands
        </span>
      </footer>
    </main>
  )
}
