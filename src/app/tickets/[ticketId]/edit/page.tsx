import { notFound } from 'next/navigation'

import { CardCompact } from '@/components/card-compact'
import { TicketUpsertForm } from '@/features/ticket/components/ticket-upsert-form'
import { getTicket } from '@/features/ticket/queries/get-ticket'

export default async function EditTicketPage({
  params,
}: {
  params: Promise<{ ticketId: string }>
}) {
  const { ticketId } = await params
  const ticket = await getTicket(ticketId)

  if (!ticket) {
    notFound()
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <CardCompact
        title="Edit Ticket"
        description="Please provide the details of the ticket."
        content={<TicketUpsertForm ticket={ticket} />}
        className="w-full max-w-[420px] self-center"
      />
    </div>
  )
}
