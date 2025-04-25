import { IP_MATEUSZ } from '@/constants';
import { fetchApi } from '@/lib/custom-fetch';
import { GetWifiCodesResponse } from '@/types/wifi-codes';
import { queryOptions } from '@tanstack/react-query';

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
  queryFn: ({ signal }) => fetchApi<GetWifiCodesResponse>({ url: IP_MATEUSZ, port: '8080', path: `/get-codes/${filia}` }, { signal: signal as AbortSignal }),
  staleTime: 1000 * 10,
  refetchInterval: 1000 * 10,
  refetchOnWindowFocus: true,
  refetchOnMount: true,
  refetchOnReconnect: true,
  enabled: !!filia,
})
