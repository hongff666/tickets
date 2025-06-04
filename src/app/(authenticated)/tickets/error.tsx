'use client'

import { PlaceHolder } from '@/components/placeholder'

const Error = ({ error }: { error: Error }) => {
  return (
    <PlaceHolder
      label={error.message || 'An error occurred while loading the tickets.'}
    />
  )
}
export default Error
