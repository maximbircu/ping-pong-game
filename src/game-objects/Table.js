import {GameObject} from '../core/GameObject'

export class Table extends GameObject {
    #sceneSize
    #settings

    constructor(sceneSize, settings) {
        super()
        this.#sceneSize = sceneSize
        this.#settings = settings
    }

    update() {
        // nothing to do here
    }

    render(context) {
        context.fillStyle = this.#settings.tableColor
        context.fillRect(0, 0, this.#sceneSize.width, this.#sceneSize.height)

        this.#drawDivider(context)
    }

    #drawDivider(context) {
        context.fillStyle = this.#settings.dividerColor

        const step = this.#sceneSize.height / 15

        const x = (this.#sceneSize.width - this.#settings.dividerWidth) * 0.5
        let y = 0
        while (y < this.#sceneSize.height) {
            context.fillRect(x, y + step * 0.25, this.#settings.dividerWidth, step * 0.5)
            y += step
        }
    }
}
