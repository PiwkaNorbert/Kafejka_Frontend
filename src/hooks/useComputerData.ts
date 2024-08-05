import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ComputerArray } from '../types/computer';
import { fetchComputerData } from '../fetch';


export function useComputerData(url: string, filia: string) {
  const queryClient = useQueryClient()
  return useQuery<ComputerArray>({
    queryKey: ['komps', filia],
    queryFn: ({ signal }) => fetchComputerData(url, filia, signal),
    placeholderData: queryClient.getQueryData(['komps', filia]),
    staleTime: 1000 * 10,
    refetchInterval: 1000 * 10,
    retry: 3,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  }
  );
}
