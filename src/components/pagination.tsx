import { Button } from './ui/button'

type PaginationObject = {
  page: number
  size: number
}

type PaginationProps = {
  pagination: PaginationObject
  onPagination: (pagination: PaginationObject) => void
  paginatedMetadata: {
    count: number
    hasNextPage: boolean
  }
}

export const Pagination = ({
  pagination,
  onPagination,
  paginatedMetadata,
}: PaginationProps) => {
  const startOffset = pagination.page * pagination.size + 1
  const endOffset = startOffset - 1 + pagination.size
  const label = `${startOffset} - ${endOffset} / ${paginatedMetadata.count}`

  const handlePreviousPage = () => {
    onPagination({ ...pagination, page: pagination.page - 1 })
  }

  const handleNextPage = () => {
    onPagination({ ...pagination, page: pagination.page + 1 })
  }

  const previousButton = () => {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled={pagination.page < 1}
        onClick={handlePreviousPage}
      >
        Previous
      </Button>
    )
  }

  const nextButton = () => {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled={!paginatedMetadata.hasNextPage}
        onClick={handleNextPage}
      >
        Next
      </Button>
    )
  }

  return (
    <div className="flex items-center justify-between">
      <p className="text-muted-foreground text-sm">{label}</p>
      <div className="flex gap-x-2">
        {previousButton()}
        {nextButton()}
      </div>
    </div>
  )
}
