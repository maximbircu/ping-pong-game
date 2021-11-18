import '../styles/main.scss'
import {Game} from './Game'
import {SceneSize} from './core/SceneSize'
import {ThemeController} from './ThemeController'

const themeController = new ThemeController({
    themeToggleClass: '.js__dark-mode-toggle',
    defaultTheme: 'dark',
})

const colors = {
    light: {
        tableColor: '#fff',
        tableDividerColor: '#434343',
        ballColor: '#66cb8c',
        racketColor: '#434343',
    },
    dark: {
        tableColor: '#434343',
        tableDividerColor: '#fff',
        ballColor: '#66cb8c',
        racketColor: '#fff',
    },
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
                volume: 0.3,
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
    table: {dividerWidth: 3},
    ball: {side: 20, speed: 5},
    failureAnimation: {},
    leftPlayer: {
        speed: 7,
        racket: {width: 20, height: 100},
    },
    rightPlayer: {
        speed: 7,
        racket: {width: 20, height: 100},
    },
    bot: {
        complexity: 0.05, /** Any real number between 0 and 1 where 0 is super easy and 1 is impossible **/
        racket: {width: 20, height: 100},
    },
    timer: {
        labelId: '#count-down-timer-label',
        intervalBetweenRoundsSec: 3,
    },
    colors: colors[themeController.theme],
}

themeController.addThemeRefreshListener((theme) => {
    settings.colors = colors[theme]
})

new Game(settings)
