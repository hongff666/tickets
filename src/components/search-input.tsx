'use client'

import { qParser } from '@/features/ticket/search-params'
import { useQueryState } from 'nuqs'
import { useDebouncedCallback } from 'use-debounce'
import { Input } from './ui/input'

type SearchInputProps = {
  placeholder?: string
}

export const SearchInput = ({ placeholder }: SearchInputProps) => {
  const [q, setQ] = useQueryState('q', qParser)

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQ(e.target.value)
    },
    500,
  )

  return (
    <div className="w-full max-w-[420px]">
      <Input
        defaultValue={q}
        placeholder={placeholder}
        onChange={handleSearch}
      />
    </div>
  )
}
