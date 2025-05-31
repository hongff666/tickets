import { prisma } from '@/lib/prisma'

const getTickets = async () => {
  const tickets = await prisma.ticket.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  })
  return tickets
}
export { getTickets }
