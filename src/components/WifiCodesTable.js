import React from 'react';
import { useHotspotData } from '../helper/useHotspotData';

const WifiCodesTable = ({ url, filia }) => {
  const wifiCodesQuery = useHotspotData(url, filia);
  const wifiCodesData = wifiCodesQuery.data.map((code, index) => {
    return (
      <tr
        style={{
          backgroundColor: `${
            code.fields.w === 0
              ? 'var(--bg-red-400-72)'
              : 'var(--bg-green-400-72)'
          }`,
        }}
        key={index}
      >
        <td>{code.fields.cz}</td>
        <td className="wifi__table-row" style={{ textAlign: 'right' }}>
          <span>{Math.trunc(Math.abs(+code.fields.nr + 1745) / 3)}</span>
          <br />
          <span>
            {code.fields.w === 0 ? 'Oczekuję Połączenie' : 'Połączony'}
          </span>
        </td>
      </tr>
    );
  });
  return wifiCodesData;
};
export default WifiCodesTable;
