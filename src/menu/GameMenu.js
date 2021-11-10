import $ from 'jquery'

export class GameMenu {
    #timelineIntroScreen = gsap.timeline({paused: false})
    #settings

    constructor(settings, onMenuItemSelected) {
        this.#settings = settings
        this.#timelineIntroScreen.staggerFrom(`#menu-screen .menu-button`, 1.3, {
            css: {scale: 0},
            autoAlpha: 0,
            ease: Elastic.easeOut,
        }, .1)
        this.#timelineIntroScreen.restart()

        $('div.menu-button').click((event) => {
            event.preventDefault()
            const buttonId = event.target.id
            const menuItem = this.#getMenuItem(buttonId)

            if (menuItem === settings.menuButton) {
                this.#fadeToScreen(
                    menuItem.screenId, () => {
                        this.#timelineIntroScreen.restart()
                        onMenuItemSelected(menuItem)
                    },
                )
            } else {
                this.#timelineIntroScreen.reverse()
                this.#timelineIntroScreen.eventCallback('onReverseComplete', () => {
                    this.#fadeToScreen(menuItem.screenId, () => onMenuItemSelected(menuItem))
                })
            }
        })
    }

    #fadeToScreen(screenName, onFadeOut) {
        const currentScreen = $('.active-screen')
        const targetScreen = $(`#${screenName}`)
        return gsap.to(currentScreen, .3, {
            autoAlpha: 0,
            y: '+=10',
            onComplete: () => {
                if (onFadeOut) onFadeOut()
                currentScreen.removeClass('active-screen')
                gsap.to(targetScreen, .3, {
                    y: '-=10',
                    autoAlpha: 1,
                    onComplete: () => {
                        targetScreen.addClass('active-screen')
                    },
                })
            },
        })
    }

    #getMenuItem(buttonId) {
        return Object.values(this.#settings).find((menuItem) => menuItem.buttonId === buttonId)
    }
}
