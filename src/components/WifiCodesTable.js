import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ErrorCallback from './Errors/ErrorCallback';

const WifiCodesTable = ({ url, filia }) => {
  const wifiCodesQuery = useQuery(['wifiCodes'], () =>
    fetch(`${url}get-codes/${filia}/`).then(res => res.json())
  );
  if (wifiCodesQuery.isLoading)
    return (
      <tr className="la-ball-clip-rotate la-dark la-sm">
        <td></td>
      </tr>
    );
  if (wifiCodesQuery.error) return <ErrorCallback />;

  const wifiCodesValues = wifiCodesQuery.data.map((code, index) => {
    return (
      <tr
        style={{
          backgroundColor: `${
            code.fields.w === 0 ? 'var(--red)' : 'var(--green)'
          }`,
          color: 'var(--white)',
        }}
        key={index}
      >
        <td>{code.fields.cz}</td>
        <td style={{ textAlign: 'right' }}>
          {Math.trunc(Math.abs(+code.fields.nr + 1745) / 3)}
        </td>
      </tr>
    );
  });
  return wifiCodesValues;
};
export default WifiCodesTable;
