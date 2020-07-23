// ADD FULLSCREAN ICON!!!!!!!!!!

/* Get Our Elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
let mousemove = false;

/* Build out functions */
function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

function skip() {
  console.log(this.dataset.skip);
  video.currentTime += Number(this.dataset.skip);
}

function handleRangeUpdate() {
  console.log(this.name, this.value);
  video[this.name] = this.value;
}

function handleProgress() {
  const time = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${time}%`;
}

function scrub(e) {
  const newTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = newTime;
}

/* Hook up the event listeners */
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);
skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousemove && scrub(e));
progress.addEventListener("mouseup", () => (mousemove = false));
progress.addEventListener("mousedown", () => (mousemove = true));
