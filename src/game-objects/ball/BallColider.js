import {Direction} from '../../core/Direction'
import {BoxCollider} from '../../core/colliders/BoxColider'

export class BallCollider {
    #ball
    #rackets
    #sceneSize
    #soundsPlayer
    #onOutFromTable

    constructor(ball, sceneSize, soundsPlayer, rackets, onOutFromTable) {
        this.#ball = ball
        this.#sceneSize = sceneSize
        this.#soundsPlayer = soundsPlayer
        this.#rackets = rackets
        this.#onOutFromTable = onOutFromTable
    }

    update() {
        this.#checkWallsCollision()
        this.#checkRacketCollision()
        this.#checkTableExit()
    }

    #checkRacketCollision() {
        this.#rackets.forEach((racket) => {
            if (BoxCollider.collides(racket, this.#ball)) {
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
        this.#soundsPlayer.sounds.ball.play()
    }

    #checkTableExit() {
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
            this.#soundsPlayer.sounds.ball.play()
        }
    }
}
