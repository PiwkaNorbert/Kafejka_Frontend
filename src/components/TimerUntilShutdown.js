import React from 'react';
import { Box } from '@mui/system';

const TimerUntilShutdown = function ({ computer }) {
  const curTime = Math.trunc(new Date().getTime() / 1000);
  const shutdownTime = computer.fields.timestamp_time;
  const time = shutdownTime - curTime;

  let Tick = function () {
    let min = String(Math.trunc(time / 60)).padStart(1, '0');
    const sec = String(time % 60).padStart(2, '0');
    if (min >= 0) return `${min}:${sec}`;
  };

  if (shutdownTime === null || time < 0) return '';
  if (curTime >= shutdownTime - 86400 && time > 0)
    return (
      <Box className={'kafeika-komputer__timeout-content'}>
        <Tick />
      </Box>
    );
};

export default TimerUntilShutdown;
