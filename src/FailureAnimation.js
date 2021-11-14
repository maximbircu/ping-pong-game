import {GameObject} from './core/GameObject'
import {Direction} from './core/Direction'

export class FailureAnimation extends GameObject {
    #alpha = 0
    #increasing = true
    #counts = 4
    #direction = Direction.LEFT

    #settings

    constructor(settings) {
        super()
        this.#settings = settings
    }

    drawFailure(direction) {
        this.#alpha = 0
        this.#increasing = true
        this.#counts = 0
        this.#direction = direction
    }

    render(context) {
        const sceneSize = this.#settings.sceneSize
        const tableColor = this.#settings.colors.tableColor
        const tableDividerWidth = this.#settings.table.dividerWidth

        if (this.#counts === 4) return
        this.#alpha += 0.02
        if (this.#alpha >= 1) {
            this.#alpha = 0
            this.#counts++
            this.#increasing = !this.#increasing
        }
        const x1 = this.#direction === Direction.LEFT ? 0 : sceneSize.width
        const grd = context.createLinearGradient((sceneSize.width / 2) - tableDividerWidth, 0, x1, 0)
        grd.addColorStop(0, tableColor)
        grd.addColorStop(1, `rgba(255, 0, 0, ${this.#increasing ? this.#alpha : 1 - this.#alpha})`)
        context.fillStyle = grd

        const x = this.#direction === Direction.LEFT ? 0 : sceneSize.width / 2 + tableDividerWidth
        context.fillRect(x, 0, (sceneSize.width / 2) - tableDividerWidth, sceneSize.height)
    }
}
