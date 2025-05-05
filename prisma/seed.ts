import { faker } from "@faker-js/faker";
import { TicketStatus } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

let index = 0;

export const tickets = Array.from({ length: 20 }, () => ({
  title: `${index++}: ${faker.lorem.sentence()}`,
  content: faker.lorem.paragraph(),
  status: faker.helpers.arrayElement([
    TicketStatus.OPEN,
    TicketStatus.CLOSED,
    TicketStatus.IN_PROGRESS,
  ]),
}));

const prisma = new PrismaClient();

const seed = async () => {
  const t0 = performance.now();
  await prisma.ticket.deleteMany();

  console.log(`Creating ${tickets.length} tickets...`);

  await prisma.ticket.createMany({
    data: tickets,
    skipDuplicates: true,
  });

  const t1 = performance.now();
  console.log(`Seed completed in ${t1 - t0} milliseconds.`);
};

seed();
