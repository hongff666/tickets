'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { setCookieByKey } from '@/actions/cookies'
import { prisma } from '@/lib/prisma'
import { ticketPath, ticketsPath } from '@/paths'

export const deleteTicket = async (ticketId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 5000))

  await prisma.ticket.delete({
    where: { id: ticketId },
  })

  revalidatePath(ticketsPath())
  revalidatePath(ticketPath(ticketId))
  await setCookieByKey('toast', 'Ticket deleted successfully') // 设置 cookie，以便在重定向后可以使用
  redirect(ticketsPath())
}
