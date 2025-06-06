import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { CardCompact } from '@/components/card-compact'
import { Heading } from '@/components/heading'
import { PlaceHolder } from '@/components/placeholder'
import { Spinner } from '@/components/spinner'
import { getAuth } from '@/features/auth/actions/get-auth'
import { TicketList } from '@/features/ticket/components/ticket-list'
import { TicketUpsertForm } from '@/features/ticket/components/ticket-upsert-form'
import { searchParamsCache } from '@/features/ticket/search-params'
import { SearchParams } from 'nuqs/server'

type TicketPageProps = {
  searchParams: Promise<SearchParams>
}

const TicketsPage = async ({ searchParams }: TicketPageProps) => {
  const { user } = await getAuth()
  const resolvedSearchParams = await searchParamsCache.parse(searchParams)

  return (
    <>
      <div className="flex flex-1 flex-col gap-y-8">
        <Heading
          title="My Tickets"
          description="All your tickets in one place."
        />

        <CardCompact
          title="Create Ticket"
          description="A new ticket will be created in the system"
          content={<TicketUpsertForm />}
          className="w-full max-w-[420px] self-center"
        />

        <ErrorBoundary fallback={<PlaceHolder label="something went wrong" />}>
          <Suspense fallback={<Spinner />}>
            <TicketList userId={user?.id} searchParams={resolvedSearchParams} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  )
}
export default TicketsPage
