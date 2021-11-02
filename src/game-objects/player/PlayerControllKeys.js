class PlayerControlKeys {
    constructor(upKey, downKey) {
        this.upKey = upKey
        this.downKey = downKey
    }
}

const LetterKeys = new PlayerControlKeys('KeyW', 'KeyS')
const ArrowKeys = new PlayerControlKeys('ArrowUp', 'ArrowDown')

export {PlayerControlKeys, LetterKeys, ArrowKeys}
