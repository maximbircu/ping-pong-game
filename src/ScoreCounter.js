import {Direction} from './core/Direction'
import $ from 'jquery'

export class ScoreCounter {
    #score = {left: 0, right: 0}
    #leftScoreContainer
    #rightScoreContainer

    constructor(settings) {
        this.#leftScoreContainer = $(settings.leftScoreContainerId)
        this.#rightScoreContainer = $(settings.rightScoreContainerId)
    }

    updateScore(direction) {
        if (direction === Direction.LEFT) {
            this.#score.right += 1
            this.#rightScoreContainer.text(`${this.#score.right}`)
        } else {
            this.#score.left += 1
            this.#leftScoreContainer.text(`${this.#score.left}`)
        }
    }
}
