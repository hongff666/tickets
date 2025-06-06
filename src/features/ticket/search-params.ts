import { createSearchParamsCache, parseAsString } from 'nuqs/server'

export const qParser = parseAsString.withDefault('').withOptions({
  clearOnDefault: true,
  shallow: false,
})

export const sortParser = {
  sortKey: parseAsString.withDefault('createdAt'),
  sortValue: parseAsString.withDefault('desc'),
}

export const sortOptions = {
  clearOnDefault: true,
  shallow: false,
}

export const searchParamsCache = createSearchParamsCache({
  q: qParser,
  ...sortParser,
})

export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>
