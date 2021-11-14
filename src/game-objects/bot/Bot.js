import {Racket} from '../Racket'

export class Bot extends Racket {
    #sceneSize
    #ball
    #complexity

    constructor(position, ball, settings, playerSettings) {
        super(position, settings, playerSettings.racket)
        this.#ball = ball
        this.#sceneSize = settings.sceneSize
        this.#complexity = settings.bot.complexity
    }

    update() {
        const destination = this.#ball.y - (this.height - this.#ball.side) * 0.5
        const newDestination = this.y + (destination - this.y) * this.#complexity
        if (newDestination >= 0 && newDestination <= this.#sceneSize.height - this.height) {
            this.y = newDestination
        }
    }
}

