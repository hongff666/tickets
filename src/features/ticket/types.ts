type Ticket = {
  id: string;
  title: string;
  content: string;
  status: "OPEN" | "IN-PROGRESS" | "DONE";
  createdAt: Date;
  updatedAt: Date;
};

export type { Ticket };
