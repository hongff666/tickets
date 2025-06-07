import { faker } from '@faker-js/faker'
import { sha256 } from '@oslojs/crypto/sha2'
import { PrismaClient, TicketStatus } from '@prisma/client'

function stringToUint8Array(str: string): Uint8Array {
  return new TextEncoder().encode(str)
}

function uint8ArrayToHex(array: Uint8Array): string {
  return Array.from(array)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

let index = 0

const users = [
  {
    username: 'a1',
    email: 'a1@qq.com',
  },
  {
    username: 'a2',
    email: 'a2@qq.com',
  },
  {
    username: 'a3',
    email: 'a3@qq.com',
  },
]

export const tickets = Array.from({ length: 15 }, () => ({
  title: `${index++}: ${faker.lorem.sentence()}`,
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  content: faker.lorem.paragraph(),
  status: faker.helpers.arrayElement([
    TicketStatus.OPEN,
    TicketStatus.CLOSED,
    TicketStatus.IN_PROGRESS,
  ]),
  deadline: faker.date.future().toISOString().split('T')[0],
  bounty: faker.number.float({ min: 0, max: 1000 }),
}))

export const comments = Array.from({ length: 15 }, () => ({
  content: faker.lorem.sentence(),
  createdAt: faker.date.past(),
}))

const prisma = new PrismaClient()

const passwordBytes = stringToUint8Array('admin@123')
const hashedPasswordBytes = sha256(passwordBytes)
const hashedPassword = uint8ArrayToHex(hashedPasswordBytes)

const seed = async () => {
  const t0 = performance.now()

  await prisma.comment.deleteMany()
  await prisma.ticket.deleteMany()
  await prisma.user.deleteMany()

  console.log(`Creating ${tickets.length} tickets...`)

  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({
      ...user,
      passwordHash: hashedPassword,
    })),
  })
  const dbTickets = await prisma.ticket.createManyAndReturn({
    data: tickets.map((ticket) => ({
      ...ticket,
      userId: dbUsers[faker.number.int({ min: 0, max: 2 })].id,
    })),
    skipDuplicates: true,
  })
  await prisma.comment.createMany({
    data: comments.map((comment) => ({
      ...comment,
      userId: dbUsers[faker.number.int({ min: 0, max: 2 })].id,
      ticketId: dbTickets[faker.number.int({ min: 0, max: 14 })].id,
    })),
  })
  tickets
  const t1 = performance.now()
  console.log(`Seed completed in ${t1 - t0} milliseconds.`)
}

seed()
