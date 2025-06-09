import { Prisma } from '.prisma/client/default.js'

export type CommentWithMetadata = Prisma.CommentGetPayload<{
  include: {
    user: {
      select: {
        username: true
      }
    }
  }
}> & { isOwner: boolean }
