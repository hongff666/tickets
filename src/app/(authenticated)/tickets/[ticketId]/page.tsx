import { notFound } from 'next/navigation'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { Comments } from '@/features/comment/components/comments'
import { getComments } from '@/features/comment/queries/get-comments'
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
  const ticketPromise = await getTicket(ticketId)

  const commentsPromise = await getComments(ticketId)

  const [ticket, comments] = await Promise.all([ticketPromise, commentsPromise])

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
          <TicketItem
            ticket={ticket}
            isDetail
            comments={<Comments ticketId={ticket.id} comments={comments} />}
          />
        </div>
      </div>
    )
  } else {
    notFound()
  }
}

export default TicketPage
