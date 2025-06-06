import { notFound } from 'next/navigation'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { TicketItem } from '@/features/ticket/components/ticket-item'
import { getTicket } from '@/features/ticket/queries/get-ticket'
import { homePath } from '@/paths'
import { Separator } from '@radix-ui/react-separator'

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
      <div className="flex flex-1 flex-col gap-y-8">
        <Breadcrumbs
          breadcrumbs={[
            { title: 'Tickets', href: homePath() },
            { title: ticket.title },
          ]}
        />

        <Separator className="border" />

        <div className="animate-fade-in-from-top flex flex-col items-center">
          <TicketItem ticket={ticket} isDetail />
        </div>
      </div>
    )
  } else {
    notFound()
  }
}

export default TicketPage
