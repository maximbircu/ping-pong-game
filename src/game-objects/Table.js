import {GameObject} from '../core/GameObject'

export class Table extends GameObject {
    #sceneSize

    constructor(sceneSize) {
        super()
        this.#sceneSize = sceneSize
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

        const dividerWidth = 4
        const step = this.#sceneSize.height / 15

        const x = (this.#sceneSize.width - dividerWidth) * 0.5
        let y = 0
        while (y < this.#sceneSize.height) {
            context.fillRect(x, y + step * 0.25, dividerWidth, step * 0.5)
            y += step
        }
    }
}
