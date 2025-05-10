import { getTickets } from '../queries/get-tickets'
import { TicketItem } from './ticket-item'

export const TicketList = async () => {
  const tickets = await getTickets()

  return (
    <div className="animate-fade-in-from-top flex flex-1 flex-col items-center gap-y-4">
      {tickets.map((ticket) => {
        return <TicketItem key={ticket.id} ticket={ticket} />
      })}
    </div>
  )
}
