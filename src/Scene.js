import {Table} from './game-objects/Table'
import {Player} from './game-objects/player/Player'
import {ArrowKeys, LetterKeys} from './game-objects/player/PlayerControllKeys'
import {Direction} from './core/Direction'
import {Ball} from './ball/Ball'
import {BallCollider} from './ball/BallColider'

export class Scene {
    #context
    #gameObjects = {}
    #colliders = {}

    constructor(context, sceneSize, keyListener) {
        this.#context = context
        this.#gameObjects['table'] = new Table(sceneSize)
        this.#gameObjects['ball'] = new Ball(sceneSize)
        this.#gameObjects['leftPlayer'] = new Player(sceneSize, Direction.LEFT, LetterKeys, keyListener)
        this.#gameObjects['rightPlayer'] = new Player(sceneSize, Direction.RIGHT, ArrowKeys, keyListener)
        this.#colliders['ballCollider'] = new BallCollider(
            this.#gameObjects.ball,
            sceneSize,
            [this.#gameObjects.leftPlayer, this.#gameObjects.rightPlayer],
            () => {
            },
        )
    }

    start() {
        this.#gameLife()
        this.#gameObjects.ball.startMovement(Direction.LEFT)
    }

    reset() {
        this.#gameObjects.forEach((object) => object.setup())
    }

    #gameLife() {
        Object.values(this.#gameObjects).forEach((object) => {
            object.update()
            object.render(this.#context)
        })

        Object.values(this.#colliders).forEach((collider) => collider.update())

        window.requestAnimationFrame(() => this.#gameLife())
    }
}
