const sounds = [
    "main theme", "a broken mix", "acoustic frequency", "bad ass ending",
    "cabezas al sur", "razor in mind", "robot tribe", 
    "the frequency is on fire", "what do you have in there anyway?"
];

let currentSongIndex = 0;
let currentSong = document.getElementById(sounds[currentSongIndex]);
let progressInterval;
let isPlaying = false;

updateSongInfo(sounds[0]);

sounds.forEach(sound => {
    const btn = document.createElement("button");
    btn.classList.add("btn");
    btn.innerText = sound;
    document.getElementById("buttons").appendChild(btn);
    
    btn.addEventListener("click", () => {
        playSong(sound);
    });
});

const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");

playButton.addEventListener("click", () => {
    if (currentSong.paused) {
        currentSong.play();
        playButton.style.display = 'none';
        pauseButton.style.display = 'inline-block';
        isPlaying = true;
        requestAnimationFrame(updateProgressBar);
    }
});

pauseButton.addEventListener("click", () => {
    if (!currentSong.paused) {
        currentSong.pause();
        pauseButton.style.display = 'none';
        playButton.style.display = 'inline-block';
        isPlaying = false;
    }
});

document.getElementById("next").addEventListener("click", () => {
    nextSong();
});

document.getElementById("previous").addEventListener("click", () => {
    previousSong();
});


function playSong(sound) {
    stopSongs();
    currentSong = document.getElementById(sound);
    currentSong.play();
    updateSongInfo(sound);
    playButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
    isPlaying = true;
    requestAnimationFrame(updateProgressBar);
}

function stopSongs() {
    sounds.forEach(sound => {
        const song = document.getElementById(sound);
        song.pause();
        song.currentTime = 0;
    });
    playButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
    isPlaying = false;
}

function nextSong() {
    stopSongs();
    currentSongIndex = (currentSongIndex + 1) % sounds.length;
    const nextSound = sounds[currentSongIndex];
    playSong(nextSound);
}

function previousSong() {
    stopSongs();
    currentSongIndex = (currentSongIndex - 1 + sounds.length) % sounds.length;
    const previousSound = sounds[currentSongIndex];
    playSong(previousSound);
}

function updateSongInfo(songName) {
    const currentSongElement = document.getElementById("current-song");
    currentSongElement.innerText = songName;
    currentSongElement.classList.remove("fade-in");
    void currentSongElement.offsetWidth; // Trigger reflow to restart the animation
    currentSongElement.classList.add("fade-in");
}

function updateProgressBar() {
    if (!isPlaying) return;

    const progress = document.getElementById("progress");
    const duration = currentSong.duration;
    const currentTime = currentSong.currentTime;
    const progressWidth = (currentTime / duration) * 100;
    progress.style.width = progressWidth + "%";

    requestAnimationFrame(updateProgressBar);
}
