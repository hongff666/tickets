'use client'

import { useDebouncedCallback } from 'use-debounce'
import { Input } from './ui/input'

type SearchInputProps = {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
}

export const SearchInput = ({
  placeholder,
  value,
  onChange,
}: SearchInputProps) => {
  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value)
    },
    300,
  )

  return (
    <div className="w-full max-w-[420px]">
      <Input
        defaultValue={value}
        placeholder={placeholder}
        onChange={handleSearch}
      />
    </div>
  )
}
