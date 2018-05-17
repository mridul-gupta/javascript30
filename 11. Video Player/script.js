

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenButton = player.querySelector('.fullscreen');


function togglePlay() {
  if(video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? '►':'❚❚';
  toggle.textContent = icon;
}

function skip() {
  //console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  //console.log(this.name);
  //console.log(this.value);
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function jumpProgress(e) {
  //console.log(e);
  //console.log(mouseDownFlag);

  const newTime = (e.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = newTime;
}

function goFullScreen() {
  console.log("going full");

  //video.height = "100%";
  //video.width = "100%";
}

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));


let mouseDownFlag = false;
progress.addEventListener('click', jumpProgress);
progress.addEventListener('mousemove', (e) => mouseDownFlag && jumpProgress(e));
progress.addEventListener('mousedown', () => mouseDownFlag = true);
progress.addEventListener('mouseup', () => mouseDownFlag = false);
fullscreenButton.addEventListener('click', goFullScreen);
