'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { setCookieByKey } from '@/actions/cookies'
import {
  ActionState,
  fromToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state'
import { prisma } from '@/lib/prisma'
import { ticketPath, ticketsPath } from '@/paths'
import { toCent } from '@/utils/currency'

const ticketSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  deadline: z.string().min(1, 'Deadline is required'),
  bounty: z.coerce
    .number()
    .min(0, 'Bounty must be a positive number')
    .nonnegative('Bounty cannot be negative'),
})

export const upsertTicket = async (
  ticketId: string | undefined,
  _actionState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  try {
    // 使用 Zod 验证表单数据的格式和必填字段
    const data = ticketSchema.parse({
      title: formData.get('title'),
      content: formData.get('content'),
      deadline: formData.get('deadline'),
      bounty: formData.get('bounty'),
    })

    const dbData = {
      ...data,
      bounty: toCent(data.bounty),
    }

    // 使用 Prisma 的 upsert 方法更新或创建 Ticket 数据
    await prisma.ticket.upsert({
      where: { id: ticketId || '' }, // 如果 ticketId 存在，则根据 ID 更新；否则创建新记录
      update: dbData, // 更新时使用解析后的数据
      create: dbData, // 创建时使用解析后的数据
    })
  } catch (error) {
    return fromToActionState(error, formData) // 如果发生错误，返回错误信息和表单数据
  }

  // 如果 ticketId 存在，则重定向到更新后的票据页面；否则重定向到票据列表页面
  // 这里的 revalidatePath 用于重新验证路径，以确保数据是最新的
  revalidatePath(ticketsPath())
  if (ticketId) {
    revalidatePath(ticketPath(ticketId))
    await setCookieByKey('toast', 'Ticket updated successfully') // 设置 cookie，以便在重定向后可以使用
    redirect(ticketPath(ticketId))
  }

  return toActionState('SUCCESS', 'Ticket created successfully')
}
