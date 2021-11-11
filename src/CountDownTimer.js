import $ from 'jquery'

export class CountDownTimer {
    #timerContainer
    #interval

    constructor(settings) {
        this.#timerContainer = $(settings.labelId)
        this.#interval = settings.intervalBetweenRoundsSec
    }

    start(onFinish) {
        let count = this.#interval
        const tick = () => {
            if (count === -1) {
                onFinish()
                clearInterval(handler)
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
        const handler = setInterval(() => tick(), 1000)
    }
}
