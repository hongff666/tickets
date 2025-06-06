import { Button } from './ui/button'

type PaginationObject = {
  page: number
  size: number
}

type PaginationProps = {
  pagination: PaginationObject
  onPagination: (pagination: PaginationObject) => void
}

export const Pagination = ({ pagination, onPagination }: PaginationProps) => {
  const startOffset = pagination.page * pagination.size + 1
  const endOffset = startOffset - 1 + pagination.size
  const label = `${startOffset} - ${endOffset} / 100`

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
        disabled={endOffset >= 100} // Assuming 100 is the total count of items
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
