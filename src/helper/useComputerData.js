import { useQuery } from '@tanstack/react-query';

export function useComputerData(filia, url) {
  const computerData = useQuery(['komps', filia], () =>
    fetch(`${url}komps/${filia}/`).then(res => res.json())
  );
  return computerData;
}
