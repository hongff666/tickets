import { SearchInput } from '@/components/search-input'
import { getTickets } from '../queries/get-tickets'
import { TicketItem } from './ticket-item'

export const TicketList = async ({ userId }: { userId?: string }) => {
  const tickets = await getTickets(userId)

  return (
    <div className="animate-fade-in-from-top flex flex-1 flex-col items-center gap-y-4">
      <SearchInput placeholder="Search Input..." />
      {tickets.map((ticket) => {
        return <TicketItem key={ticket.id} ticket={ticket} />
      })}
    </div>
  )
}
