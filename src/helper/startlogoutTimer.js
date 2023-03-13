// const startlogoutTimer = function () {
//   const labelTimer = document.querySelector('.timer');
//   const tick = function () {
//     const min = String(Math.trunc(time / 60)).padStart(2, '0');
//     const sec = String(time % 60).padStart(2, '0');
//     //in each call, print the remaing time to UI

//     labelTimer.textContent = `${min}:${sec}`;

//     if (time === 0) {
//       clearInterval(timer);
//     }
//     time--;
//     // when 0 seconds, sotp timer and log out user
//   };
//   // set time to 15 minutes
//   let time = 120;
//   console.log(time);
//   //call the timer every second
//   tick();
//   const timer = setInterval(tick, 1000);
//   return timer;
// };
