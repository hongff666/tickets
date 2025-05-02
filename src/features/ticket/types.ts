type Ticket = {
  id: string;
  title: string;
  content: string;
  status: TicketStatus;
  createdAt?: Date;
  updatedAt?: Date;
};

type TicketStatus = "OPEN" | "IN_PROGRESS" | "CLOSED";

export type { Ticket, TicketStatus };
