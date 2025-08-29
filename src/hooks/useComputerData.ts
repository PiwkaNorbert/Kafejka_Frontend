import type { ComputerArray } from '@/types/computer'
import { useQuery } from '@tanstack/react-query'
import { useWebSocket } from './useWebSocket'
import { fetchComputerData } from '@/fetch'

const KEYS = {
  BASE: 'komps',
} as const

type QueryKeys =
  | [typeof KEYS.BASE, string | undefined]
  | [typeof KEYS.BASE]
  | [typeof KEYS.BASE, string | undefined, string | undefined]

export const computerQueryKeys = {
  all: [KEYS.BASE],
  add: (filia: string | undefined) => [KEYS.BASE, 'add', filia] as const,
  byFilia: (filia: string | undefined) => [KEYS.BASE, filia] as const,
} satisfies Record<string, QueryKeys | ((...args: any[]) => QueryKeys)>



export function useComputerData(filia: string | undefined) {
  // Initialize WebSocket connection
  useWebSocket(filia || '')


  return useQuery<ComputerArray>({
    queryKey: computerQueryKeys.byFilia(filia),
    // This is a fallback query function that would normally fetch data from the server
    // In this case, WebSocket is our primary data source
    queryFn: ({ signal }) => fetchComputerData(filia || '', signal),
    placeholderData: (oldData) => oldData ?? [],
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
    refetchInterval: false,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    select: (data) => {

      if (!Array.isArray(data)) {
        return []
      }
      return data.map((computer) => ({
        ...computer,
        online: Math.floor(computer.online / 30) * 30,
      }))
    },
    enabled: Boolean(filia),
  })
}
