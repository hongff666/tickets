import { signInPath } from '@/paths'
import { redirect } from 'next/navigation'
import { getAuth } from '../actions/get-auth'

export const getAuthOrRedirect = async () => {
  const { user, session } = await getAuth()

  if (!user) {
    redirect(signInPath())
  }

  return { user, session }
}
