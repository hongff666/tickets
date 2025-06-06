import { createSearchParamsCache, parseAsString } from 'nuqs/server'

export const qParser = parseAsString.withDefault('').withOptions({
  clearOnDefault: true,
  shallow: false,
})
export const sortParser = parseAsString.withDefault('newest').withOptions({
  clearOnDefault: true,
  shallow: false,
})

export const searchParamsCache = createSearchParamsCache({
  q: qParser,
  sort: sortParser,
})

export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>
