import {Scene} from './Scene'
import {ContextFactory} from './ContextFactory'
import {KeyListener} from './core/KeyListener'
import {GameMenu} from './menu/GameMenu'
import {Mode} from './Mode'
import {ScoreCounter} from './ScoreCounter'
import {CountDownTimer} from './CountDownTimer'
import {GameSoundsPlayer} from './GameSoundsPlayer'

export class Game {
    #settings
    #context
    #soundsPlayer
    #menu
    #scoreCounter
    #keyListener = new KeyListener()
    #scene
    #countDownTimer

    constructor(settings) {
        this.#settings = settings
        this.#context = ContextFactory.create(settings)
        this.#soundsPlayer = new GameSoundsPlayer(settings.soundPlayerSettings)
        this.#menu = new GameMenu(settings.menu, (menuItem) => this.onMenuItemSelected(menuItem))
        this.#scoreCounter = new ScoreCounter(settings.scoreCounter)
        this.#countDownTimer = new CountDownTimer(settings.timer)
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
            this.#settings,
            this.#keyListener,
            this.#soundsPlayer,
            mode,
            (direction) => this.#onBallExit(direction),
        )
        this.#keyListener.addKeyDownListener((key) => {
            if (key === 'Space') {
                this.#scene.start()
                this.#keyListener.removeKeyDownListener(this)
            }
        })
    }

    #onBallExit(direction) {
        this.#scoreCounter.updateScore(direction)
        this.#scene.reset()
        this.#countDownTimer.start(() => {
            this.#scene.start()
        })
    }

    #startNewRound() {
        this.#scene.reset()
        this.#scene.start()
    }
}
