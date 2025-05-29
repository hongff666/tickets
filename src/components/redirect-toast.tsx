'use client'

import { deleteCookieByKey, getCookieByKey } from '@/actions/cookies'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

const RedirectToast = () => {
  const pathName = usePathname()

  useEffect(() => {
    ;(async () => {
      const message = await getCookieByKey('toast')
      if (message) {
        await deleteCookieByKey('toast')
        toast.success(message)
      }
    })()
  }, [pathName])

  return null
}

export { RedirectToast }
