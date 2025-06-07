import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from 'nuqs/server'

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

export const paginationParser = {
  page: parseAsInteger.withDefault(0),
  size: parseAsInteger.withDefault(10),
}

export const paginationOptions = {
  clearOnDefault: true,
  shallow: false,
}

export const searchParamsCache = createSearchParamsCache({
  q: qParser,
  ...sortParser,
  ...paginationParser,
})

export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>
