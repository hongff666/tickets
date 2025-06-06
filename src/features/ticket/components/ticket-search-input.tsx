'use client'

import { SearchInput } from '@/components/search-input'
import { useQueryState } from 'nuqs'
import { qParser } from '../search-params'

type TicketSearchInputProps = {
  placeholder?: string
}

export const TicketSearchInput = ({ placeholder }: TicketSearchInputProps) => {
  const [q, setQ] = useQueryState('q', qParser)

  return <SearchInput placeholder={placeholder} onChange={setQ} value={q} />
}
