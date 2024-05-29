const sounds = ["main theme", "a broken mix", "acoustic frequency", "bad ass ending", "cabezas al sur", "razor in mind", "robot tribe", "the frequency is on fire", "what do you have in there anyway?"]

sounds.forEach(sound => {
    const btn = document.createElement("button")
    btn.classList.add("btn")

    btn.innerText = sound

    document.getElementById("buttons").
    appendChild(btn)

    btn.addEventListener("click", () => {
        stopSongs()
        document.getElementById(sound).play()
    })

    function stopSongs() {
        sounds.forEach(sound => {
            const song = document.getElementById(sound)

            song.pause()
            song.currentTime = 0;
        })
    }
})