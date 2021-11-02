export class KeyListener {
    keyState = {}
    #onKeyDownListeners = []

    constructor() {
        document.addEventListener('keydown', (event) => {
            this.keyState[event.code] = true
            this.#onKeyDownListeners.forEach((listener) => listener(event.code))
        })

        document.addEventListener('keyup', (event) => {
            delete this.keyState[event.code]
        })
    }

    addKeyDownListener(listener) {
        this.#onKeyDownListeners.push(listener)
    }

    removeKeyDownListener(listener) {
        this.#onKeyDownListeners.splice(this.#onKeyDownListeners.indexOf(listener), 1)
    }
}
