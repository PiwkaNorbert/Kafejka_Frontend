import React from 'react';
import { Box } from '@mui/system';
// import startlogoutTimer from '../helper/startlogoutTimer';

const TimerUntilShutdown = function ({ computer }) {
  const startlogoutTimer = function () {
    const labelTimer = document.querySelector('.timer');
    const tick = function () {
      const min = String(Math.trunc(time / 60)).padStart(2, '0');
      const sec = String(time % 60).padStart(2, '0');
      //in each call, print the remaing time to UI

      labelTimer.textContent = `${min}:${sec}`;
      console.log(min, sec);
      if (time === 0) {
        clearInterval(timer);
      }
      time--;
      // when 0 seconds, sotp timer and log out user
    };
    // set time to 15 minutes

    var diff = computer.fields.timestamp_time - new Date().getTime();

    console.log(diff);
    var time = diff / (1000 * 60 * 60 * 24);
    //call the timer every second
    tick();
    const timer = setInterval(tick, 1000);
    return timer;
  };
  const diff = computer.fields.timestamp_time - new Date().getTime();

  console.log(diff);
  return (
    <>
      <Box>Czas</Box>
      <Box
        className={'kafeika-komputer__timeout-content'}
        sx={{
          textAlign: 'center',
          backgroundColor: 'var(--timeout-grey)',
        }}
      >
        {/* // countdown fucntions */}
        {startlogoutTimer}
      </Box>
    </>
  );
};
export default TimerUntilShutdown;
