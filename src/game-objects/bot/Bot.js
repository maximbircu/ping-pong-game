import {Racket} from '../Racket'

export class Bot extends Racket {
    #sceneSize
    #ball

    /** Any real number between 0 and 1 where 0 is super easy and 1 is impossible **/
    #complexity = 0.05

    constructor(sceneSize, position, ball) {
        super(sceneSize, position)
        this.#sceneSize = sceneSize
        this.#ball = ball
    }

    update() {
        const destination = this.#ball.y - (this.height - this.#ball.side) * 0.5
        const newDestination = this.y + (destination - this.y) * this.#complexity
        if (newDestination >= 0 && newDestination <= this.#sceneSize.height - this.height) {
            this.y = newDestination
        }
    }
}

