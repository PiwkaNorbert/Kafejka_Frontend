import React from 'react';

const startlogoutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, '0');
    const sec = String(time % 60).padStart(2, '0');
    //in each call, print the remaing time to UI

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
    time--;
    // when 0 seconds, sotp timer and log out user
  };
  // set time to 15 minutes
  let time = 60;
  //call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

export default TimerUntilShutdown = function () {
  return (
    <>
      <Box sx={{ padding: 1, textAlign: 'center' }}>Czas</Box>
      <Box
        className={'kafeika-komputer__timeout-content'}
        sx={{
          padding: 1,
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
