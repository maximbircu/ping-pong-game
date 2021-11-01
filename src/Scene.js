import {Table} from './game-objects/Table'

export class Scene {
    #context
    #gameObjects = []

    constructor(context, sceneSize) {
        this.#context = context
        this.#gameObjects.push(new Table(sceneSize))
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
