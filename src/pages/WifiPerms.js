import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Button, Box, TextField, CardContent, InputBase } from '@mui/material';
import WifiCodesTable from '../components/WifiCodesTable';

const WifiPerms = ({ index, url, filia }) => {
  const [hotspotValue, setHotspotValue] = useState('');

  const inputRef = useRef(null);
  // Set status Shutdown Time
  const cardHotspotCode = async (filia, value) => {
    const urlHotspotCode = `${url}hotspot-code/${filia}/${value * 3 - 1745}/`;
    try {
      await axios.get(urlHotspotCode).then(res => setHotspotValue(res));
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
          <form className="wifi__form-codes">
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
                inputProps: { min: 999999999, max: 999999999999999999 },
                disableUnderline: true,
              }}
            />
            {/* <Button
              variant="contained"
              size="small"
              key={index}
              type="submit"
              fullWidth={false}
              className="wifi__button"
              onClick={e => {
                e.preventDefault();
                handleClick();

                inputRef.current.value = '';
              }}
            >
              ok
            </Button> */}
          </form>
        </Box>
        <Box className="wifi__table">
          <h3 className="wifi__heading-3">Karty oczekujące na połaczenie</h3>

          <table className="wifi__table-codes">
            <thead>
              <tr>
                <th>Czas</th>
                <th>Numer karty czytelnika</th>
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
