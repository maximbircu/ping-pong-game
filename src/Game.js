import {Scene} from './Scene'
import {ContextFactory} from './ContextFactory'
import {KeyListener} from './core/KeyListener'
import {SoundsPlayer} from './core/sounds/SoundsPlayer'
import {GameMenu} from './menu/GameMenu'

export class Game {
    #keyListener = new KeyListener()
    #soundsPlayer
    #scene
    #menu
    #settings

    constructor(settings) {
        this.#settings = settings
        const context = ContextFactory.create(settings)
        this.#soundsPlayer = new SoundsPlayer(settings.soundPlayerSettings)
        this.#scene = new Scene(context, settings.sceneSize, this.#keyListener, this.#soundsPlayer)
        this.#menu = new GameMenu(settings.menu, (menuItem) => this.onMenuItemSelected(menuItem))
    }

    onMenuItemSelected(menuItem) {
        switch (menuItem) {
        case this.#settings.menu.onePlayerButton:
        case this.#settings.menu.twoPlayersButton:
            this.#scene.start()
            break
        case this.#settings.menu.menuButton:
            this.#scene.reset()
            break
        }
    }
}
