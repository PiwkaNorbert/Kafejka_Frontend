import React, { useRef } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  CardContent,
  Button,
  CircularProgress,
} from '@mui/material';
import WifiCodesTable from '../components/WifiCodesTable';
import { useHotspotData } from '../helper/useHotspotData';
import ErrorCallback from '../components/Errors/ErrorCallback';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const WifiPerms = ({ index, url }) => {
  const inputRef = useRef(null);
  const { curFilia } = useParams();
  const wifiCodesQuery = useHotspotData(url, curFilia);
  const queryClient = useQueryClient();
  const cardHotspotCode = async value => {
    try {
      const urlHotspotCode = `${url}hotspot-code/${+curFilia}/${
        value * 3 - 1745
      }/`;
      const { data, status } = await axios.get(urlHotspotCode);
      if (status !== 200) {
        throw new Error(`Nastpił problem: ${status}`);
      }
      return data;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to send code: ${error}`);
    }
  };

  const addCodeMutation = useMutation(cardHotspotCode, {
    onSuccess: () => {
      toast.success('Kod został wysłany!', { icon: '👍', toastId: 'addCode' });
      queryClient.invalidateQueries(['wifiCodes', curFilia]);
    },
    onError: error => {
      toast.error(error.message, { icon: '❌', toastId: 'removeCode' });
    },
  });

  if (wifiCodesQuery.isLoading)
    return (
      <div className="codes__loading">
        <h2 className="codes__header--2">Nawiązywanie połączenia...</h2>
        <CircularProgress className="loading-status" disableShrink />
      </div>
    );
  if (wifiCodesQuery.error) return <ErrorCallback />;
  return (
    <div>
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
                addCodeMutation.mutate(+inputRef.current.value);

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
                <WifiCodesTable url={url} />
              </tbody>
            </table>
          </Box>
        </CardContent>
      </div>
    </div>
  );
};

export default WifiPerms;
