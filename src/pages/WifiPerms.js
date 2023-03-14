import React, { useRef } from 'react';
import axios from 'axios';
import { Box, TextField, CardContent } from '@mui/material';
import WifiCodesTable from '../components/WifiCodesTable';

const WifiPerms = ({ index, url, filia }) => {
  const inputRef = useRef(null);
  // Set status Shutdown Time
  const cardHotspotCode = async (filia, value) => {
    const urlHotspotCode = `${url}hotspot-code/${filia}/${value * 3 - 1745}/`;
    try {
      await axios(urlHotspotCode);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    cardHotspotCode(filia, inputRef.current.value);
  };

  return (
    <div
      style={{
        display: 'grid',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <CardContent
        className="kafeika__background-wifi "
        sx={{ boxShadow: 2, borderRadius: 3, padding: '10px', margin: 1 }}
      >
        <Box className="wifi__form">
          <form
            className="wifi__form-codes"
            onSubmit={e => {
              e.preventDefault();
              handleClick();

              inputRef.current.value = '';
            }}
          >
            <TextField
              id={`hotspot${index}`}
              name="hotspot"
              label="Numer karty czytelnika"
              type="number"
              variant="filled"
              color="primary"
              autoFocus={true}
              InputLabelProps={{
                shrink: true,
              }}
              inputRef={inputRef}
              InputProps={{
                inputProps: { min: 999999999, max: 99999999999999 },
                disableUnderline: true,
              }}
            />
          </form>
        </Box>
        <Box className="wifi__table">
          <table className="wifi__table-codes">
            <thead>
              <tr>
                <th>Czas</th>
                <th>Numer karty</th>
              </tr>
            </thead>
            <tbody>
              <WifiCodesTable url={url} filia={filia} />
            </tbody>
          </table>
        </Box>
      </CardContent>
    </div>
  );
};

export default WifiPerms;
