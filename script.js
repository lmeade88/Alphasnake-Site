document.addEventListener("DOMContentLoaded", () => {
    const albumElement = document.getElementById('album');
    const configData = albumElement.getAttribute('data-config');
    
    // Ensure the JSON string is correctly parsed
    const config = JSON.parse(configData);

    const { title, release, tracks } = config;
    const sounds = tracks.map(track => track.name);

    let currentSongIndex = 0;
    let currentSong = null;
    let progressInterval;
    let isPlaying = false;
    let isDragging = false;

    document.getElementById('title').innerText = title;
    document.getElementById('release').innerText = `Released: ${release}`;

    updateSongInfo(sounds[0]);

    tracks.forEach(track => {
        const audioElement = document.createElement('audio');
        audioElement.id = track.name;
        audioElement.src = track.src;
        document.body.appendChild(audioElement);

        audioElement.addEventListener('ended', nextSong);

        const btn = document.createElement("button");
        btn.classList.add("btn");
        btn.innerText = track.name;
        document.getElementById("buttons").appendChild(btn);

        btn.addEventListener("click", () => {
            playSong(track.name);
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

    const progressBarContainer = document.getElementById('progress-bar-container');
    const progressHandle = document.getElementById('progress-handle');

    progressHandle.addEventListener('mousedown', (event) => {
        isDragging = true;
        document.body.classList.add('user-select-none');
        event.preventDefault();  // Prevent text selection
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            document.body.classList.remove('user-select-none');
            seekToPosition();
        }
    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            updateProgressBarPosition(event);
            event.preventDefault();  // Prevent text selection
        }
    });

    progressBarContainer.addEventListener('click', (event) => {
        const rect = progressBarContainer.getBoundingClientRect();
        let offsetX = event.clientX - rect.left;

        if (offsetX < 0) offsetX = 0;
        if (offsetX > rect.width) offsetX = rect.width;

        const progressPercentage = (offsetX / rect.width) * 100;
        progressHandle.style.left = progressPercentage + '%';
        const progress = document.getElementById('progress');
        progress.style.width = progressPercentage + '%';

        const newTime = (progressPercentage / 100) * currentSong.duration;
        currentSong.currentTime = newTime;

        if (!currentSong.paused) {
            currentSong.play();
        }
        event.preventDefault();  // Prevent text selection
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
        resetProgressBar();
    }

    function nextSong() {
        stopSongs();
        currentSongIndex = (currentSongIndex + 1) % sounds.length;
        const nextSound = sounds[currentSongIndex];
        playSong(nextSound);
    }

    function previousSong() {
        if (currentSong.currentTime > 1) {
            currentSong.currentTime = 0;
            resetProgressBar();
            if (!currentSong.paused) {
                currentSong.play();
            }
        } else {
            stopSongs();
            currentSongIndex = (currentSongIndex - 1 + sounds.length) % sounds.length;
            const previousSound = sounds[currentSongIndex];
            playSong(previousSound);
        }
    }

    function updateSongInfo(songName) {
        const currentSongElement = document.getElementById("current-song");
        currentSongElement.classList.add("fade-in");
        setTimeout(() => {
            currentSongElement.innerText = songName;
            currentSongElement.classList.remove("fade-in");
        }, 500);  // Match this duration with the CSS transition duration
    }

    function updateProgressBar() {
        if (!isPlaying && !isDragging) return;

        const progress = document.getElementById('progress');
        const duration = currentSong.duration;
        const currentTime = currentSong.currentTime;
        const progressWidth = (currentTime / duration) * 100;
        progress.style.width = progressWidth + "%";
        if (!isDragging) {
            progressHandle.style.left = progressWidth + "%";
        }

        requestAnimationFrame(updateProgressBar);
    }

    function updateProgressBarPosition(event) {
        const rect = progressBarContainer.getBoundingClientRect();
        let offsetX = event.clientX - rect.left;

        if (offsetX < 0) offsetX = 0;
        if (offsetX > rect.width) offsetX = rect.width;

        const progressPercentage = (offsetX / rect.width) * 100;
        progressHandle.style.left = progressPercentage + '%';
        const progress = document.getElementById('progress');
        progress.style.width = progressPercentage + '%';
    }

    function seekToPosition() {
        const progressPercentage = parseFloat(progressHandle.style.left) / 100;
        const newTime = progressPercentage * currentSong.duration;
        currentSong.currentTime = newTime;
    }

    function resetProgressBar() {
        const progress = document.getElementById('progress');
        const progressHandle = document.getElementById('progress-handle');
        progress.style.width = '0%';
        progressHandle.style.left = '0%';
    }

    // Initialize the first song
    currentSong = document.getElementById(sounds[currentSongIndex]);
});
