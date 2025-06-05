import { PlaceHolder } from '@/components/placeholder'
import { SearchInput } from '@/components/search-input'
import { getTickets } from '../queries/get-tickets'
import { SearchParams } from '../search-params'
import { TicketItem } from './ticket-item'

export const TicketList = async ({
  userId,
  searchParams,
}: {
  userId?: string
  searchParams: SearchParams
}) => {
  const tickets = await getTickets(userId, searchParams)

  return (
    <div className="animate-fade-in-from-top flex flex-1 flex-col items-center gap-y-4">
      <SearchInput placeholder="Search Input..." />
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
