import { PlaceHolder } from '@/components/placeholder'
import { getTickets } from '../queries/get-tickets'
import { ParsedSearchParams } from '../search-params'
import { TicketItem } from './ticket-item'
import { TicketSearchInput } from './ticket-search-input'
import { TicketSortSelect } from './ticket-sort-select'

export const TicketList = async ({
  userId,
  searchParams,
}: {
  userId?: string
  searchParams: ParsedSearchParams
}) => {
  const tickets = await getTickets(userId, searchParams)

  return (
    <div className="animate-fade-in-from-top flex flex-1 flex-col items-center gap-y-4">
      <div className="flex w-full max-w-[420px] items-center justify-between gap-x-4">
        <TicketSearchInput placeholder="Search Input..." />
        <TicketSortSelect
          options={[
            {
              sortKey: 'bounty',
              sortValue: 'desc',
              label: 'Bounty',
            },
            {
              sortKey: 'createdAt',
              sortValue: 'desc',
              label: 'Newest',
            },
            {
              sortKey: 'createdAt',
              sortValue: 'asc',
              label: 'Oldest',
            },
          ]}
        />
      </div>
      {tickets.length ? (
        tickets.map((ticket) => {
          return <TicketItem key={ticket.id} ticket={ticket} />
        })
      ) : (
        <PlaceHolder label="No tickets found" />
      )}
    </div>
  )
}
