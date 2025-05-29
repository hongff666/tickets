'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { setCookieByKey } from '@/actions/cookies'
import {
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state'
import { prisma } from '@/lib/prisma'
import { ticketPath, ticketsPath } from '@/paths'

export const deleteTicket = async (ticketId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 5000))

  try {
    await prisma.ticket.delete({
      where: { id: ticketId },
    })
  } catch (error) {
    return fromErrorToActionState(error)
  }

  revalidatePath(ticketsPath())
  revalidatePath(ticketPath(ticketId))
  await setCookieByKey('toast', 'Ticket deleted successfully')
  redirect(ticketsPath())

  return toActionState('SUCCESS', 'Ticket delete successfully')
}
