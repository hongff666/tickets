'use client'

import { deleteCookieByKey, getCookieByKey } from '@/actions/cookies'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const RedirectToast = () => {
  const [hasShownToast, setHasShownToast] = useState(false)
  const pathName = usePathname()

  useEffect(() => {
    if (hasShownToast) return
    ;(async () => {
      const message = await getCookieByKey('toast')
      if (message) {
        await deleteCookieByKey('toast')
        toast.success(message)
        setHasShownToast(true)
      }
    })()
  }, [hasShownToast, pathName])

  return null
}

export { RedirectToast }
