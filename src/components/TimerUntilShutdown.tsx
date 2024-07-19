import { useEffect, useState } from 'react';

import { TimerUntilShutdownProps } from '../types/computer';
import { Button } from './ui/button';



const TimerUntilShutdown = ({ computerID, timestampTime }: TimerUntilShutdownProps) => {


  const [timeLeft, setTimeLeft] = useState<number>(0);
  console.count('TimerUntilShutdown');

  useEffect(() => {
    // Ensure timestampTime is not null and greater than current time
  
    const interval = setInterval(() => {
      // Update the current time on each tick
      const currentTime = Math.trunc(new Date().getTime() / 1000);
      const timeLeft = timestampTime! - currentTime;
      console.log(timeLeft);
  
      if (timeLeft >= 0) {
        setTimeLeft(timeLeft);
      } else {
        // Optionally clear the interval if the countdown is complete
        clearInterval(interval);
      }
    }, 1000);
  
    return () => clearInterval(interval);
  }, [timestampTime]);

  return (
    <Button
      variant='outline'
      className="ml-auto text-sm tabular-nums font-semibold bg-muted pointer-events-none cursor-default"
      id={`countdown-${computerID}`}
    >
      {Math.floor(timeLeft / 60).toString().padStart(2, '0')} : {(timeLeft % 60).toString().padStart(2, '0')}
    </Button>
  );
};


export default TimerUntilShutdown;
