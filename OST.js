const sounds = [
    "main theme", "a broken mix", "acoustic frequency", "bad ass ending",
    "cabezas al sur", "razor in mind", "robot tribe", 
    "the frequency is on fire", "what do you have in there anyway?"
];

let currentSongIndex = 0;
let currentSong = document.getElementById(sounds[currentSongIndex]);

sounds.forEach(sound => {
    const btn = document.createElement("button");
    btn.classList.add("btn");
    btn.innerText = sound;
    document.getElementById("buttons").appendChild(btn);
    
    btn.addEventListener("click", () => {
        playSong(sound);
    });
});

document.getElementById("play").addEventListener("click", () => {
    if (currentSong) {
        currentSong.play();
    }
});

document.getElementById("pause").addEventListener("click", () => {
    if (currentSong) {
        currentSong.pause();
    }
});

document.getElementById("next").addEventListener("click", () => {
    nextSong();
});

function playSong(sound) {
    stopSongs();
    currentSong = document.getElementById(sound);
    currentSong.play();
}

function stopSongs() {
    sounds.forEach(sound => {
        const song = document.getElementById(sound);
        song.pause();
        song.currentTime = 0;
    });
}

function nextSong() {
    stopSongs();
    currentSongIndex = (currentSongIndex + 1) % sounds.length;
    currentSong = document.getElementById(sounds[currentSongIndex]);
    currentSong.play();
}
