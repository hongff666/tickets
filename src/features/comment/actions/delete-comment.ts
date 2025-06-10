'use server'
import {
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state'
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect'
import { isOwner } from '@/features/auth/utils/is-owner'
import { prisma } from '@/lib/prisma'
import { ticketPath } from '@/paths'
import { revalidatePath } from 'next/cache'

export const deleteComment = async (id: string) => {
  const { user } = await getAuthOrRedirect()

  const comment = await prisma.comment.findUnique({
    where: {
      id,
    },
  })

  if (!comment || !isOwner(user, comment)) {
    return fromErrorToActionState(
      new Error('Comment not found or you do not have permission to delete it'),
    )
  }

  try {
    await prisma.comment.delete({
      where: {
        id,
      },
    })
  } catch (error) {
    return fromErrorToActionState(error)
  }

  revalidatePath(ticketPath(comment.ticketId))

  return toActionState('SUCCESS', 'Comment deleted successfully')
}
