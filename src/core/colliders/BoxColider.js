export class BoxCollider {
    static collides(object1, object2) {
        return this.collidesTest(
            object1.x, object1.y, object1.boundingBox.width, object1.boundingBox.height,
            object2.x, object2.y, object2.boundingBox.width, object2.boundingBox.height,
        )
    }

    static collidesTest(ax, ay, aw, ah, bx, by, bw, bh) {
        return ax < bx + bw && ay < by + bh && bx < ax + aw && by < ay + ah
    }
}
