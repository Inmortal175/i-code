const video = document.getElementById('video');
const playPauseBtn = document.getElementById('playPauseBtn');
const centerPlayPauseBtn = document.getElementById('centerPlayPauseBtn');
const muteBtn = document.getElementById('muteBtn');
const progressBar = document.getElementById('progressBar');
const volumeBar = document.getElementById('volumeBar');
const fullScreenBtn = document.getElementById('fullScreenBtn');

function playVideo() {
  video.play();
  playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  centerPlayPauseBtn.style.display = 'none';
}

function pauseVideo() {
  video.pause();
  playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  centerPlayPauseBtn.style.display = 'flex';
}

playPauseBtn.addEventListener('click', () => {
  if (video.paused) {
    playVideo();
  } else {
    pauseVideo();
  }
});

centerPlayPauseBtn.addEventListener('click', () => {
  if (video.paused) {
    playVideo();
  } else {
    pauseVideo();
  }
});

video.addEventListener('click', () => {
  if (video.paused) {
    playVideo();
  } else {
    pauseVideo();
  }
});

// Actualizar barra de progreso según el tiempo
video.addEventListener('timeupdate', () => {
  const progress = (video.currentTime / video.duration) * 100;
  progressBar.value = progress;
});

// Cambiar tiempo del video al mover la barra de progreso
progressBar.addEventListener('input', () => {
  const time = (progressBar.value / 100) * video.duration;
  video.currentTime = time;
});

// Control mute/unmute
muteBtn.addEventListener('click', () => {
  video.muted = !video.muted;
  muteBtn.innerHTML = video.muted
    ? '<i class="fas fa-volume-mute"></i>'
    : '<i class="fas fa-volume-up"></i>';
  volumeBar.value = video.muted ? 0 : video.volume;
});

// Control volumen
volumeBar.addEventListener('input', () => {
  video.volume = volumeBar.value;
  video.muted = volumeBar.value == 0;
  muteBtn.innerHTML = video.muted
    ? '<i class="fas fa-volume-mute"></i>'
    : '<i class="fas fa-volume-up"></i>';
});

fullScreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    video.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

video.addEventListener('pause', () => {
  centerPlayPauseBtn.style.display = 'flex';
  playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
});

video.addEventListener('play', () => {
  centerPlayPauseBtn.style.display = 'none';
  playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
});

video.addEventListener('ended', () => {
  centerPlayPauseBtn.style.display = 'flex';
  playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
});

// Evita que se arrastre el video para prevenir descarga fácil
video.addEventListener('dragstart', (e) => {
  e.preventDefault();
});
