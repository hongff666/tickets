import { prisma } from '@/lib/prisma'
import { ParsedSearchParams } from '../search-params'

const getTickets = async (
  userId: string | undefined,
  searchParams: Awaited<ParsedSearchParams>,
) => {
  const tickets = await prisma.ticket.findMany({
    where: {
      userId,
      ...(typeof searchParams.q === 'string' &&
        searchParams.q.length > 0 && {
          title: { contains: searchParams.q, mode: 'insensitive' },
        }),
    },
    orderBy: {
      ...(searchParams.sort === 'bounty' && { bounty: 'desc' }),
      ...(searchParams.sort === undefined && { createdAt: 'desc' }),
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
