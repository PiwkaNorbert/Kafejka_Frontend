import { fetchWifiCodes } from '@/fetch'
import { queryOptions } from '@tanstack/react-query'

const KEYS = {
  BASE: 'wifi-codes',
} as const

type CodeQueryKeys = [typeof KEYS.BASE, string | undefined] | [typeof KEYS.BASE]

export const wifiCodesQueryKeys = {
  all: [KEYS.BASE],
  byFilia: (filia: string | undefined) => [KEYS.BASE, filia] as const,
} satisfies Record<string, CodeQueryKeys | ((...args: any[]) => CodeQueryKeys)>

export const wifiCodeOptions = (filia: string) =>
  queryOptions({
    queryKey: wifiCodesQueryKeys.byFilia(filia),
    queryFn: ({ signal }) => fetchWifiCodes(filia, signal),
    staleTime: 1000 * 10,
    refetchInterval: 1000 * 10,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    enabled: !!filia && filia !== 'undefined',
  })
