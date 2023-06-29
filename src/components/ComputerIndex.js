import React from 'react';
import { Box } from '@mui/material';
import ComputerDelete from './ComputerDelete';

import Tooltip from '@mui/material/Tooltip';
import ComputerShutdown from '../components/ComputerShutdown';

import WifiOffIcon from '@mui/icons-material/WifiOff';
import WifiIcon from '@mui/icons-material/Wifi';

import TimerUntilShutdown from './TimerUntilShutdown';

const ComputerIndex = ({ computer, index, url, showComps, computerQuery }) => {
  return (
    <>
      {showComps ? (
        <Box
          sx={{
            margin: '0 8px 8px 8px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '1.6rem',
            gap: '1rem',
          }}
        >
          <Box sx={{ fontSize: '1.6rem' }}>Komputer {index + 1}</Box>
          <Box
            sx={{
              color: `${computer.fields.online >= 60 ? '#2a2' : '#F00'}`,
              flex: '1 1 0',
            }}
          >
            <ComputerShutdown
              computer={computer}
              url={url}
              computerQuery={computerQuery}
            />
          </Box>
          <Box className={'timer'} sx={{ flex: '1 1 0' }}>
            <TimerUntilShutdown computer={computer} url={url} />
          </Box>
          <Box
            sx={{
              color: `${computer.fields.online >= 60 ? '#F00' : '#2a2'}`,
            }}
          >
            <Tooltip
              title={`${computer.fields.online >= 60 ? 'Off-line' : 'On-line'}`}
              sx={{ fontSize: '2.0rem' }}
              placement="top"
              arrow
            >
              {computer.fields.online >= 60 ? <WifiOffIcon /> : <WifiIcon />}
            </Tooltip>
          </Box>
        </Box>
      ) : (
        <Box className={`kafeika-komputer__index`}>
          <Box className={`kafeika-komputer__index-computer`}>
            <ComputerDelete
              computer={computer}
              url={url}
              computerQuery={computerQuery}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default ComputerIndex;
