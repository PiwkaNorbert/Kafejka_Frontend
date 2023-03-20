import React, { useRef } from 'react';
import axios from 'axios';
import { Box, TextField, CardContent, Button } from '@mui/material';
import WifiCodesTable from '../components/WifiCodesTable';
import { useHotspotData } from '../helper/useHotspotData';
import ErrorCallback from '../components/Errors/ErrorCallback';
import ButtonTemplate from '../components/ButtonTemplate';

const WifiPerms = ({ index, url, filia }) => {
  const inputRef = useRef(null);
  const wifiCodesQuery = useHotspotData(url, filia);
  // Set status Shutdown Time
  const cardHotspotCode = async (filia, value) => {
    const urlHotspotCode = `${url}hotspot-code/${filia}/${value * 3 - 1745}/`;
    try {
      await axios(urlHotspotCode).then(() => wifiCodesQuery?.refetch());
    } catch (err) {
      throw new Error(`Failed to send code: ${err}`);
    }
  };

  const handleClick = () => {
    cardHotspotCode(filia, inputRef.current.value);
  };
  if (wifiCodesQuery.isLoading)
    return (
      <div className="la-ball-clip-rotate la-dark la-sm">
        <div></div>
      </div>
    );
  if (wifiCodesQuery.error) return <ErrorCallback />;
  return (
    <div
      style={{
        display: 'grid',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <CardContent className="kafeika__background-wifi ">
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
            <Button
              sx={{
                maxHeight: 'min-content',
                borderRadius: '8px',
                boxShadow: 'none',
                fontSize: '1.4rem',
              }}
              variant="contained"
              type="submit"
            >
              OK
            </Button>
          </form>
        </Box>
        <Box className="wifi__table">
          <table className="wifi__table-codes">
            <thead>
              <tr>
                <th>Godzina</th>
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
