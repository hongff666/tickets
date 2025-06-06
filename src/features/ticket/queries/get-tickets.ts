import { prisma } from '@/lib/prisma'
import { ParsedSearchParams } from '../search-params'

const getTickets = async (
  userId: string | undefined,
  searchParams: Awaited<ParsedSearchParams>,
) => {
  const tickets = await prisma.ticket.findMany({
    where: {
      userId,
      title: { contains: searchParams.q, mode: 'insensitive' },
    },
    orderBy: {
      ...(searchParams.sort === 'bounty' && { bounty: 'desc' }),
      ...(searchParams.sort === 'newest' && { createdAt: 'desc' }),
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
