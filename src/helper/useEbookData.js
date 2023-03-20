import { useQuery } from '@tanstack/react-query';

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

export function useEbookData() {
  const legimiQuery = useQuery(['codes'], () =>
    fetch(`${urlLegmi}json-codes/`).then(res => res.json())
  );

  return legimiQuery;
}
