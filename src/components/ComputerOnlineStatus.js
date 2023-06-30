import React from 'react';
import { Box } from '@mui/material';
import ComputerState from './ComputerState';

const ComputerOnlineStatus = ({ computer, url, isLoading }) => {
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
        {isLoading ? (
          <div className="la-ball-clip-rotate la-dark la-sm">
            <div></div>
          </div>
        ) : (
          <>
            <p>Stan</p>
            <ComputerState computer={computer} url={url} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default ComputerOnlineStatus;
