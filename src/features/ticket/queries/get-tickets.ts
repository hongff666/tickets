import { getAuth } from '@/features/auth/actions/get-auth'
import { isOwner } from '@/features/auth/utils/is-owner'
import { prisma } from '@/lib/prisma'
import { ParsedSearchParams } from '../search-params'

const getTickets = async (
  userId: string | undefined,
  searchParams: Awaited<ParsedSearchParams>,
) => {
  const { user } = await getAuth()

  const where = {
    userId,
    title: { contains: searchParams.q, mode: 'insensitive' as const },
  }

  const skip = searchParams.page * searchParams.size
  const take = searchParams.size

  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
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
    }),
    prisma.ticket.count({
      where,
    }),
  ])

  return {
    list: tickets.map((ticket) => ({
      ...ticket,
      isOwner: isOwner(user, ticket),
    })),
    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  }
}
export { getTickets }
