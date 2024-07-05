import { useQuery } from '@tanstack/react-query';
import { fetchJsonCodes } from '../fetch';

export function useEbookData() {


  const legimiQuery = useQuery({
    queryKey: ['codes'],
    queryFn: ({ signal }) => fetchJsonCodes(signal),
    staleTime: 1000 * 60 * 10,
  }
  );

  return legimiQuery;
}
