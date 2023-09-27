const player = document.querySelector('.player');
const playBtn = document.querySelector('.play');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const audio = document.querySelector('.audio');
const progressContainer = document.querySelector('.progress__container');
const progress = document.querySelector('.progress');
const title = document.querySelector('.song');
const cover = document.querySelector('.cover__img');
const imgSrc = document.querySelector('.img__src')

const songs = ['Amy Winehouse - You know im no good', 'Nirvana - About a girl', 'Red Hot Chili Peppers - Dani california', 'Avicii - Wake me up'];

let songIndex = 0;

function initSong(song) {
    title.innerHTML = song;
    audio.src = `assets/audio/${song}.mp3`;
    cover.src = `assets/img/cover${songIndex + 1}.jpg`;
}

initSong(songs[songIndex]);

function playSong() {
    player.classList.add('play');
    imgSrc.src = './assets/icons/pause.png';
    audio.play();
}

function pauseSong() {
    player.classList.remove('play');
    imgSrc.src = './assets/icons/play.png';
    audio.pause();
}

playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
})

function nextSong() {
    songIndex++;
    if (songIndex > songs.length -1) {
        songIndex = 0;
    }
    initSong(songs[songIndex]);
    playSong();
}

nextBtn.addEventListener('click',nextSong);

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length -1;
    }
    initSong(songs[songIndex]);
    playSong();
}

prevBtn.addEventListener('click',prevSong);

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}
    audio.addEventListener('timeupdate', updateProgress);

    function setProgress(e) {
        const widthBar = this.clientWidth;
        const clickBar = e.offsetX;
        const duration = audio.duration;

        audio.currentTime = (clickBar / widthBar) * duration;
    }

    progressContainer.addEventListener('click', setProgress);

    audio.addEventListener('ended', nextSong);