import React from 'react';
import { useHotspotData } from '../helper/useHotspotData';
import { useParams } from 'react-router-dom';
import { CircularProgress, dividerClasses } from '@mui/material';
import ErrorCallback from './Errors/ErrorCallback';
import { toast } from 'react-toastify';

const WifiCodesTable = ({ url }) => {
  const { curFilia } = useParams();

  const { data, isLoading, isError, error } = useHotspotData(url, curFilia);
  return (
    <>
      {isLoading ? (
        <td colspan="100" className="codes__loading-2">
          <CircularProgress className="loading-status" disableShrink />
        </td>
      ) : isError ? (
        <div className="codes__error">Nastąpił Błąd: {error.message}</div>
      ) : (
        data.map((code, index) => (
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
        ))
      )}
    </>
  );
};
export default WifiCodesTable;
