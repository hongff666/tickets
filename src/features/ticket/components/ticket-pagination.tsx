'use client'

import { Pagination } from '@/components/pagination'
import { PaginatedData } from '@/types/pagination'
import { useQueryState, useQueryStates } from 'nuqs'
import { useEffect, useRef } from 'react'
import { paginationOptions, paginationParser, qParser } from '../search-params'
import { TicketWithMetadata } from '../types'

type TicketPaginationProps = {
  paginatedTicketMetadata: PaginatedData<TicketWithMetadata>['metadata']
}

export const TicketPagination = ({
  paginatedTicketMetadata,
}: TicketPaginationProps) => {
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
  }, [q, pagination, setPagination])

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginatedMetadata={paginatedTicketMetadata}
    />
  )
}
