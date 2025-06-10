'use server'

import { getAuth } from '@/features/auth/actions/get-auth'
import { isOwner } from '@/features/auth/utils/is-owner'
import { prisma } from '@/lib/prisma'

export const getComments = async (ticketId: string, cursor?: number) => {
  const { user } = await getAuth()

  const take = 2

  const where = {
    ticketId,
    createdAt: {
      lt: cursor ? new Date(cursor) : undefined,
    },
  }

  const [comments, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      take,
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.comment.count({
      where,
    }),
  ])

  return {
    list: comments.map((comment) => ({
      ...comment,
      isOwner: isOwner(user, comment),
    })),
    metadata: {
      count,
      hasNextPage: true,
      cursor: comments.at(-1)?.createdAt.getTime(),
    },
  }
}
