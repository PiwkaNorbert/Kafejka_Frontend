import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

export async function fetchHotspotData(url, filia) {
  const { data, status } = await axios.get(`${url}get-codes/${filia}/`);
  if (status !== 200) {
    throw new Error(`Nastpił problem: ${status}`);
  }
  return data;
}

export function useHotspotData(url, filia) {
  const wifiCodesQuery = useQuery(
    ['wifiCodes', filia],
    () => fetchHotspotData(url, filia),
    {
      staleTime: 1000 * 60 * 10,

      onError: error => {
        console.log(error);
        return toast.error(error.message, { icon: '❌', toastId: 'wifiCodes' });
      },
    }
  );
  return wifiCodesQuery;
}
