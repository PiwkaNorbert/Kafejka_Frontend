import { queryOptions } from '@tanstack/react-query';
import { fetchApi } from '../../lib/custom-fetch';
import { GetWifiCodesResponse } from '../../types/wifi-codes';

const KEYS = {
  BASE: 'wifi-codes',
} as const

type CodeQueryKeys = [typeof KEYS.BASE, string | undefined] | [typeof KEYS.BASE]

export const wifiCodesQueryKeys = {
  all: [KEYS.BASE],
  byFilia: (filia: string | undefined) => [KEYS.BASE, filia] as const,
} satisfies Record<string, CodeQueryKeys | ((...args: any[]) => CodeQueryKeys)>

export const wifiCodeOptions = (filia: string | undefined) => queryOptions({
  queryKey: wifiCodesQueryKeys.byFilia(filia),
  queryFn: ({ signal }) => fetchApi<GetWifiCodesResponse>({ url: 'http://192.168.15.220', port: '8080', path: `/get-codes/${filia}` }, { signal: signal as AbortSignal }),
  staleTime: 1000 * 10,
  refetchInterval: 1000 * 10,
  refetchOnWindowFocus: true,
  refetchOnMount: true,
  refetchOnReconnect: true,
  enabled: !!filia,
})
