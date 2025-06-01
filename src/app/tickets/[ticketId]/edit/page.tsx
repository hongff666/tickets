import { notFound } from 'next/navigation'

import { CardCompact } from '@/components/card-compact'
import { getAuth } from '@/features/auth/actions/get-auth'
import { isOwner } from '@/features/auth/utils/is-owner'
import { TicketUpsertForm } from '@/features/ticket/components/ticket-upsert-form'
import { getTicket } from '@/features/ticket/queries/get-ticket'

export default async function EditTicketPage({
  params,
}: {
  params: Promise<{ ticketId: string }>
}) {
  const { ticketId } = await params

  const ticket = await getTicket(ticketId)
  const { user } = await getAuth()

  const isTicketFound = !!ticket
  const isTicketOwner = isOwner(user, ticket)

  if (!isTicketFound || !isTicketOwner) {
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
