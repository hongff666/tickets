'use client'

import { SearchInput } from '@/components/search-input'
import { useQueryState, useQueryStates } from 'nuqs'
import { paginationOptions, paginationParser, qParser } from '../search-params'

type TicketSearchInputProps = {
  placeholder?: string
}

export const TicketSearchInput = ({ placeholder }: TicketSearchInputProps) => {
  const [q, setQ] = useQueryState('q', qParser)

  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions,
  )

  const handleSearch = (value: string) => {
    setQ(value)
    setPagination({ ...pagination, page: 0 })
  }

  return (
    <SearchInput placeholder={placeholder} onChange={handleSearch} value={q} />
  )
}
