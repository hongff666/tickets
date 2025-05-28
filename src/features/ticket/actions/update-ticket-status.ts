'use server'

import {
  fromToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state'
import { prisma } from '@/lib/prisma'
import { ticketsPath } from '@/paths'
import { TicketStatus } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export const UpdateTicketStatus = async (id: string, status: TicketStatus) => {
  await new Promise((resolve) => setTimeout(resolve, 3000))

  try {
    await prisma.ticket.update({
      where: { id },
      data: { status },
    })
  } catch (error) {
    return fromToActionState(error)
  }

  revalidatePath(ticketsPath())

  return toActionState('SUCCESS', 'Ticket status updated successfully.')
}
