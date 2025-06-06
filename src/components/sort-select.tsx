'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { sortParser } from '@/features/ticket/search-params'
import { useQueryState } from 'nuqs'

type SortOption = {
  label: string
  value: string
}

type SortSelectProps = {
  options: SortOption[]
}

export const SortSelect = ({ options }: SortSelectProps) => {
  const [sort, setSort] = useQueryState('sort', sortParser)

  const handleSearch = (value: string) => {
    setSort(value)
  }

  return (
    <div className="w-full max-w-[420px]">
      <Select defaultValue={sort} onValueChange={handleSearch}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
