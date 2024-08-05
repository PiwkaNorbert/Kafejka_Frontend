import { useQuery } from '@tanstack/react-query';
import { fetchHotspotData } from '../fetch';


export function useHotspotData(url: string, filia: string) {
  const wifiCodesQuery = useQuery({
    queryKey: ['wifiCodes', filia],
    queryFn: ({ signal }) => fetchHotspotData(url, filia, signal),
    staleTime: 1000 * 10,
    refetchInterval: 1000 * 10,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,

  }
  );
  return wifiCodesQuery;
}
