import { useHotspotData } from '../helper/useHotspotData';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import PropTypes from 'prop-types';

const WifiCodesTable = ({ url }) => {
  const { curFilia } = useParams();

  const { data, isLoading, isError, error } = useHotspotData(url, curFilia);
  return (
    <>
      {isLoading ? (
        <tr colSpan="100" className="codes__loading-2">
          <CircularProgress className="loading-status" disableShrink />
        </tr>
      ) : isError ? (
        <div className="codes__error">Nastąpił Błąd: {error.message}</div>
      ) : (
        data.map((code, index) => (
          <tr
            key={index}
            style={{
              backgroundColor: `${
                code.fields.w === 0
                  ? 'var(--bg-red-400-72)'
                  : 'var(--bg-green-400-72)'
              }`,
            }}
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
WifiCodesTable.propTypes = {
  url: PropTypes.string.isRequired,
};
export default WifiCodesTable;
