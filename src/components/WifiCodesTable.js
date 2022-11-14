import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TableRow } from '@mui/material';

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
  const asda = codeList.map((code, mep) => {
    return (
      <TableRow
        sx={{
          backgroundColor: `${
            code.fields.w === 0 ? 'var(--red)' : 'var(--green)'
          }`,
          margin: '20px',
        }}
        key={mep}
      >
        {code.fields.nr}
      </TableRow>
    );
  });
  return <>{asda}</>;
};
export default WifiCodesTable;
