import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

export async function fetchComputerData(signal) {
  const hostnameDomain = window.location.hostname.includes('192.168.200.30');
  const hostnameForward = window.location.hostname.includes('192.168.200.37');
  const hostnameStalowe = window.location.hostname.includes('192.168.3.34');
  const port = '8000';
  const urlStalowy = `http://192.168.3.34:${port}/`;
  const urlDomena = `http://192.168.200.30:${port}/`;
  const urlForward = `http://192.168.200.37:${port}/`;

  let urlLegmi = hostnameDomain
    ? urlDomena
    : hostnameForward
    ? urlForward
    : hostnameStalowe
    ? urlStalowy
    : urlForward;

  const { data, status } = await axios.get(`${urlLegmi}json-codes/`, {
    signal,
  });
  if (status !== 200) {
    throw new Error(`Nastpił problem: ${status}`);
  }
  return data;
}

export function useEbookData() {
  const legimiQuery = useQuery(
    ['codes'],
    ({ signal }) => fetchComputerData(signal),
    {
      staleTime: 1000 * 60 * 10,
      onError: error => {
        console.error(error);
        toast.error(error.message, { icon: '❌', toastId: 'codes' });
      },
    }
  );

  return legimiQuery;
}
