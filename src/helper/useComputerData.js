import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchComputerData = async (url, filia, signal) => {
  const { data } = await axios.get(`${url}komps/${filia}/`, { signal });
  return data;
};

export function useComputerData(filia, url) {
  return useQuery(
    ['komps', filia],
    ({ signal }) => fetchComputerData(url, filia, signal),
    {
      staleTime: 1000 * 30,
      refetchInterval: 1000 * 30,
      retry: 3,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      keepPreviousData: true,

      onError: error => {
        console.error(error);
        return toast.error(error.message, { icon: '❌', toastId: 'komps' });
      },
    }
  );
}
