import {Scene} from './Scene'
import {ContextFactory} from './ContextFactory'
import {KeyListener} from './core/KeyListener'
import {SoundsPlayer} from './core/sounds/SoundsPlayer'
import {GameMenu} from './menu/GameMenu'
import {Mode} from './Mode'
import {ScoreCounter} from './ScoreCounter'

export class Game {
    #settings
    #context
    #soundsPlayer
    #menu
    #scoreCounter
    #keyListener = new KeyListener()
    #scene

    constructor(settings) {
        this.#settings = settings
        this.#context = ContextFactory.create(settings)
        this.#soundsPlayer = new SoundsPlayer(settings.soundPlayerSettings)
        this.#menu = new GameMenu(settings.menu, (menuItem) => this.onMenuItemSelected(menuItem))
        this.#scoreCounter = new ScoreCounter(settings.scoreCounter)
    }

    onMenuItemSelected(menuItem) {
        switch (menuItem) {
        case this.#settings.menu.onePlayerButton:
            this.#startNewGame(Mode.SINGLE_PLAYER)
            break
        case this.#settings.menu.twoPlayersButton:
            this.#startNewGame(Mode.TWO_PLAYERS)
            break
        case this.#settings.menu.menuButton:
            this.#scene.reset()
            break
        }
    }

    #startNewGame(mode) {
        this.#scene = new Scene(
            this.#context,
            this.#settings.sceneSize,
            this.#keyListener,
            this.#soundsPlayer,
            mode,
            (direction) => this.#onBallExit(direction),
        )
        this.#scene.start()
    }

    #onBallExit(direction) {
        this.#scoreCounter.updateScore(direction)
        this.#startNewRound()
    }

    #startNewRound() {
        this.#scene.reset()
        this.#keyListener.addKeyDownListener((key) => {
            if (key === 'Space') {
                this.#scene.start()
                this.#keyListener.removeKeyDownListener(this)
            }
        })
    }
}
