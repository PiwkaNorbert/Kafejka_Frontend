import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IP_MATEUSZ } from '@/constants';
import { fetchApi } from '@/lib/custom-fetch';
import { ComputerArray } from '@/types/computer';


const KEYS = {
  BASE: 'komps',
} as const

type QueryKeys = [typeof KEYS.BASE, string | undefined] | [typeof KEYS.BASE] | [typeof KEYS.BASE, string | undefined, string | undefined]

export const computerQueryKeys = {
  all: [KEYS.BASE],
  add: (filia: string | undefined) => [KEYS.BASE, 'add', filia] as const,
  byFilia: (filia: string | undefined) => [KEYS.BASE, filia] as const,
} satisfies Record<string, QueryKeys | ((...args: any[]) => QueryKeys)>





export function useComputerData(filia: string | undefined) {
  const queryClient = useQueryClient()
  return useQuery<ComputerArray>({
    queryKey: computerQueryKeys.byFilia(filia),
    queryFn: ({ signal }) => fetchApi<ComputerArray>({ url: IP_MATEUSZ, port: '8080', path: `/komps/${filia}` }, { signal: signal as AbortSignal }),
    placeholderData: queryClient.getQueryData(computerQueryKeys.byFilia(filia)),
    staleTime: 1000 * 10,
    refetchInterval: (query) => {
      return query.state.error ? false : 1000 * 10
    },
    retry: true,
    retryDelay(attemptIndex) {
      const delays = [1000, 5000, 15000, 30000]
      return delays[attemptIndex] ?? 60000
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    select: (data) => {
      // Only update if there are actual changes
      return data.map(computer => ({
        ...computer,
        online: Math.floor(computer.online / 30) * 30, // Round to nearest 30 seconds
      }));
    },
    enabled: typeof filia === 'string',
  }
  );
}
