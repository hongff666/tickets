import { User } from '@prisma/client'

export const isOwner = (
  user: User | null | undefined,
  entity: { userId: string | null } | null | undefined,
): boolean => {
  if (!user || !entity || !entity.userId) {
    return false
  }

  return user.id === entity.userId
}
