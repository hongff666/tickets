import { initialTickets } from "@/data";

export const getTicket = async (ticketId: string) => {
  const maybeTicket = initialTickets.find((ticket) => ticket.id === ticketId) || null;

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return maybeTicket;
};
