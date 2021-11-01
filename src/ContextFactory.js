export class ContextFactory {
    static create(settings) {
        const canvas = document.getElementById(settings.canvasContainerId)
        canvas.width = settings.sceneSize.width
        canvas.height = settings.sceneSize.height
        return canvas.getContext('2d')
    }
}
