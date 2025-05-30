'use client'

import { LucideLoaderCircle } from 'lucide-react'
import { useFormStatus } from 'react-dom'

import clsx from 'clsx'
import React, { cloneElement } from 'react'
import { Button } from '../ui/button'

export const SubmitButton = ({
  label,
  icon,
}: {
  label?: string
  icon?: React.ReactElement
}) => {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <LucideLoaderCircle
          className={clsx('h-4 w-4 animate-spin', {
            'mr-2': !!label || icon,
          })}
        />
      ) : null}

      {label}
      {pending ? null : icon ? (
        <span
          className={clsx({
            'ml-2': !!label,
          })}
        >
          {cloneElement(icon as React.ReactElement<{ className?: string }>, {
            className: 'h-4 w-4',
          })}
        </span>
      ) : null}
    </Button>
  )
}
