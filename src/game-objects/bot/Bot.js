import {Racket} from '../Racket'

export class Bot extends Racket {
    #sceneSize
    #ball
    #complexity

    constructor(sceneSize, position, ball, settings) {
        super(sceneSize, position, settings.racket)
        this.#sceneSize = sceneSize
        this.#ball = ball
        this.#complexity = settings.complexity
    }

    update() {
        const destination = this.#ball.y - (this.height - this.#ball.side) * 0.5
        const newDestination = this.y + (destination - this.y) * this.#complexity
        if (newDestination >= 0 && newDestination <= this.#sceneSize.height - this.height) {
            this.y = newDestination
        }
    }
}

