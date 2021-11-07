import {Table} from './game-objects/Table'
import {Player} from './game-objects/player/Player'
import {ArrowKeys, LetterKeys} from './game-objects/player/PlayerControllKeys'
import {Direction} from './core/Direction'
import {Ball} from './game-objects/ball/Ball'
import {BallCollider} from './game-objects/ball/BallColider'
import {Bot} from './game-objects/bot/Bot'
import {Mode} from './Mode'

export class Scene {
    #context
    #gameObjects = {}
    #colliders = {}
    #soundsPlayer
    #keyListener

    constructor(context, sceneSize, keyListener, soundsPlayer, mode, onBallExit) {
        this.#context = context
        this.#soundsPlayer = soundsPlayer
        this.#keyListener = keyListener

        const ball = new Ball(sceneSize)
        this.#gameObjects = {
            table: new Table(sceneSize),
            ball: ball,
            leftPlayer: new Player(sceneSize, Direction.LEFT, LetterKeys, keyListener),
            rightPlayer: this.#createRightPlayer(sceneSize, Direction.RIGHT, ArrowKeys, mode, ball),
        }

        this.#colliders = {
            ballCollider: new BallCollider(
                this.#gameObjects.ball,
                sceneSize,
                soundsPlayer,
                [this.#gameObjects.leftPlayer, this.#gameObjects.rightPlayer],
                onBallExit,
            ),
        }
        this.#gameLife()
    }

    start() {
        this.#gameObjects.ball.startMovement(Direction.LEFT)
    }

    reset() {
        Object.values(this.#gameObjects).forEach((object) => object.setup())
    }

    #createRightPlayer(sceneSize, position, keys, mode, ball) {
        if (mode === Mode.SINGLE_PLAYER) {
            return new Player(sceneSize, position, keys, this.#keyListener)
        } else {
            return new Bot(sceneSize, position, ball)
        }
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
