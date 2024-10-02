import * as React from 'react';
import { TimerUntilShutdownProps } from '../types/computer';
import { Button } from './ui/button';

const TimerButton = React.memo(({ timeLeft, computerID }: { timeLeft: number, computerID: number }) => (
  <Button
    variant='outline'
    className="ml-auto text-sm tabular-nums font-semibold bg-muted pointer-events-none cursor-default"
    id={`countdown-${computerID}`}
  >
    {Math.floor(timeLeft / 60).toString().padStart(2, '0')} : {(timeLeft % 60).toString().padStart(2, '0')}
  </Button>
));

const TimerUntilShutdown = ({ computerID, timestampTime }: TimerUntilShutdownProps) => {
  const [timeLeft, setTimeLeft] = React.useState<number>(0);

  React.useEffect(() => {
    // Ensure timestampTime is not null and greater than current time
    const interval = setInterval(() => {
      const currentTime = Math.trunc(new Date().getTime() / 1000);
      const newTimeLeft = timestampTime! - currentTime;
  
      if (newTimeLeft >= 0) {
        setTimeLeft(newTimeLeft);
      } else {
        clearInterval(interval);
      }
    }, 1000);
  
    return () => clearInterval(interval);
  }, [timestampTime]);

  return <TimerButton timeLeft={timeLeft} computerID={computerID} />;
};

export default React.memo(TimerUntilShutdown);
