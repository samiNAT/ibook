import AvailabilityBoard from '@/app/components/AvailabilityBoard'
import { FIXTURE_ROOMS, formatHour } from '@/lib/availability'

// Availability is live by definition — never prerender it at build time.
export const dynamic = 'force-dynamic'

export default function Home() {
  const date = new Date()
  const hour = date.getHours() + date.getMinutes() / 60

  return (
    <AvailabilityBoard rooms={FIXTURE_ROOMS} initialHour={hour} initialLabel={formatHour(hour)} />
  )
}
