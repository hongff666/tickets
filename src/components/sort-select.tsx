'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type SortOption = {
  label: string
  value: string
}

type SortSelectProps = {
  defaultValue: string
  options: SortOption[]
}

export const SortSelect = ({ defaultValue, options }: SortSelectProps) => {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === defaultValue) {
      params.delete('sort')
    } else if (value) {
      params.set('sort', value)
    } else {
      params.delete('sort')
    }
    replace(`${pathName}?${params.toString()}`, {
      scroll: false,
    })
  }

  return (
    <div className="w-full max-w-[420px]">
      <Select
        defaultValue={searchParams.get('sort')?.toString() || defaultValue}
        onValueChange={handleSearch}
      >
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
