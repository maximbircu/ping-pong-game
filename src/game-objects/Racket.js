import {Direction} from '../core/Direction';
import {GameObject} from '../core/GameObject';

export class Racket extends GameObject {
    width = 20
    height = 100

    position
    #distanceFromEdge = this.width

    #sceneSize

    constructor(sceneSize, position) {
        super()
        this.#sceneSize = sceneSize
        this.position = position
        this.setup()
    }

    setup() {
        if (this.position === Direction.LEFT) {
            this.x = this.#distanceFromEdge
        } else {
            this.x = this.#sceneSize.width - (this.#distanceFromEdge + this.width)
        }

        this.y = (this.#sceneSize.height - this.height) / 2
    }

    render(context) {
        context.fillStyle = '#000'
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}
