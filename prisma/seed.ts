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
    username: 'admin',
    email: 'admin@qq.com',
  },
  {
    username: 'user',
    email: 'user@qq.com',
  },
]

export const tickets = Array.from({ length: 3 }, () => ({
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

const prisma = new PrismaClient()

const passwordBytes = stringToUint8Array('admin@123')
const hashedPasswordBytes = sha256(passwordBytes)
const hashedPassword = uint8ArrayToHex(hashedPasswordBytes)

const seed = async () => {
  const t0 = performance.now()

  await prisma.user.deleteMany()
  await prisma.ticket.deleteMany()

  console.log(`Creating ${tickets.length} tickets...`)

  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({
      ...user,
      passwordHash: hashedPassword,
    })),
  })
  await prisma.ticket.createMany({
    data: tickets.map((ticket) => ({
      ...ticket,
      userId: dbUsers[1].id,
    })),
    skipDuplicates: true,
  })

  const t1 = performance.now()
  console.log(`Seed completed in ${t1 - t0} milliseconds.`)
}

seed()
