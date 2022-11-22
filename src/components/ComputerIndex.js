import React from 'react';
import { Box } from '@mui/material';
import ComputerShutdown from './ComputerShutdown';
import ComputerDelete from './ComputerDelete';

const ComputerIndex = ({
  computer,
  index,
  url,
  showComps,
  getDataSlow = true,
  isLoading,
  setIsLoading,
}) => {
  const statusCheck = () => {
    if (computer.fields.online === 0) {
    }
  };
  return (
    <Box className={`kafeika-komputer__index`}>
      <Box className={`kafeika-komputer__index-computer`}>
        <Box sx={{ padding: 1, textAlign: 'center', margin: 'auto' }}>
          Komputer {index + 1}
        </Box>
        <Box
          sx={{ padding: 1, textAlign: 'center' }}
          className={`kafeika-komputer__index-content ${
            computer.fields.online >= 120 ? 'bg-red' : 'bg-green'
          }`}
        >
          {`${computer.fields.online >= 120 ? 'Off-line' : 'On-line'}`}
          {statusCheck()}
        </Box>
      </Box>

      {showComps ? (
        <ComputerShutdown
          computer={computer}
          url={url}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      ) : (
        <ComputerDelete
          computer={computer}
          index={index}
          url={url}
          callback={getDataSlow}
        />
      )}
    </Box>
  );
};

export default ComputerIndex;
