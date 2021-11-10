import {GameObject} from '../core/GameObject'

export class Table extends GameObject {
    #sceneSize
    #dividerWidth

    constructor(settings) {
        super()
        this.#sceneSize = settings.sceneSize
        this.#dividerWidth = settings.tableArea.dividerWidth
    }

    update() {
        // nothing to do here
    }

    render(context) {
        context.fillStyle = '#fff'
        context.fillRect(0, 0, this.#sceneSize.width, this.#sceneSize.height)

        this.#drawDivider(context)
    }

    #drawDivider(context) {
        context.fillStyle = '#000'

        const step = this.#sceneSize.height / 15

        const x = (this.#sceneSize.width - this.#dividerWidth) * 0.5
        let y = 0
        while (y < this.#sceneSize.height) {
            context.fillRect(x, y + step * 0.25, this.#dividerWidth, step * 0.5)
            y += step
        }
    }
}
