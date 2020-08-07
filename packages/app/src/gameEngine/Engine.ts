import * as PIXI from 'pixi.js'
import debounce from 'lodash.debounce'

import { SpriteStorage } from './SpriteStorage'
import SceneNavigator from './scenes/SceneNavigator'
import InputManager from './InputManager'
import { EventBus } from '@pixatore/game'
import GroupDrawable from './drawables/GroupDrawable'

export default class Engine {
  private app: PIXI.Application
  private viewport: GroupDrawable

  // public accessors
  public sprites: SpriteStorage
  public navigator: SceneNavigator
  public input: InputManager

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

    this.sprites = new SpriteStorage(this.app, this.onLoaded)
    this.debouncedResize = debounce(this.doResize, 100, { maxWait: 300 })
    this.navigator = new SceneNavigator(this)

    this.input = new InputManager()
    this.input.subscribe()

    this.viewport = new GroupDrawable(this)
    this.root.addChild(this.viewport)
  }

  mount(parent: HTMLElement | null): void {
    if (!parent) {
      throw new Error('Unable to find parent element to mount game. Aborting')
    }

    parent.appendChild(this.app.view)
  }

  private onLoaded = (): void => {
    this.app.ticker.add(this.loop)
  }

  loop = (): void => {
    this.navigator.current?.processInput(this.input)
    this.input.endFrame()
  }

  /**
   * Resizes and scales the canvas
   *
   * @param width The width to scale the element to
   * @param height The height to scale the element to
   */
  resize = (width: number, height: number): void => {
    this.debouncedResize(width, height)
  }

  private doResize = (width: number, height: number): void => {
    this.app.view.width = width
    this.app.view.height = height

    this.app.view.style.width = `${width}px`
    this.app.view.style.height = `${height}px`
  }
}
