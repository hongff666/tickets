import { prisma } from '@/lib/prisma'
import { ParsedSearchParams } from '../search-params'

const getTickets = async (
  userId: string | undefined,
  searchParams: Awaited<ParsedSearchParams>,
) => {
  const where = {
    userId,
    title: { contains: searchParams.q, mode: 'insensitive' as const },
  }

  const skip = searchParams.page * searchParams.size
  const take = searchParams.size

  const tickets = await prisma.ticket.findMany({
    where,
    orderBy: {
      [searchParams.sortKey]: searchParams.sortValue,
    },
    skip,
    take,
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
