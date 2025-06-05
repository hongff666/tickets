'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Input } from './ui/input'

type SearchInputProps = {
  placeholder?: string
}

export const SearchInput = ({ placeholder }: SearchInputProps) => {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('q', value)
    } else {
      params.delete('q')
    }
    replace(`${pathName}?${params.toString()}`, {
      scroll: false,
    })
  }

  return (
    <div className="w-full max-w-[420px]">
      <Input placeholder={placeholder} onChange={handleSearch} />
    </div>
  )
}
