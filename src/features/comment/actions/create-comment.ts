'use server'
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state'
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect'
import { prisma } from '@/lib/prisma'
import { ticketPath } from '@/paths'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const createCommentSchema = z.object({
  content: z
    .string()
    .min(1, 'Content is required')
    .max(500, 'Content must be less than 500 characters'),
})

export const createComment = async (
  ticketId: string,
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect()

  try {
    const data = createCommentSchema.parse(Object.fromEntries(formData))

    await prisma?.comment.create({
      data: {
        content: data.content,
        ticketId,
        userId: user.id,
      },
    })
  } catch (error) {
    return fromErrorToActionState(error, formData)
  }

  revalidatePath(ticketPath(ticketId))

  return toActionState('SUCCESS', 'Comment created successfully')
}
