import $ from 'jquery'

export class CountDownTimer {
    #timerContainer
    #interval
    #soundPlayer

    #handler

    constructor(settings, soundPlayer) {
        this.#timerContainer = $(settings.labelId)
        this.#interval = settings.intervalBetweenRoundsSec
        this.#soundPlayer = soundPlayer
    }

    start(onFinish) {
        let count = this.#interval
        const tick = () => {
            if (count === -1) {
                onFinish()
                clearInterval(this.#handler)
            } else {
                this.#soundPlayer.sounds.tick.play()
            }
            if (count === 0) {
                this.#timerContainer.text('Start!')
            } else if (count > 0) {
                this.#timerContainer.text(`${count}`)
            } else {
                this.#timerContainer.text('')
            }
            count -= 1
        }
        tick()
        this.#handler = setInterval(() => tick(), 1000)
    }

    stop() {
        clearInterval(this.#handler)
    }
}
