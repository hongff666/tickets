import { Heading } from '@/components/heading'
import { PlaceHolder } from '@/components/placeholder'
import { Spinner } from '@/components/spinner'
import { TicketList } from '@/features/ticket/components/ticket-list'
import { searchParamsCache } from '@/features/ticket/search-params'
import { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

type HomePageProps = {
  searchParams: Promise<SearchParams>
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const resolvedSearchParams = await searchParamsCache.parse(searchParams)
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading
        title="Tickets Page"
        description="Tickets by everyone at one place."
      />

      <ErrorBoundary fallback={<PlaceHolder label="something went wrong" />}>
        <Suspense fallback={<Spinner />}>
          <TicketList searchParams={resolvedSearchParams} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default HomePage
