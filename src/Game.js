import {Scene} from './Scene'
import {ContextFactory} from './ContextFactory'
import {KeyListener} from './core/KeyListener'
import {SoundsPlayer} from './core/sounds/SoundsPlayer';

export class Game {
    #keyListener = new KeyListener()
    #soundsPlayer
    #scene

    constructor(settings) {
        const context = ContextFactory.create(settings)
        this.#soundsPlayer = new SoundsPlayer(settings.soundPlayerSettings)
        this.#scene = new Scene(context, settings.sceneSize, this.#keyListener, this.#soundsPlayer)
    }

    start() {
        this.#scene.start()
    }
}
