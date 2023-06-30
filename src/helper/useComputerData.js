import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

export async function fetchComputerData(url, filia) {
  const { data, status } = await axios.get(`${url}komps/${filia}/`);
  if (status !== 200) {
    throw new Error(`Nastpił problem: ${status}`);
  }
  return data;
}

export function useComputerData(filia, url) {
  return useQuery(['komps', filia], () => fetchComputerData(url, filia), {
    staleTime: 1000 * 60 * 10,

    onError: error => {
      toast.error(error.message, { icon: '❌' });
    },
  });
}
