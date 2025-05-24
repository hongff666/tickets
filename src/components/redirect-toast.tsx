'use client'

import { deleteCookieByKey, getCookieByKey } from '@/actions/cookies'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const RedirectToast = () => {
  const [hasShownToast, setHasShownToast] = useState(false)

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
  }, [hasShownToast])

  return null
}

export { RedirectToast }
