'use client'

import { LucideLoaderCircle } from 'lucide-react'
import { useFormStatus } from 'react-dom'

import React from 'react'
import { Button } from '../ui/button'

export const SubmitButton = ({
  label,
  icon,
}: {
  label: string
  icon?: React.ReactNode
}) => {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <LucideLoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      ) : null}
      {icon}
      {label}
    </Button>
  )
}
