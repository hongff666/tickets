type Ticket = {
  id: string;
  title: string;
  content: string;
  status: TicketStatus;
  createdAt: Date;
  updatedAt: Date;
};

type TicketStatus = "OPEN" | "IN-PROGRESS" | "DONE";

export type { Ticket, TicketStatus };
