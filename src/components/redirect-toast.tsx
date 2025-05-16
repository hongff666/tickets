'use client'

import { deleteCookieByKey, getCookieByKey } from '@/actions/cookies'
import { useEffect } from 'react'
import { toast } from 'sonner'

const RedirectToast = () => {
  useEffect(() => {
    getCookieByKey('toast').then((message) => {
      if (message) {
        deleteCookieByKey('toast').then(() => {
          toast.success(message)
        })
      }
    })
  }, [])

  return null
}

export { RedirectToast }
