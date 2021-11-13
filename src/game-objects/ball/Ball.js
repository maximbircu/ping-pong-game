import {GameObject} from '../../core/GameObject'
import {Direction} from '../../core/Direction'
import {BoundingBox} from '../../core/colliders/BoundingBox'

export class Ball extends GameObject {
    side
    speed
    velocity = {x: 0, y: 0}

    #sceneSize
    #settings

    constructor(sceneSize, settings) {
        super()
        this.#sceneSize = sceneSize
        this.#settings = settings
        this.side = settings.side
        this.speed = settings.speed
        this.boundingBox = new BoundingBox(this.side, this.side)
        this.setup()
    }

    startMovement(direction) {
        const dir = direction === Direction.LEFT ? -1 : 1
        const speed = this.speed - 3
        this.velocity = {x: speed * dir, y: this.getRandomNumberBetween(-5, 5)}
    }

    setup() {
        this.x = (this.#sceneSize.width - this.side) / 2
        this.y = (this.#sceneSize.height - this.side) / 2
        this.velocity = {x: 0, y: 0}
    }

    update() {
        this.x += this.velocity.x
        this.y += this.velocity.y
    }

    render(context) {
        context.fillStyle = this.#settings.color
        context.fillRect(this.x, this.y, this.side, this.side)
    }

    getRandomNumberBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}
