import { IP_POWROZNICZA } from '../../constants';
import { GetCodesResponse } from '../../types/codes';
import { queryOptions } from '@tanstack/react-query';
import { fetchApi } from '../../lib/custom-fetch';


const KEYS = {
  BASE: 'codes',
} as const

type QueryKeys = [typeof KEYS.BASE]

export const ebookQueryKeys = {
  all: [KEYS.BASE],
} satisfies Record<string, QueryKeys | ((...args: any[]) => QueryKeys)>

export const ebookOptions = () => queryOptions({
  queryKey: ebookQueryKeys.all,
  queryFn: ({ signal }) => fetchApi<GetCodesResponse>({ url: IP_POWROZNICZA, port: '8081', path: `/codes` }, { signal: signal as AbortSignal }),
  staleTime: 1000 * 5,
  refetchInterval: 1000 * 5,
  gcTime: 1000 * 60 * 10,
})

