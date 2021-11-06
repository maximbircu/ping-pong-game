import '../styles/main.scss'
import {Game} from './Game'
import {SceneSize} from './core/SceneSize'

const settings = {
    canvasContainerId: 'game-canvas',
    sceneSize: new SceneSize(700, 600),
    soundPlayerSettings: {
        sounds: {
            win: {id: 'win-audio'},
            ball: {id: 'ball-audio'},
            background: {
                id: 'background',
                volume: 0.1,
                loop: true,
            },
        },
        muteButtonId: '#mute-button',
    },
}
const game = new Game(settings)
game.start()
