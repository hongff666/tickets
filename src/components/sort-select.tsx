'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type SortSelectOption = {
  sortKey: string
  sortValue: string
  label: string
}

type SortObject = {
  sortKey: string
  sortValue: string
}

type SortSelectProps = {
  options: SortSelectOption[]
  value: SortObject
  onValueChange?: (sort: SortObject) => void
}

export const SortSelect = ({
  options,
  value,
  onValueChange,
}: SortSelectProps) => {
  const handleSearch = (compositeKey: string) => {
    const [sortKey, sortValue] = compositeKey.split('_') as [string, string]
    onValueChange?.({ sortKey, sortValue })
  }

  return (
    <div className="w-full max-w-[420px]">
      <Select
        defaultValue={`${value.sortKey}_${value.sortValue}`}
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
