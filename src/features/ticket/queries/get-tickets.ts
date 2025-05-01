import { initialTickets } from "@/data";

import { Ticket } from "../types";

const getTickets = async (): Promise<Ticket[]> => {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return new Promise((resolve) => resolve(initialTickets));
};
export { getTickets };
