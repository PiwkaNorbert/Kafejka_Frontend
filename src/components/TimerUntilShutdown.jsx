import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const TimerUntilShutdown = ({ computer }) => {
  const [time, setTime] = useState(0);
  const queryClient = useQueryClient();
  const { curFilia } = useParams();
  const timeleftRef = useRef(null);

  useEffect(() => {
    const shutdownTime = computer.fields.timestamp_time;

    const interval = setInterval(() => {
      const curTime = Math.trunc(new Date().getTime() / 1000);
      const timeLeft = shutdownTime - curTime;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      setTime(
        `${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}`
      );
      if (timeLeft === 0) {
        queryClient.invalidateQueries(['komps', curFilia]);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [computer]);

  return (
    <Box
      className={'kafeika-komputer__timeout-content'}
      ref={timeleftRef}
      id={`countdown-${computer.fields.id}`}
    >
      {time}
    </Box>
  );
};

TimerUntilShutdown.propTypes = {
  computer: PropTypes.object,
};

export default TimerUntilShutdown;

// useEffect(() => {
//   const interval = setInterval(() => {
//     const curTime = Math.trunc(new Date().getTime() / 1000);
//     const shutdownTime = computer.fields.timestamp_time;
//     const timeLeft = shutdownTime - curTime;
//     setTime(timeLeft);
//     if (timeLeft === 0) {
//       queryClient.invalidateQueries(['komps', curFilia]);
//     }
//   }, 1000);

//   return () => clearInterval(interval);
// }, [computer]);

// const formatTime = time => {
//   const min = String(Math.trunc(time / 60)).padStart(1, '0');
//   const sec = String(time % 60).padStart(2, '0');
//   return `${min}:${sec}`;
// };
