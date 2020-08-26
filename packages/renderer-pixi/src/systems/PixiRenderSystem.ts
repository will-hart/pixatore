import * as PIXI from 'pixi.js'
import debug from 'debug'
import debounce from 'lodash.debounce'

import { System, IQueryMap, World } from '@pixatore/ecs'
import { IRenderSystem, Sprite } from '@pixatore/renderer-core'

import { SpriteStorage } from '../utilities'
import { EventBus } from '@pixatore/event-bus'
import { Components, clientEvents } from '@pixatore/game'

const log = debug('PX:REN:PixiSpriteRenderSystm')
if (console) log.log = console.log.bind(console)

export class PixiRenderSystem extends System implements IRenderSystem {
  rendererType = 'pixi'

  queryMap: IQueryMap = {
    sprites: {
      components: [Sprite, Components.Transform],
      notComponents: [],
    },
  }

  private debouncedResize: (width: number, height: number) => void

  private app: PIXI.Application | null = null

  private spriteStorage: SpriteStorage | null = null

  private spriteMap: Map<string, PIXI.Sprite> = new Map()

  constructor(private eventBus: EventBus) {
    super()

    this.debouncedResize = debounce(this.doResize, 100, { maxWait: 300 })

    this.eventBus.subscribe(
      clientEvents.ClientEventTypes.RESIZE_GAME_WINDOW,
      this.onResize,
    )
  }

  execute(_deltaT: number, _world: World): void {
    if (!this.spriteStorage || !this.spriteMap || !this.app) {
      // log('Aborting pixi renderer as no storage or map')
      return
    }

    const sprites = this.queries.sprites.entities.map((ent) => ({
      id: ent.id,
      s: ent.getComponent(Sprite)!,
      t: ent.getComponent(Components.Transform)!,
    }))

    for (const sprite of sprites) {
      // load and mount the sprite (once)
      if (!sprite.s.loaded) this.loadSprite(sprite.s)
      if (!sprite.s.mounted) this.mountSprite(sprite.s, sprite.t)

      // otherwise just update the position
      const identifier = sprite.s.spriteIdentifier
      const image = this.spriteMap.get(identifier)

      if (!image) continue
      image.position.set(sprite.t.x, sprite.t.y)
      image.rotation = sprite.t.rotation
    }
  }

  /**
   * Loads the given sprite by sprite identifier
   *
   * @param sprite The sprite component to initialise
   */
  loadSprite(sprite: Sprite): void {
    const image = this.spriteStorage?.getSprite(sprite.spriteId)

    if (!image) {
      throw new Error(
        `Unable to find sprite for id ${sprite.spriteId} on sprite component ${sprite.id}`,
      )
    }

    this.spriteMap.set(sprite.spriteIdentifier, image)
    sprite.loaded = true

    log(`Loaded sprite ${sprite.spriteId} for sprite component ${sprite.id}`)
  }

  /**
   * Mounts the given PIXI sprite (from the sprite map) to the app
   *
   * @param spriteIdentifier the full sprite identifier to mount
   * @param tx the transform associated with the sprite identifer
   */
  mountSprite(sprite: Sprite, tx: Components.Transform): void {
    const image = this.spriteMap.get(sprite.spriteIdentifier)

    if (!image) {
      throw new Error(
        `Unable to find image for sprite identifer ${sprite.spriteIdentifier}`,
      )
    }

    image.position.set(tx.x, tx.y)
    image.rotation = tx.rotation

    sprite.mounted = true

    this.app?.stage.children.push(image)
  }

  mountToDom = (parent: HTMLDivElement): void => {
    if (this.app) {
      // prevent remounts caused by useEffect triggering
      return
    }

    log('Loading app')
    this.app = new PIXI.Application({
      antialias: true,
      transparent: false,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    })

    this.spriteStorage = new SpriteStorage(this.app, this.eventBus)
    parent.appendChild(this.app.view)
  }

  onResize = (event: {
    type: string
    payload: { width: number; height: number }
  }) => {
    const { width, height } = event.payload
    this.debouncedResize(width, height)
  }

  private doResize = (width: number, height: number) => {
    if (!this.app) return

    log(width, height)

    this.app.view.width = width
    this.app.view.height = height

    this.app.view.style.width = `${width}px`
    this.app.view.style.height = `${height}px`
  }
}
