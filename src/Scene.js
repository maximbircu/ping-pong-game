import {Table} from './game-objects/Table'
import {Player} from './game-objects/player/Player'
import {LetterKeys} from './game-objects/player/PlayerControllKeys'
import {Direction} from './core/Direction'

export class Scene {
    #context
    #gameObjects = []

    constructor(context, sceneSize, keyListener) {
        this.#context = context
        this.#gameObjects.push(new Table(sceneSize))
        this.#gameObjects.push(new Player(sceneSize, Direction.LEFT, LetterKeys, keyListener))
    }

    start() {
        this.#gameLife()
    }

    reset() {
        this.#gameObjects.forEach((object) => object.setup())
    }

    #gameLife() {
        this.#gameObjects.forEach((object) => {
            object.update()
            object.render(this.#context)
        })

        window.requestAnimationFrame(() => this.#gameLife())
    }
}
