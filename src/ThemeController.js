import $ from 'jquery'
import {Cookie} from './Cookie'

export class ThemeController {
    #settings
    #cookie = new Cookie()
    #themeRefreshListeners = []

    constructor(settings) {
        this.#settings = settings
        this.#refreshTheme()
        if (settings.readOnly === false) {
            const toggle = $(settings.themeToggleClass)
            toggle.prop('checked', this.theme === 'light')
            toggle.click((event) => {
                this.#cookie.set('theme', ThemeController.#getThemeOpposite(this.theme))
                this.#refreshTheme()
            })
            toggle.mousedown((event) => event.preventDefault())
        }
    }

    #refreshTheme() {
        this.theme = this.#cookie.get('theme') || this.#settings.defaultTheme
        document.documentElement.setAttribute('data-theme', this.theme)
        this.#themeRefreshListeners.forEach((listener) => listener(this.theme))
    }


    addThemeRefreshListener(listener) {
        this.#themeRefreshListeners.push(listener)
    }

    removeThemeRefreshListener(listener) {
        this.#themeRefreshListeners.splice(this.#themeRefreshListeners.indexOf(listener), 1)
    }

    static #getThemeOpposite(theme) {
        return theme === 'dark' ? 'light' : 'dark'
    };
}
