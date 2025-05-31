'use server'

import { invalidateSession } from '@/lib/session'
import { signInPath } from '@/paths'
import { redirect } from 'next/navigation'
import { getAuth } from './get-auth'

export const signOut = async () => {
  const { session } = await getAuth()

  if (!session) {
    redirect(signInPath())
  }

  await invalidateSession(session.id)

  redirect(signInPath())
}
