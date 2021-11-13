import '../styles/main.scss'
import {Game} from './Game'
import {SceneSize} from './core/SceneSize'

const racketSettings = {
    color: '#000',
    width: 20,
    height: 100,
}

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
    table: {
        dividerWidth: 4,
        dividerColor: '#000',
        tableColor: '#fff',
    },
    ball: {
        color: '#ff0000',
        side: 20,
        speed: 5,
    },
    failureAnimation: {},
    leftPlayer: {
        speed: 7,
        racket: racketSettings,
    },
    rightPlayer: {
        speed: 7,
        racket: racketSettings,
    },
    bot: {
        complexity: 0.05, /** Any real number between 0 and 1 where 0 is super easy and 1 is impossible **/
        racket: racketSettings,
    },
    timer: {
        labelId: '#count-down-timer-label',
        intervalBetweenRoundsSec: 3,
    },
}

new Game(settings)
