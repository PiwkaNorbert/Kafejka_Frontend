import React, { useState } from 'react';
import axios from 'axios';
import { Box, Input, TextField, InputAdornment } from '@mui/material';
import ButtonTemplate from './ButtonTemplate';

const ComputerShutdownTimeoutPanel = ({
  computer,
  index,
  url,
  computerQuery,
}) => {
  const [shutdownTimeout, setShutdownTimeout] = useState('');
  const [num, setNum] = React.useState();

  // Set status Shutdown Time
  const compShutDownTimeout = async () => {
    const urlShutdownTimeout = `${url}shutdown-timeout/${computer.pk}/${
      document.querySelector(`#closeTime${index}`).value
    }/`;
    try {
      await axios(urlShutdownTimeout).then(res => setShutdownTimeout(res));
      document.querySelector(`#closeTime${index}`).value = 5;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box className={`kafeika-komputer__timeout`}>
      <Box
        className={`kafeika-komputer__timeout-computer`}
        sx={{
          backgroundColor: `${
            computerQuery?.isFetching ? 'transparent' : 'var(--bg-slate-100)'
          }`,
        }}
      >
        <>
          <ButtonTemplate
            variant={'contained'}
            color={computer.fields.f === 5 ? 'warning' : 'primary'}
            fullWidth={true}
            disabled={computer.fields.f === 5 && computer.fields.t === 0}
            key={index}
            className={'btn-cancel'}
            callback={compShutDownTimeout}
            text={`${computer.fields.f === 5 ? 'Anuluj' : 'Wyłacz za'}`}
          />
          <input
            placeholder="min"
            size="small"
            id={`closeTime${index}`}
            name="closeTime"
            type="number"
            min={5}
            max={60}
            step={5}
            onChange={e => {
              if (e >= 5 && e <= 60) return setNum(e.target.value);
              return null;
            }}
            className="kafeika-komputer__timeout-computer--input"
          />
        </>
      </Box>
    </Box>
  );
};

export default ComputerShutdownTimeoutPanel;
