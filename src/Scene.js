import {Table} from './game-objects/Table'
import {Player} from './game-objects/player/Player'
import {ArrowKeys, LetterKeys} from './game-objects/player/PlayerControllKeys'
import {Direction} from './core/Direction'
import {Ball} from './game-objects/ball/Ball'
import {BallCollider} from './game-objects/ball/BallColider'
import {Bot} from './game-objects/bot/Bot'
import {Mode} from './Mode'
import {FailureAnimation} from './FailureAnimation'

export class Scene {
    #context
    #settings
    #gameObjects = {}
    #colliders = {}
    #soundsPlayer
    #keyListener

    constructor(context, settings, keyListener, soundsPlayer, mode, onBallExit) {
        this.#context = context
        this.#settings = settings
        this.#soundsPlayer = soundsPlayer
        this.#keyListener = keyListener

        const sceneSize = settings.sceneSize
        const ball = new Ball(sceneSize, settings.ball)
        this.#gameObjects = {
            table: new Table(sceneSize, settings.table),
            failure: new FailureAnimation(sceneSize, settings.table.dividerWidth, settings.failureAnimation),
            ball: ball,
            leftPlayer: new Player(sceneSize, Direction.LEFT, LetterKeys, keyListener, settings.leftPlayer),
            rightPlayer: this.#createRightPlayer(sceneSize, Direction.RIGHT, ArrowKeys, mode, ball),
        }

        this.#colliders = {
            ballCollider: new BallCollider(
                this.#gameObjects.ball,
                settings.sceneSize,
                soundsPlayer,
                [this.#gameObjects.leftPlayer, this.#gameObjects.rightPlayer],
                (direction) => {
                    this.#gameObjects.failure.drawFailure(direction)
                    onBallExit(direction)
                },
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
            return new Bot(sceneSize, position, ball, this.#settings.bot)
        } else {
            return new Player(sceneSize, position, keys, this.#keyListener, this.#settings.rightPlayer)
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
