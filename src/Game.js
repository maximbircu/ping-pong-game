import {Scene} from './Scene'
import {ContextFactory} from './ContextFactory'
import {KeyListener} from './core/KeyListener'

export class Game {
    #keyListener = new KeyListener()
    #scene

    constructor(settings) {
        const context = ContextFactory.create(settings)
        this.#scene = new Scene(context, settings.sceneSize, this.#keyListener)
    }

    start() {
        this.#scene.start()
    }
}
