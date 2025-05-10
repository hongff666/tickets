import Link from 'next/link'

import { Heading } from '@/components/heading'
import { ticketsPath } from '@/paths'

const HomePage = () => {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading title="Home Page" description="Welcome to TicketBounty!" />

      <div className="flex flex-1 flex-col items-center">
        <Link href={ticketsPath()} className="underline">
          Go to Tickets
        </Link>
      </div>
    </div>
  )
}

export default HomePage
