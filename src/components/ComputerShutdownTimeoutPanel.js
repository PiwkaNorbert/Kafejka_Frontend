import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, CardActions, Box, TextField, Hidden } from '@mui/material';
import ButtonTemplate from './ButtonTemplate';

const ComputerShutdownTimeoutPanel = ({ computer, index, url, callback }) => {
  const [shutdownTimeout, setShutdownTimeout] = useState('');

  // Set status Shutdown Time
  const compShutDownTimeout = async value => {
    const urlShutdownTimeout = `${url}shutdown-timeout/${computer.pk}/${
      document.querySelector(`#closeTime${index}`).value
    }/`;
    try {
      await axios
        .get(urlShutdownTimeout, {
          shutdownTimeout,
        })
        .then(res => setShutdownTimeout(res));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box className={`kafeika-komputer__timeout`}>
      <Box>
        <Box className={`kafeika-komputer__timeout-computer`}>
          <Box sx={{ padding: 1, textAlign: 'center', margin: 'auto' }}>
            Czas
          </Box>
          <Box
            className={'kafeika-komputer__timeout-content'}
            sx={{
              padding: 1,
              textAlign: 'center',
              backgroundColor: 'var(--timeout-grey)',
            }}
          >
            {computer.fields.t}
          </Box>
        </Box>
        <ButtonTemplate
          variant={'contained'}
          color={computer.fields.f === 5 ? 'warning' : 'primary'}
          fullWidth={true}
          disabled={computer.fields.f === 5 && computer.fields.t === 0}
          key={index}
          className={'btn btn-cancel'}
          callback={compShutDownTimeout}
          text={`${computer.fields.f === 5 ? 'Anuluj' : 'Zamknij'}`}
        />
      </Box>
      <TextField
        type="number"
        helperText="5-60min"
        id={`closeTime${index}`}
        InputProps={{
          inputProps: { min: 5, max: 60, step: 5, defaultValue: 5 },
        }}
        name="closeTime"
        variant="standard"
        color="primary"
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ display: 'grid', padding: 0, margin: 1 }}
      />
    </Box>
  );
};

export default ComputerShutdownTimeoutPanel;
