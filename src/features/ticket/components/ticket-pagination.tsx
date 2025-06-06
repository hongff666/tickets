'use client'

import { Pagination } from '@/components/pagination'
import { useQueryStates } from 'nuqs'
import { paginationOptions, paginationParser } from '../search-params'

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

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginatedMetadata={paginatedTicketMetadata}
    />
  )
}
