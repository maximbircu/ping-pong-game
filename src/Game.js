import {Scene} from './Scene'
import {ContextFactory} from './ContextFactory'

export class Game {
    #scene

    constructor(settings) {
        const context = ContextFactory.create(settings)
        this.#scene = new Scene(context, settings.sceneSize)
    }

    start() {
        this.#scene.start()
    }
}
