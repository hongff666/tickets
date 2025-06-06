import { createSearchParamsCache, parseAsString } from 'nuqs/server'

export const searchParamsCache = createSearchParamsCache({
  q: parseAsString.withDefault(''),
  sort: parseAsString.withDefault(''),
})

export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>
