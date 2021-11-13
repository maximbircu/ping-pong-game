import {Racket} from '../Racket'

export class Player extends Racket {
    #speed = 7
    #sceneSize
    #controlKeys
    #keyListener

    constructor(sceneSize, position, controlKeys, keyListener, settings) {
        super(sceneSize, position, settings.racket)
        this.#sceneSize = sceneSize
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
