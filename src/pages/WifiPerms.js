import React, { useState, useRef } from 'react';
import axios from 'axios';
import {
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Box,
  TextField,
  CardContent,
  TableBody,
  TableCell,
  FormControl,
} from '@mui/material';
import WifiCodesTable from '../components/WifiCodesTable';

const WifiPerms = ({ index, url, filia, callback }) => {
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
    // 👇 "inputRef.current.value" is input value
    console.log(inputRef.current.value);
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
        <Box>
          <form>
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
                inputProps: { min: 999999999 },
              }}
              sx={{ display: 'grid', padding: 0, margin: 0 }}
            />
            <Button
              variant="contained"
              size="small"
              key={index}
              type="submit"
              fullWidth={true}
              sx={{
                minWidth: 'fit-content',
                boxShadow: '2px 3px 2px 1px rgb(0 0 0 / 40%)',
                fontWeight: '900',
              }}
              onClick={e => {
                e.preventDefault();
                handleClick();

                inputRef.current.value = '';
              }}
            >
              ok
            </Button>
          </form>
        </Box>
        <Box>
          <p>Karty oczekujące na połaczenie</p>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow
                  style={{
                    borderRadius: '12px',
                    backgroundColor: '#36304a',
                    color: 'var(--white)',
                  }}
                >
                  <TableCell sx={{ color: 'var(--white)' }}>Czas</TableCell>
                  <TableCell sx={{ textAlign: 'right', color: 'var(--white)' }}>
                    Numer karty czytelnika
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <WifiCodesTable url={url} filia={filia} />
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </CardContent>
    </div>
  );
};

export default WifiPerms;
