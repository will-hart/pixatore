import * as PIXI from 'pixi.js'
import debounce from 'lodash.debounce'

import { SpriteStorage } from './SpriteStorage'
import { SpriteKey } from './spriteMap'

export default class Engine {
  app: PIXI.Application
  sprites: SpriteStorage
  scale = 1
  private debouncedResize: any

  constructor() {
    this.app = new PIXI.Application({
      antialias: true,
      transparent: false,
      resolution: 1,
      autoDensity: true,
    })

    this.sprites = new SpriteStorage(this.app)

    this.debouncedResize = debounce(this.doResize, 100, { maxWait: 300 })
  }

  mount(parent: HTMLElement | null) {
    if (!parent) {
      throw new Error('Unable to find parent element to mount game. Aborting')
    }

    parent.appendChild(this.app.view)

    const logo = this.sprites.getSprite(SpriteKey.LOGO)

    if (logo) {
      logo.x = 30
      logo.y = 30
      this.app.stage.addChild(logo)
    } else {
      console.warn('logo not found')
    }
  }

  /**
   * Resizes and scales the canvas
   *
   * @param width The width to scale the element to
   * @param height The height to scale the element to
   */
  resize(width: number, height: number) {
    this.debouncedResize(width, height)
  }

  private doResize(width: number, height: number) {
    this.app.view.width = width
    this.app.view.height = height

    this.app.view.style.width = `${width}px`
    this.app.view.style.height = `${height}px`
  }
}
