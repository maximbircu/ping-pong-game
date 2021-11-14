import {GameObject} from '../core/GameObject'

export class Table extends GameObject {
    #settings

    constructor(settings) {
        super()
        this.#settings = settings
    }

    update() {
        // nothing to do here
    }

    render(context) {
        const sceneSize = this.#settings.sceneSize
        context.fillStyle = this.#settings.colors.tableColor
        context.fillRect(0, 0, sceneSize.width, sceneSize.height)

        this.#drawDivider(context)
    }

    #drawDivider(context) {
        const sceneSize = this.#settings.sceneSize
        const dividerWidth = this.#settings.table.dividerWidth
        context.fillStyle = this.#settings.colors.tableDividerColor

        const step = sceneSize.height / 15

        const x = (sceneSize.width - dividerWidth) * 0.5
        let y = 0
        while (y < sceneSize.height) {
            context.fillRect(x, y + step * 0.25, dividerWidth, step * 0.5)
            y += step
        }
    }
}
