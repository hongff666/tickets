'use server'

import { setCookieByKey } from '@/actions/cookies'
import {
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state'
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect'
import { isOwner } from '@/features/auth/utils/is-owner'
import { prisma } from '@/lib/prisma'
import { ticketPath, ticketsPath } from '@/paths'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const deleteTicket = async (ticketId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 3000)) // Simulate a delay

  const { user } = await getAuthOrRedirect()

  // 权限校验：检查用户是否是该票据的所有者
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  })

  if (!ticket || !isOwner(user, ticket)) {
    return toActionState('ERROR', 'Ticket not authorized')
  }

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
