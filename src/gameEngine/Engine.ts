import * as PIXI from 'pixi.js'

export default class Engine {
  app: PIXI.Application
  scale = 1

  constructor() {
    this.app = new PIXI.Application({
      antialias: true,
      transparent: false,
      resolution: 1,
      autoDensity: true,
    })
  }

  mount(parent: HTMLElement | null) {
    if (!parent) {
      throw new Error('Unable to find parent element to mount game. Aborting')
    }

    parent.appendChild(this.app.view)
  }

  /**
   * Resizes and scales the canvas
   *
   * @param width The width to scale the element to
   * @param height The height to scale the element to
   */
  resize(width: number, height: number) {
    this.app.view.width = width
    this.app.view.height = height
  }
}
