const musicContainer = document.querySelector('.music-container');
const musicTitle = document.querySelector('#title');
const progressContainer = document.querySelector('.progress-container');
const currentTime = document.querySelector('.current-time');
const durationTime = document.querySelector('.duration-time');
const audio = document.querySelector('#audio');
const loop = document.querySelector('loop');
const previousBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');
const menu = document.querySelector('#menu');
const musicCover = document.querySelector('#cover');
const repeatBtn = document.querySelector('#repeat');
const listBtn = document.querySelector('#list');
const removeBtn = document.querySelector('#remove-btn');
const musicLists = document.querySelector('.music-lists');
const theMusics = document.querySelector('#music');

const songs = ['Bad_Liar - Imagine_Dragons', 'What About Us - Pink', 'Natalie_Taylor - Surrender' ,'Fight Song - Rachel Platten', 'Unstoppable - Sia', 'Meghan-Trainor - \nBetter-When-Im-Dancin', 'Shape Of You - Ed Sheeran', 'Pentatonix - \nThats-Christmas-To-Me', 'Pentatonix - \nJoy_To_The_World', 'Sebastian_Yatra - \nDos_Oruguitas'];

let repSongIndex;

let songIndex = 0;

loadSong(songs[songIndex]);

function loadSong(song) {
    musicTitle.innerText = song;
    audio.src = `music/${song}.mp3`;
    musicCover.src = `images/${song}.jpg`;
}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fa').classList.remove('fa-play');
    playBtn.querySelector('i.fa').classList.add('fa-pause')

    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fa').classList.add('fa-play');
    playBtn.querySelector('i.fa').classList.remove('fa-pause')
 
    audio.pause();
}

function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

function repeatSong() {

    if (songIndex >= songIndex) {
        repSongIndex = songIndex *= 1;
        console.log(repSongIndex);
    }
    // repeatBtn.classList.toggle('active');
    loadSong(songs[songIndex]);

    playSong();
}

function toggleList() {
    musicLists.style.display = 'block';
}
function removeList() {
    musicLists.style.display = 'none';
}

removeBtn.addEventListener('click', removeList);

listBtn.addEventListener('click', toggleList);

function updateProgress(e) {
    progressContainer.max = audio.duration;
    progressContainer.value = audio.currentTime;
    currentTime.innerHTML = (formatTime(Math.floor(audio.currentTime)));
    if (durationTime.innerHTML === 'NaN:NaN') {
        durationTime.innerHTML = '0:00';
    } else {
        durationTime.innerHTML = (formatTime(Math.floor(audio.duration)));
    }

    // progressContainer.style.backgroundColor = '#00ffa6';


    // const { duration, currentTime } = e.srcElement;
    // const progressPercent = (currentTime / duration) * 100;
    // progressBar.style.width = `${progressPercent}%`;
}

function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10) {
        sec = `0${sec}`;
    };
    return `${min}:${sec}`;
}

setInterval(updateProgress, 500);

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener('click', playPause)

function playPause() {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

repeatBtn.addEventListener('click', repeatStyle);

function repeatStyle() {
    repeatBtn.style.color = '#00ffa6';
    repeat.style.padding = '5px';
}

repeatBtn.addEventListener('click', repeatSong);

previousBtn.addEventListener('click', prevSong);

previousBtn.addEventListener('click', () => {
    repeatBtn.style.backgroundColor = null;
    repeatBtn.style.padding = '0px';
});

nextBtn.addEventListener('click', nextSong);

nextBtn.addEventListener('click', () => {
    repeatBtn.style.backgroundColor = null;
    repeatBtn.style.padding = '0px';
});

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', () => {
    if (songIndex == repSongIndex) {
        repeatSong();
    } else {
        nextSong();
    }
});