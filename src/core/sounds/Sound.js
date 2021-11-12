export class Sound {
    #soundObject
    #volume
    #loop

    constructor(sound) {
        this.#soundObject = document.getElementById(sound.id)
        this.#volume = sound.volume === undefined ? '1' : sound.volume
        this.#loop = sound.loop === undefined ? false : sound.loop
    }

    play() {
        this.#soundObject.volume = this.#volume
        this.#soundObject.loop = this.#loop
        this.#soundObject.play()
    }

    stop() {
        this.#soundObject.pause()
        this.#soundObject.currentTime = 0
    }
}
