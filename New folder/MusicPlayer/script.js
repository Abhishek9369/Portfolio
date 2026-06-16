const songs = [
  {
    name: 'song1',
    title: 'Closer',
    artist: 'The Chainsmokers',
    cover: 'cover1.png',
    color: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)'
  },
  {
    name: 'song2',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    cover: 'cover2.png',
    color: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)'
  },
  {
    name: 'song3',
    title: 'Levitating',
    artist: 'Dua Lipa',
    cover: 'cover3.png',
    color: 'linear-gradient(135deg, #ff6a00, #ee0979)'
  }
];

let songIndex = 0;
let isPlaying = false;
let isAutoplay = false;

const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const progress = document.getElementById('progress');
const progressContainer = document.querySelector('.progress-container');
const body = document.body;

// Optional: show time elements if you added them in HTML
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// Autoplay button
const autoplayBtn = document.getElementById('autoplay');

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = `${song.name}.mp3`;
  body.style.background = song.color;
}

loadSong(songs[songIndex]);

// Play song
function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = '⏸';
  cover.classList.add('playing');
}

// Pause song
function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = '▶';
  cover.classList.remove('playing');
}

// Toggle play/pause
playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});

// Next song
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

// Previous song
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// Update progress bar
audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Show time if elements exist
    if (currentTimeEl && durationEl) {
      const currentMin = Math.floor(audio.currentTime / 60);
      const currentSec = Math.floor(audio.currentTime % 60);
      const durationMin = Math.floor(audio.duration / 60);
      const durationSec = Math.floor(audio.duration % 60);

      currentTimeEl.textContent = `${currentMin}:${currentSec < 10 ? '0' + currentSec : currentSec}`;
      durationEl.textContent = `${durationMin}:${durationSec < 10 ? '0' + durationSec : durationSec}`;
    }
  }
});

// Seek on progress click
progressContainer.addEventListener('click', (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

// Auto play next song
audio.addEventListener('ended', () => {
  if (isAutoplay) {
    nextSong();
  } else {
    pauseSong();
  }
});

// Toggle autoplay
autoplayBtn.addEventListener('click', () => {
  isAutoplay = !isAutoplay;
  autoplayBtn.classList.toggle('active');
  autoplayBtn.textContent = isAutoplay ? '🔁' : '➡';
});
