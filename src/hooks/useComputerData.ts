import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IP_MATEUSZ } from '@/constants';
import { fetchApi } from '@/lib/custom-fetch';
import { ComputerArray } from '@/types/computer';
import { useWebSocket } from './useWebSocket';

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

  // Only initialize WebSocket if we have a valid filia
  useWebSocket(filia || '');

  return useQuery<ComputerArray>({
    queryKey: computerQueryKeys.byFilia(filia),
    queryFn: ({ signal }) => {
      // Return a promise that never resolves - we'll get data from WebSocket
      return new Promise(() => {});
    },
    placeholderData: (oldData) => oldData ?? [],
    staleTime: Infinity, // Never mark as stale since WebSocket handles updates
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: false,
    retry: false, // No retries needed since we're not actually fetching
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    select: (data) => {
      if (!Array.isArray(data)) {
        console.warn('Received non-array data from server:', data);
        return [];
      }
      return data.map(computer => ({
        ...computer,
        online: Math.floor(computer.online / 30) * 30, // Round to nearest 30 seconds
      }));
    },
    enabled: Boolean(filia), // Only enable if filia is truthy
  });
}
