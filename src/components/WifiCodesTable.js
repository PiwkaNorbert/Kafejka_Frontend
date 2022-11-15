import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TableRow, TableCell } from '@mui/material';

const WifiCodesTable = ({ url, filia, callback }) => {
  const [codeList, setCodeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const urlGetCodes = `${url}get-codes/${filia}/`;

  const getCodes = async () => {
    setLoading(true);
    try {
      await axios(urlGetCodes).then(response => {
        setCodeList(response.data);
        setLoading(true);
      });
    } catch (err) {
      console.log(err);
    }
    {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCodes();
    setInterval(getCodes, 10000);
  }, []);
  const wifiCodesValues = codeList.map((code, mep) => {
    return (
      <TableRow
        sx={{
          backgroundColor: `${
            code.fields.w === 0 ? 'var(--red)' : 'var(--green)'
          }`,
          color: 'var(--white)',
        }}
        key={mep}
      >
        <TableCell>{code.fields.cz}</TableCell>
        <TableCell sx={{ textAlign: 'right' }}>
          {Math.floor(Math.abs(+code.fields.nr + 1745) / 3)}
        </TableCell>
      </TableRow>
    );
  });
  return <>{wifiCodesValues}</>;
};
export default WifiCodesTable;
