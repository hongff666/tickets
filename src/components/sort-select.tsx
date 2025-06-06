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

  const handleSearch = (compositeKey: string) => {
    const [sortKey, sortValue] = compositeKey.split('_') as [string, string]
    setSort({ sortKey, sortValue })
  }

  return (
    <div className="w-full max-w-[420px]">
      <Select
        defaultValue={sort.sortKey + '_' + sort.sortValue}
        onValueChange={handleSearch}
      >
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.sortKey + option.sortValue}
              value={option.sortKey + '_' + option.sortValue}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
