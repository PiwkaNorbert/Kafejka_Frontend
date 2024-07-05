import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { TimerUntilShutdownProps } from '../types/computer';
import { Button } from './ui/button';



const TimerUntilShutdown = ({ computerID, timestampTime}: TimerUntilShutdownProps ) => {

  const curTime = Math.trunc(new Date().getTime() / 1000);

  const [time, setTime] = useState<string>('0');
  const queryClient = useQueryClient();
  const { curFilia } = useParams();
  const timeleftRef = useRef(null);

  useEffect(() => {

    if (!timestampTime) {
      return;
    }
    const shutdownTime = timestampTime;
    const interval = setInterval(() => {
      const timeLeft = shutdownTime - curTime;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      setTime(
        `${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}`
      );
      if (timeLeft === 0 && curFilia) {
        queryClient.invalidateQueries({ queryKey: ['komps', curFilia] } );
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timestampTime, curTime, queryClient, curFilia]);


  if (!(timestampTime && timestampTime >= curTime)) {
    return <div/>;
  }


  return (
    <Button
    variant='outline'
      className="ml-auto text-sm tabular-nums font-semibold bg-muted"
      ref={timeleftRef}
      id={`countdown-${computerID}`}
    >
      {time}
    </Button>
  );
};


export default TimerUntilShutdown;
