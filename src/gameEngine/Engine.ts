import * as PIXI from 'pixi.js'
import debounce from 'lodash.debounce'

import { SpriteStorage } from './SpriteStorage'
import SplashScreen from './screens/SplashScreen'

export default class Engine {
  private app: PIXI.Application
  sprites: SpriteStorage

  private debouncedResize: (width: number, height: number) => void

  get width(): number {
    return this.app.view.width
  }

  get height(): number {
    return this.app.view.height
  }

  get ticker(): PIXI.Ticker {
    return this.app.ticker
  }

  get root(): PIXI.Container {
    return this.app.stage
  }

  constructor() {
    this.app = new PIXI.Application({
      antialias: true,
      transparent: false,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    })

    this.sprites = new SpriteStorage(this.app, this.mountExample)
    this.debouncedResize = debounce(this.doResize, 100, { maxWait: 300 })
  }

  mount(parent: HTMLElement | null) {
    if (!parent) {
      throw new Error('Unable to find parent element to mount game. Aborting')
    }

    parent.appendChild(this.app.view)
  }

  private mountExample = () => {
    new SplashScreen(this)
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
