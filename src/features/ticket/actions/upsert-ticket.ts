"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";

const ticketSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

/**
 * 异步函数，用于创建或更新票据数据。
 *
 * @param ticketId - 票据的唯一标识符，如果未提供则创建新票据。
 * @param _actionState - 包含消息和错误信息的状态对象。
 * @param formData - 包含表单数据的 FormData 对象。
 * @returns 包含操作结果消息和错误信息的对象。
 */
export const upsertTicket = async (
  ticketId: string | undefined,
  _actionState: {
    message: string;
    error?: Record<string, string>;
  },
  formData: FormData
) => {
  try {
    // 使用 Zod 验证表单数据的格式和必填字段
    const data = ticketSchema.parse({
      title: formData.get("title") as string, // 获取表单中的标题字段
      content: formData.get("content") as string, // 获取表单中的内容字段
    });

    // 使用 Prisma 的 upsert 方法更新或创建 Ticket 数据
    await prisma.ticket.upsert({
      where: { id: ticketId || "" }, // 如果 ticketId 存在，则根据 ID 更新；否则创建新记录
      update: data, // 更新时使用解析后的数据
      create: data, // 创建时使用解析后的数据
    });
  } catch (error) {
    // 捕获错误并处理, 如果是 ZodError，则提取错误信息, 否则返回数据库错误
    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce((acc, curr) => {
        const field = curr.path[0];
        const message = curr.message;
        acc[field] = message;
        return acc;
      }, {} as Record<string, string>);

      return { message: "Validation errors", error: errors };
    } else {
      return { message: (error as Error).message };
    }
  }

  // 如果 ticketId 存在，则重定向到更新后的票据页面；否则重定向到票据列表页面
  // 这里的 revalidatePath 用于重新验证路径，以确保数据是最新的
  revalidatePath(ticketsPath());
  if (ticketId) {
    revalidatePath(ticketPath(ticketId));
    redirect(ticketPath(ticketId));
  }

  return { message: "Ticket created/updated successfully" };
};
