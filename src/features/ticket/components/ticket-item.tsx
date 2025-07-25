'use client'

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

import { toCurrentFromCent } from '@/utils/currency'
import { format } from 'date-fns'
import { TICKET_ICONS } from '../constants'
import { TicketWithMetadata } from '../types'
import { TicketMoreMenu } from './ticket-more-menu'

type TicketItemProps = {
  ticket: TicketWithMetadata
  isDetail?: boolean
  comments?: React.ReactNode
}

const TicketItem = ({
  ticket,
  isDetail = false,
  comments,
}: TicketItemProps) => {
  const detailButton = (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={ticketPath(ticket.id)}>
        <LucideExternalLink className="h-4 w-4" />
      </Link>
    </Button>
  )

  const editButton = ticket.isOwner ? (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={ticketEditPath(ticket.id)}>
        <LucidePencil className="h-4 w-4" />
      </Link>
    </Button>
  ) : null

  const moreMenu = ticket.isOwner ? (
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
              {format(new Date(ticket.createdAt), 'yyyy-MM-dd HH:mm:ss')}
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

      <div>{comments}</div>
    </div>
  )
}

export { TicketItem }
