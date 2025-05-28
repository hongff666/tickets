'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Ticket } from '@prisma/client'
import { LucideTrash } from 'lucide-react'
import { toast } from 'sonner'
import { UpdateTicketStatus } from '../actions/update-ticket-status'
import { TICKET_STATUS_LABELS } from '../constants'

type TicketMoreMenuProps = {
  ticket: Ticket
  trigger: React.ReactNode
}

export const TicketMoreMenu = ({ ticket, trigger }: TicketMoreMenuProps) => {
  const deleteButton = (
    <DropdownMenuItem>
      <LucideTrash className="mr-2 h-4 w-4" />
      <span>Delete</span>
    </DropdownMenuItem>
  )

  const handleUpdateTicketStatus = async (status: string) => {
    const result = await UpdateTicketStatus(
      ticket.id,
      status as Ticket['status'],
    )
    if (result.status === 'ERROR') {
      toast.error(result.message)
    } else {
      toast.error(result.message)
    }
  }

  const ticketStatusRadioGroupItems = (
    <DropdownMenuRadioGroup
      value={ticket.status}
      onValueChange={handleUpdateTicketStatus}
    >
      {Object.keys(TICKET_STATUS_LABELS).map((status) => (
        <DropdownMenuRadioItem key={status} value={status}>
          {TICKET_STATUS_LABELS[status as keyof typeof TICKET_STATUS_LABELS]}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent side="right">
        {ticketStatusRadioGroupItems}
        <DropdownMenuSeparator />
        {deleteButton}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
