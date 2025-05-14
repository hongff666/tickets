'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import {
  ActionState,
  fromToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state'
import { prisma } from '@/lib/prisma'
import { ticketPath, ticketsPath } from '@/paths'

const ticketSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
})

export const upsertTicket = async (
  ticketId: string | undefined,
  _actionState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  try {
    // 使用 Zod 验证表单数据的格式和必填字段
    const data = ticketSchema.parse({
      title: formData.get('title') as string, // 获取表单中的标题字段
      content: formData.get('content') as string, // 获取表单中的内容字段
    })

    // 使用 Prisma 的 upsert 方法更新或创建 Ticket 数据
    await prisma.ticket.upsert({
      where: { id: ticketId || '' }, // 如果 ticketId 存在，则根据 ID 更新；否则创建新记录
      update: data, // 更新时使用解析后的数据
      create: data, // 创建时使用解析后的数据
    })
  } catch (error) {
    return fromToActionState(error, formData) // 如果发生错误，返回错误信息和表单数据
  }

  // 如果 ticketId 存在，则重定向到更新后的票据页面；否则重定向到票据列表页面
  // 这里的 revalidatePath 用于重新验证路径，以确保数据是最新的
  revalidatePath(ticketsPath())
  if (ticketId) {
    revalidatePath(ticketPath(ticketId))
    redirect(ticketPath(ticketId))
  }

  return toActionState('SUCCESS', 'Ticket updated/created successfully')
}
