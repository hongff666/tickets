import clsx from 'clsx'
import {
  LucideExternalLink,
  LucideMoreVertical,
  LucidePencil,
} from 'lucide-react'
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

import { getAuth } from '@/features/auth/actions/get-auth'
import { isOwner } from '@/features/auth/utils/is-owner'
import { Comments } from '@/features/comment/components/comments'
import { toCurrentFromCent } from '@/utils/currency'
import { Prisma } from '@prisma/client'
import { TICKET_ICONS } from '../constants'
import { TicketMoreMenu } from './ticket-more-menu'

type TicketItemProps = {
  ticket: Prisma.TicketGetPayload<{
    include: {
      user: {
        select: {
          username: true
        }
      }
    }
  }>
  isDetail?: boolean
}

const TicketItem = async ({ ticket, isDetail = false }: TicketItemProps) => {
  const { user } = await getAuth()

  const isTicketOwner = isOwner(user, ticket)

  const detailButton = (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={ticketPath(ticket.id)}>
        <LucideExternalLink className="h-4 w-4" />
      </Link>
    </Button>
  )

  const editButton = isTicketOwner ? (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={ticketEditPath(ticket.id)}>
        <LucidePencil className="h-4 w-4" />
      </Link>
    </Button>
  ) : null

  const moreMenu = isTicketOwner ? (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="h-4 w-4" />
        </Button>
      }
    />
  ) : null

  return (
    <div
      className={clsx('flex w-full flex-col gap-y-4', {
        'max-w-[580px]': isDetail,
        'max-w-[420px]': !isDetail,
      })}
    >
      <div className="flex gap-x-2">
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
              {ticket.createdAt.toISOString().slice(0, 10)} by{' '}
              {ticket.user.username}
            </span>
            <span className="text-muted-foreground text-sm">
              {toCurrentFromCent(ticket.bounty)}
            </span>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-y-2">
          {isDetail ? (
            <>
              {editButton}
              {moreMenu}
            </>
          ) : (
            <>
              {detailButton}
              {editButton}
              {moreMenu}
            </>
          )}
        </div>
      </div>

      <div>{isDetail ? <Comments ticketId={ticket.id} /> : null}</div>
    </div>
  )
}

export { TicketItem }
