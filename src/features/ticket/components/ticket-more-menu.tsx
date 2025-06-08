'use client'

import { useCustomDialog } from '@/components/custom-dialog'
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
import { deleteTicket } from '../actions/delete-ticket'
import { UpdateTicketStatus } from '../actions/update-ticket-status'
import { TICKET_STATUS_LABELS } from '../constants'

type TicketMoreMenuProps = {
  ticket: Ticket
  trigger: React.ReactNode
}

export const TicketMoreMenu = ({ ticket, trigger }: TicketMoreMenuProps) => {
  const [deleteButton, deleteDialog] = useCustomDialog({
    action: deleteTicket.bind(null, ticket.id),
    trigger: (
      <DropdownMenuItem>
        <LucideTrash className="mr-2 h-4 w-4" /> Delete
      </DropdownMenuItem>
    ),
  })

  const handleUpdateTicketStatus = async (status: string) => {
    const promise = UpdateTicketStatus(ticket.id, status as Ticket['status'])

    toast.promise(promise, {
      loading: 'Updating ticket status...',
    })

    const result = await promise

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
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent side="right">
          {ticketStatusRadioGroupItems}
          <DropdownMenuSeparator />
          {deleteButton}
        </DropdownMenuContent>
      </DropdownMenu>
      {deleteDialog}
    </>
  )
}
