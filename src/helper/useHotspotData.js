import { useQuery } from '@tanstack/react-query';

export function useHotspotData(url, filia) {
  const wifiCodesQuery = useQuery(['wifiCodes', filia], () =>
    fetch(`${url}get-codes/${filia}/`)
      .then(res => res.json())
      .catch(err => {
        throw new Error(`Nastpił problem: ${err}`);
      })
  );
  return wifiCodesQuery;
}
