import { Heading } from '@/components/heading'
import { PlaceHolder } from '@/components/placeholder'
import { Spinner } from '@/components/spinner'
import { TicketList } from '@/features/ticket/components/ticket-list'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const HomePage = () => {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading
        title="Tickets Page"
        description="Tickets by everyone at one place."
      />

      <ErrorBoundary fallback={<PlaceHolder label="something went wrong" />}>
        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default HomePage
