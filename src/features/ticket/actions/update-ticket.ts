"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";

export const updateTicket = async (formData: FormData) => {
  const data = {
    id: formData.get("id"),
    title: formData.get("title"),
    content: formData.get("content"),
  };

  await prisma.ticket.update({
    where: { id: data.id as string },
    data: {
      title: data.title as string,
      content: data.content as string,
    },
  });

  revalidatePath(ticketsPath());
  revalidatePath(ticketPath(data.id as string));
  redirect(ticketsPath());
};
