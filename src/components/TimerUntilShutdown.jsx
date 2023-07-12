import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import { useQueryClient } from '@tanstack/react-query';

const TimerUntilShutdown = function ({ computer }) {
  const [time, setTime] = useState(0);
  const queryClient = useQueryClient();
  const curFilia = computer.fields.filia;

  useEffect(() => {
    const interval = setInterval(() => {
      const curTime = Math.trunc(new Date().getTime() / 1000);
      const shutdownTime = computer.fields.timestamp_time;
      const timeLeft = shutdownTime - curTime;
      setTime(timeLeft);
      if (timeLeft === 0) {
        queryClient.invalidateQueries(['komps', curFilia]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [computer]);

  const formatTime = time => {
    const min = String(Math.trunc(time / 60)).padStart(1, '0');
    const sec = String(time % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  if (time <= 0) return;

  return (
    <Box className={'kafeika-komputer__timeout-content'}>
      {formatTime(time)}
    </Box>
  );
};

TimerUntilShutdown.propTypes = {
  computer: PropTypes.object.isRequired,
};

export default TimerUntilShutdown;
