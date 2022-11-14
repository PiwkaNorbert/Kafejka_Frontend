import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, CardActions, Box, TextField, Hidden } from '@mui/material';

const ComputerShutdownTimeoutPanel = ({ computer, index, url, callback }) => {
  const [shutdownTimeout, setShutdownTimeout] = useState('');

  // Set status Shutdown Time
  const compShutDownTimeout = async (e, value) => {
    const urlShutdownTimeout = `${url}shutdown-timeout/${e}/${value}/`;
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
        <Button
          variant="contained"
          color={computer.fields.f === 5 ? 'warning' : 'primary'}
          size="small"
          key={index}
          type="submit"
          fullWidth={true}
          sx={{
            minWidth: 'fit-content',
            boxShadow: '2px 3px 2px 1px rgb(0 0 0 / 40%)',
            fontWeight: '900',
          }}
          disabled={computer.fields.f === 5 && computer.fields.t === 0}
          onClick={e => {
            e.preventDefault();
            compShutDownTimeout(
              computer.pk,
              document.querySelector(`#closeTime${index}`).value
            );
            console.log(
              document.querySelectorAll(`.kafeika-komputer__timeout-content`)
                .textContent
            );
            callback();
          }}
        >
          {`${computer.fields.f === 5 ? 'Anuluj' : 'Zamknij'}`}
        </Button>
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
