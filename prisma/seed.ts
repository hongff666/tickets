import { TicketStatus } from "@prisma/client";

export const tickets = [
  {
    title: "Ticket 1",
    content: "This is the content of ticket 1 from prisma",
    status: TicketStatus.OPEN,
  },
  {
    title: "Ticket 2",
    content: "This is the content of ticket 2 from prisma",
    status: TicketStatus.CLOSED,
  },
  {
    title: "Ticket 3",
    content: "This is the content of ticket 3 from prisma",
    status: TicketStatus.IN_PROGRESS,
  },
];

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  const t0 = performance.now();
  await prisma.ticket.deleteMany();

  await prisma.ticket.createMany({
    data: tickets,
  });

  const t1 = performance.now();
  console.log(`Seed completed in ${t1 - t0} milliseconds.`);
};

seed();
