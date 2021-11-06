import {Table} from './game-objects/Table'
import {Player} from './game-objects/player/Player'
import {ArrowKeys, LetterKeys} from './game-objects/player/PlayerControllKeys'
import {Direction} from './core/Direction'
import {Ball} from './game-objects/ball/Ball'
import {BallCollider} from './game-objects/ball/BallColider'

export class Scene {
    #context
    #gameObjects = {}
    #colliders = {}
    #soundsPlayer

    constructor(context, sceneSize, keyListener, soundsPlayer) {
        this.#context = context
        this.#soundsPlayer = soundsPlayer

        this.#gameObjects = {
            table: new Table(sceneSize),
            ball: new Ball(sceneSize),
            leftPlayer: new Player(sceneSize, Direction.LEFT, LetterKeys, keyListener),
            rightPlayer: new Player(sceneSize, Direction.RIGHT, ArrowKeys, keyListener),
        }


        this.#colliders = {
            ballCollider: new BallCollider(
                this.#gameObjects.ball,
                sceneSize,
                soundsPlayer,
                [this.#gameObjects.leftPlayer, this.#gameObjects.rightPlayer],
                () => {
                },
            ),
        }
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
