import {Direction} from '../core/Direction'
import {GameObject} from '../core/GameObject'
import {BoundingBox} from '../core/colliders/BoundingBox'

export class Racket extends GameObject {
    position
    width
    height

    #sceneSize
    #settings
    #distanceFromEdge = () => this.width

    constructor(sceneSize, position, settings) {
        super()
        this.#sceneSize = sceneSize
        this.#settings = settings
        this.position = position
        this.width = settings.width
        this.height = settings.height
        this.boundingBox = new BoundingBox(this.width, this.height)
        this.setup()
    }

    setup() {
        if (this.position === Direction.LEFT) {
            this.x = this.#distanceFromEdge()
        } else {
            this.x = this.#sceneSize.width - (this.#distanceFromEdge() + this.width)
        }

        this.y = (this.#sceneSize.height - this.height) / 2
    }

    render(context) {
        context.fillStyle = this.#settings.color
        context.fillRect(this.x, this.y, this.width, this.height)
    }
}
