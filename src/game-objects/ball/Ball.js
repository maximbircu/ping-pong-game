import {GameObject} from '../../core/GameObject'
import {Direction} from '../../core/Direction'
import {BoundingBox} from '../../core/colliders/BoundingBox'

export class Ball extends GameObject {
    side = 20
    speed = 3
    velocity = {x: 0, y: 0}

    #sceneSize

    constructor(sceneSize) {
        super()
        this.#sceneSize = sceneSize
        this.boundingBox = new BoundingBox(this.side, this.side)
        this.setup()
    }

    startMovement(direction) {
        const dir = direction === Direction.LEFT ? -1 : 1
        this.velocity = {x: this.speed * dir, y: this.getRandomNumberBetween(-5, 5)}
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
        context.fillStyle = '#ff0000'
        context.fillRect(this.x, this.y, this.side, this.side)
    }

    getRandomNumberBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}
