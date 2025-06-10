import { PaginatedData } from '@/types/pagination'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

type PaginationObject = {
  page: number
  size: number
}

type PaginationProps = {
  pagination: PaginationObject
  onPagination: (pagination: PaginationObject) => void
  paginatedMetadata: PaginatedData<unknown>['metadata']
}

export const Pagination = ({
  pagination,
  onPagination,
  paginatedMetadata,
}: PaginationProps) => {
  const startOffset = pagination.page * pagination.size + 1
  const endOffset = startOffset - 1 + pagination.size
  const actualEndOffset = Math.min(endOffset, paginatedMetadata.count)
  const label = `${startOffset} - ${actualEndOffset} / ${paginatedMetadata.count}`

  const handlePreviousPage = () => {
    onPagination({ ...pagination, page: pagination.page - 1 })
  }

  const handleNextPage = () => {
    onPagination({ ...pagination, page: pagination.page + 1 })
  }

  const handleSizeChange = (value: string) => {
    onPagination({ ...pagination, page: 0, size: parseInt(value) })
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

  const sizeButton = () => {
    return (
      <Select
        defaultValue={pagination.size.toString()}
        onValueChange={handleSizeChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectContent>
      </Select>
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
        {sizeButton()}
        {nextButton()}
      </div>
    </div>
  )
}
