import { validateSessionToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { cache } from 'react'

export const getAuth = cache(async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value

  if (token) {
    return await validateSessionToken(token)
  } else {
    return { session: null, user: null }
  }
})
