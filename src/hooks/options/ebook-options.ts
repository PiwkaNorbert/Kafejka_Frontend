import { fetchEbookCodes } from '@/fetch'
import { queryOptions } from '@tanstack/react-query'

const KEYS = {
  BASE: 'codes',
} as const

type QueryKeys = [typeof KEYS.BASE]

export const ebookQueryKeys = {
  all: [KEYS.BASE],
} satisfies Record<string, QueryKeys | ((...args: any[]) => QueryKeys)>

export const ebookOptions = () =>
  queryOptions({
    queryKey: ebookQueryKeys.all,
    queryFn: ({ signal }) => fetchEbookCodes(signal),
    staleTime: 1000 * 5,
    refetchInterval: 1000 * 5,
    gcTime: 1000 * 60 * 10,
  })
