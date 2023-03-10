import React from 'react';
import { Box } from '@mui/material';
import ComputerState from './ComputerState';

const ComputerOnlineStatus = ({ computer, url, callback, computerQuery }) => {
  return (
    <Box
      className={`kafeika-komputer__status`}
      sx={{ display: 'flex', maxHeight: 'min-content !important' }}
    >
      <Box
        className={`kafeika-komputer__status-computer`}
        sx={{
          textAlign: 'end',
          flex: '1 1 0',
          fontWeight: 700,
        }}
      >
        {computerQuery?.isFetching ? (
          <div className="la-ball-clip-rotate la-dark la-sm">
            <div></div>
          </div>
        ) : (
          <>
            <p>Stan</p>
            <ComputerState computer={computer} url={url} callback={callback} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default ComputerOnlineStatus;

{
  /* <Box
  className={`kafeika-komputer__status-content ${
    computer.fields.f === 0
      ? 'bg-red'
      : computer.fields.f === 1
      ? 'bg-green'
      : 'bg-blue'
  }`}
  sx={{ padding: 1, fontStyle: 'italic', fontSize: '14px' }}
>
  {computer.fields.f === 0
    ? 'Zablokowany'
    : computer.fields.f === 1
    ? 'Odblokowany'
    : 'Zamykanie'}
</Box> */
}
