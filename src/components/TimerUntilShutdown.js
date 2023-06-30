import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';

const TimerUntilShutdown = function ({ computer }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const curTime = Math.trunc(new Date().getTime() / 1000);
      const shutdownTime = computer.fields.timestamp_time;
      const timeLeft = shutdownTime - curTime;
      setTime(timeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [computer]);

  const formatTime = time => {
    const min = String(Math.trunc(time / 60)).padStart(1, '0');
    const sec = String(time % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  if (time < 0) return '';
  return (
    <Box className={'kafeika-komputer__timeout-content'}>
      {formatTime(time)}
    </Box>
  );
};

export default TimerUntilShutdown;
