import {Direction} from '../core/Direction'

export class BallCollider {
    #ball
    #rackets
    #sceneSize
    #onOutFromTable

    constructor(ball, sceneSize, rackets, onOutFromTable) {
        this.#ball = ball
        this.#sceneSize = sceneSize
        this.#rackets = rackets
        this.#onOutFromTable = onOutFromTable
    }


    update() {
        this.#checkWallsCollision()
        this.#checkRacketCollision()
        this.#checkTableExitCollision()
    }

    #checkRacketCollision() {
        this.#rackets.forEach((racket) => {
            if (this.#collidesWithRacket(racket)) {
                this.#onRacketCollision(racket)
            }
        })
    }

    #onRacketCollision(racket) {
        this.x = racket.position === Direction.LEFT ? racket.x + racket.width : racket.x - this.#ball.side
        const n = (this.#ball.y + this.#ball.side - racket.y) / (racket.height + this.#ball.side)
        const phi = 0.25 * Math.PI * (2 * n - 1)
        const smash = Math.abs(phi) > 0.2 * Math.PI ? 1.5 : 1
        const direction = racket.position === Direction.LEFT ? 1 : -1

        this.#ball.velocity.x = smash * direction * this.#ball.speed * Math.cos(phi)
        this.#ball.velocity.y = smash * this.#ball.speed * Math.sin(phi)
    }

    #collidesWithRacket(rocket) {
        return this.#collides(
            rocket.x, rocket.y, rocket.width, rocket.height,
            this.#ball.x, this.#ball.y, this.#ball.side, this.#ball.side,
        )
    }

    #collides(ax, ay, aw, ah, bx, by, bw, bh) {
        return ax < bx + bw && ay < by + bh && bx < ax + aw && by < ay + ah
    }

    #checkTableExitCollision() {
        if (0 > this.#ball.x + this.#ball.side || this.#ball.x > this.#sceneSize.width) {
            if (this.#ball.x + this.#ball.side < 0) {
                this.#onOutFromTable(Direction.LEFT)
            } else {
                this.#onOutFromTable(Direction.RIGHT)
            }
        }
    }

    #checkWallsCollision() {
        const ball = this.#ball
        if (0 > ball.y || ball.y + ball.side > this.#sceneSize.height) {
            const offset = ball.velocity.y < 0 ? 0 - ball.y : this.#sceneSize.height - (ball.y + ball.side)
            this.y += 2 * offset
            this.#ball.velocity.y *= -1
        }
    }
}
