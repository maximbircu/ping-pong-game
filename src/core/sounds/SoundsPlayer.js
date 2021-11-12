import {Sound} from './Sound'

export class SoundsPlayer {
    sounds = {}

    constructor(settings) {
        this.#loadSounds(settings.sounds)
    }

    #loadSounds(sounds) {
        Object.keys(sounds).forEach((soundKey) => {
            this.sounds[soundKey] = new Sound(sounds[soundKey])
        })
    }

    stopAll() {
        Object.values(this.sounds).forEach((sound) => {
            sound.stop()
        })
    }
}
