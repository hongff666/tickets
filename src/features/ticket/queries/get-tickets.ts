import { prisma } from '@/lib/prisma'

const getTickets = async (userId: string | undefined | null) => {
  const tickets = await prisma.ticket.findMany({
    where: {
      userId: userId ? userId : undefined,
    },
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
