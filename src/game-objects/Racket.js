import {Direction} from '../core/Direction'
import {GameObject} from '../core/GameObject'
import {BoundingBox} from '../core/colliders/BoundingBox'

export class Racket extends GameObject {
    position
    width
    height

    #settings
    #distanceFromEdge = () => this.width

    constructor(position, settings, racketSettings) {
        super()
        this.position = position
        this.#settings = settings
        this.width = racketSettings.width
        this.height = racketSettings.height
        this.boundingBox = new BoundingBox(this.width, this.height)
        this.setup()
    }

    setup() {
        const sceneSize = this.#settings.sceneSize
        if (this.position === Direction.LEFT) {
            this.x = this.#distanceFromEdge()
        } else {
            this.x = sceneSize.width - (this.#distanceFromEdge() + this.width)
        }

        this.y = (sceneSize.height - this.height) / 2
    }

    render(context) {
        context.fillStyle = this.#settings.colors.racketColor
        context.fillRect(this.x, this.y, this.width, this.height)
    }
}
