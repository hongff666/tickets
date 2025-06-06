'use client'

import { Pagination } from '@/components/pagination'
import { useQueryState, useQueryStates } from 'nuqs'
import { useEffect, useRef } from 'react'
import { paginationOptions, paginationParser, qParser } from '../search-params'

type TicketpaginationProps = {
  paginatedTicketMetadata: {
    count: number
    hasNextPage: boolean
  }
}

export const TicketPagination = ({
  paginatedTicketMetadata,
}: TicketpaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions,
  )

  const [q] = useQueryState('q', qParser)

  const preQ = useRef(q)

  useEffect(() => {
    if (preQ.current !== q) {
      setPagination({ ...pagination, page: 0 })
      preQ.current = q
    }
  }, [q, pagination])

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginatedMetadata={paginatedTicketMetadata}
    />
  )
}
