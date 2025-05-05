"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";

export const updateTicket = async (ticketId: string, formData: FormData) => {
  const data = {
    title: formData.get("title"),
    content: formData.get("content"),
  };

  await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      title: data.title as string,
      content: data.content as string,
    },
  });

  revalidatePath(ticketsPath());
  revalidatePath(ticketPath(ticketId));
  redirect(ticketsPath());
};
