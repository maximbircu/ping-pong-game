import '../styles/main.scss'
import {Game} from './Game'
import {SceneSize} from './core/SceneSize'

const settings = {
    canvasContainerId: 'game-canvas',
    sceneSize: new SceneSize(700, 600),
    soundPlayerSettings: {
        sounds: {
            win: {
                id: 'win-audio',
                volume: 0.2,
            },
            ball: {id: 'ball-audio'},
            tick: {id: 'tick'},
            background: {
                id: 'background',
                volume: 0.1,
                loop: true,
            },
        },
        muteButtonId: '#mute-button',
    },
    menu: {
        onePlayerButton: {
            buttonId: 'button-one-player',
            screenId: 'game-screen',
        },
        twoPlayersButton: {
            buttonId: 'button-two-players',
            screenId: 'game-screen',
        },
        menuButton: {
            buttonId: 'go-to-main-menu-button',
            screenId: 'main-menu-screen',
        },
    },
    scoreCounter: {
        leftScoreContainerId: '#left-score',
        rightScoreContainerId: '#right-score',
    },
    tableArea: {
        dividerWidth: 4,
    },
    timer: {
        labelId: '#count-down-timer-label',
        intervalBetweenRoundsSec: 3,
    },
}

new Game(settings)
