'use server'

import {
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state'
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect'
import { isOwner } from '@/features/auth/utils/is-owner'
import { prisma } from '@/lib/prisma'
import { ticketsPath } from '@/paths'
import { TicketStatus } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export const UpdateTicketStatus = async (id: string, status: TicketStatus) => {
  const { user } = await getAuthOrRedirect()

  try {
    // 权限校验：检查用户是否是该票据的所有者
    const ticket = await prisma.ticket.findUnique({
      where: { id },
    })

    if (!ticket || !isOwner(user, ticket)) {
      return toActionState('ERROR', 'Ticket not authorized')
    }

    // 更新票据状态
    await prisma.ticket.update({
      where: { id },
      data: { status },
    })
  } catch (error) {
    return fromErrorToActionState(error)
  }

  revalidatePath(ticketsPath())

  return toActionState('SUCCESS', 'Ticket status updated successfully.')
}
