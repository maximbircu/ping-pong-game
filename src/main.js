import '../styles/main.scss'
import {Game} from './Game'
import {SceneSize} from './core/SceneSize'

const settings = {
    canvasContainerId: 'game-canvas',
    sceneSize: new SceneSize(700, 600),
}
const game = new Game(settings)
game.start()
