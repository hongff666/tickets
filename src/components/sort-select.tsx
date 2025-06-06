'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { sortOptions, sortParser } from '@/features/ticket/search-params'
import { useQueryStates } from 'nuqs'

type SortOption = {
  sortKey: string
  sortValue: string
  label: string
}

type SortSelectProps = {
  options: SortOption[]
}

export const SortSelect = ({ options }: SortSelectProps) => {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions)

  const handleSearch = (sortKey: string) => {
    const selectedOption = options.find((option) => option.sortKey === sortKey)
    setSort({ sortKey, sortValue: selectedOption?.sortValue })
  }

  return (
    <div className="w-full max-w-[420px]">
      <Select defaultValue={sort.sortKey} onValueChange={handleSearch}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.sortKey} value={option.sortKey}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
