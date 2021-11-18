import $ from 'jquery'
import {SoundsPlayer} from './core/sounds/SoundsPlayer'

export class GameSoundsPlayer extends SoundsPlayer {
    #isMuted = false

    constructor(settings) {
        super(settings)

        const muteButton = $(settings.muteButtonId)
        muteButton.click((event) => {
            event.preventDefault()
            this.#isMuted = !this.#isMuted
            document.querySelectorAll('audio').forEach((elem) => elem.muted = this.#isMuted)
            muteButton.toggleClass('mute')
        })
    }
}
