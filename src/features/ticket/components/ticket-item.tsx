import { Ticket } from '@prisma/client'
import clsx from 'clsx'
import { LucideExternalLink, LucidePencil, LucideTrash } from 'lucide-react'
import Form from 'next/form'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ticketEditPath, ticketPath } from '@/paths'

import { deleteTicket } from '../actions/delete-ticket'
import { TICKET_ICONS } from '../constants'

type TicketItemProps = {
  ticket: Ticket
  isDetail?: boolean
}

const TicketItem = ({ ticket, isDetail = false }: TicketItemProps) => {
  const detailButton = (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={ticketPath(ticket.id)}>
        <LucideExternalLink className="h-4 w-4" />
      </Link>
    </Button>
  )

  const editButton = (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={ticketEditPath(ticket.id)}>
        <LucidePencil className="h-4 w-4" />
      </Link>
    </Button>
  )

  const deleteButton = (
    <Form action={deleteTicket.bind(null, ticket.id)}>
      <Button variant="outline" size="icon">
        <LucideTrash className="h-4 w-4" />
      </Button>
    </Form>
  )

  return (
    <div
      className={clsx('flex w-full gap-x-1', {
        'max-w-[580px]': isDetail,
        'max-w-[420px]': !isDetail,
      })}
    >
      <Card key={ticket.id} className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-x-2 overflow-hidden">
            <p>{TICKET_ICONS[ticket.status]}</p>
            <span className="truncate">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p
            className={clsx('whitespace-break-spaces', {
              'line-clamp-3': !isDetail,
            })}
          >
            {ticket.content}
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">
            {ticket.deadline}
          </span>
          <span className="text-muted-foreground text-sm">
            Bounty: {ticket.bounty / 100} USD
          </span>
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-y-2">
        {isDetail ? (
          <>
            {editButton}
            {deleteButton}
          </>
        ) : (
          <>
            {detailButton}
            {editButton}
          </>
        )}
      </div>
    </div>
  )
}

export { TicketItem }
