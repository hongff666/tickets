import { Breadcrumbs } from '@/components/breadcrumbs'
import { CardCompact } from '@/components/card-compact'
import { getAuth } from '@/features/auth/actions/get-auth'
import { isOwner } from '@/features/auth/utils/is-owner'
import { TicketUpsertForm } from '@/features/ticket/components/ticket-upsert-form'
import { getTicket } from '@/features/ticket/queries/get-ticket'
import { homePath, ticketPath } from '@/paths'
import { Separator } from '@radix-ui/react-separator'
import { notFound } from 'next/navigation'

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
    <div className="flex flex-1 flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: 'Tickets', href: homePath() },
          { title: ticket.title, href: ticketPath(ticket.id) },
          { title: 'Edit' },
        ]}
      />

      <Separator />

      <div className="flex flex-1 items-center justify-center">
        <CardCompact
          title="Edit Ticket"
          description="Please provide the details of the ticket."
          content={<TicketUpsertForm ticket={ticket} />}
          className="w-full max-w-[420px] self-center"
        />
      </div>
    </div>
  )
}
