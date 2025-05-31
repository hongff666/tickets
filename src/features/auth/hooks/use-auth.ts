'use client'

import { User } from '@prisma/client'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getAuth } from '../actions/get-auth'

export const useAuth = () => {
  const pathname = usePathname()
  useEffect(() => {
    const fetchUser = async () => {
      const auth = await getAuth()
      setUser(auth.user)
      setIsFetched(true)
    }

    fetchUser()
  }, [pathname])

  const [user, setUser] = useState<User | null>(null)
  const [isFetched, setIsFetched] = useState(false)

  return { user, isFetched }
}
