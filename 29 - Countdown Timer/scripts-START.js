const buttons = document.querySelectorAll("[data-time]");
const displayTimeLeft = document.querySelector(".display__time-left");
const displayEndTime = document.querySelector(".display__end-time");
let countdown;

const timer = (seconds) => {
  clearInterval(countdown);
  if (seconds <= 0) return;

  const now = new Date(Date.now());
  const secondsNow = now.getSeconds();
  const then = secondsNow + seconds;
  displayTimeEnd(now, then);
  displayTime(seconds);

  countdown = setInterval(() => {
    const now = new Date(Date.now()).getSeconds();
    const timeLeft = then - now;
    if (timeLeft === 0) {
      clearInterval(countdown);
    }
    displayTime(timeLeft);
  }, 1000);
};

const displayTime = (time) => {
  const mins = Math.floor(time / 60);
  const seconds = time % 60;
  const minsCheck = mins < 10 ? `0${mins}` : mins;
  const secondsCheck = seconds < 10 ? `0${seconds}` : seconds;

  displayTimeLeft.textContent = `${minsCheck}:${secondsCheck}`;
};

const displayTimeEnd = (timeBack, then) => {
  const timeToBack =
    timeBack.getHours() * 3600 +
    timeBack.getMinutes() * 60 +
    timeBack.getSeconds() +
    then;
  const hours = Math.floor(timeToBack / 3600);
  const mins = Math.floor((timeToBack % 3600) / 60);

  const hoursCheck = hours < 10 || hours > 23.59 ? `0${hours - 24}` : hours;
  const minsCheck = mins < 10 ? `0${mins}` : mins;
  displayEndTime.textContent = `Be Back At ${hoursCheck}:${minsCheck}`;
};

buttons.forEach((button) =>
  button.addEventListener("click", (e) =>
    timer(parseInt(e.target.dataset.time))
  )
);

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const seconds = parseInt(e.target.minutes.value) * 60;
  timer(seconds);
  e.target.reset();
});
