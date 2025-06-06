import { createSearchParamsCache, parseAsString } from 'nuqs/server'

export const searchParamsCache = createSearchParamsCache({
  q: parseAsString.withDefault(''),
  sort: parseAsString.withDefault(''),
})

export type ParsedSearchParams = ReturnType<typeof searchParamsCache.parse>
