import {Racket} from '../Racket'

export class Player extends Racket {
    #speed
    #sceneSize
    #controlKeys
    #keyListener

    constructor(position, controlKeys, keyListener, settings, playerSettings) {
        super(position, settings, playerSettings.racket)
        this.#speed = playerSettings.speed
        this.#sceneSize = settings.sceneSize
        this.#controlKeys = controlKeys
        this.#keyListener = keyListener
    }

    update() {
        if (this.#keyListener.keyState[this.#controlKeys.upKey]) {
            if (this.y >= 0) {
                this.y -= this.#speed
            }
        }

        if (this.#keyListener.keyState[this.#controlKeys.downKey]) {
            if (this.y <= this.#sceneSize.height - this.height) {
                this.y += this.#speed
            }
        }
    }
}
