import { notFound } from 'next/navigation'

import { RedirectToast } from '@/components/redirect-toast'
import { TicketItem } from '@/features/ticket/components/ticket-item'
import { getTicket } from '@/features/ticket/queries/get-ticket'
import { getTickets } from '@/features/ticket/queries/get-tickets'

type TicketPagePropsType = {
  params: Promise<{ ticketId: string }>
}

const TicketPage = async ({ params }: TicketPagePropsType) => {
  // 获取ticketId参数
  const ticketId = (await params).ticketId

  // 根据ticketId获取ticket数据
  const ticket = await getTicket(ticketId)

  if (ticket) {
    return (
      <>
        <div className="animate-fade-in-from-top flex flex-col items-center">
          <TicketItem ticket={ticket} isDetail />
        </div>
        <RedirectToast />
      </>
    )
  } else {
    notFound()
  }
}

export async function generateStaticParams() {
  const tickets = await getTickets()
  return tickets.map((ticket) => ({
    ticketId: ticket.id,
  }))
}

export default TicketPage
