import * as PIXI from 'pixi.js'
import debug from 'debug'

import { System, IQueryMap, World } from '@pixatore/ecs'
import { Components, UniversalEvents } from '@pixatore/game'
import { EventBus } from '@pixatore/event-bus'
import { SpriteStorage } from '../utilities'
import { PixiSprite } from '../components'

const log = debug('PX:REN:PixiSpriteRenderSystm')
if (console) log.log = console.log.bind(console)

export class PixiSpriteRendererSystem extends System {
  private _app?: PIXI.Application
  private _spriteStorage?: SpriteStorage

  queryMap: IQueryMap = {
    sprites: {
      components: [PixiSprite, Components.Transform],
      notComponents: [],
    },
  }

  constructor(private eventBus: EventBus) {
    super()

    this.eventBus.subscribe(
      UniversalEvents.UniversalEventTypes.MOUNT_APP_TO_DOM,
      (event) => {
        this._app = new PIXI.Application({
          antialias: true,
          transparent: false,
          resolution: window.devicePixelRatio || 1,
          autoDensity: true,
        })
        this._spriteStorage = new SpriteStorage(this._app, this.eventBus)
        event.payload.parent.appendChild(this._app.view)
      },
    )
  }

  execute(_deltaT: number, _world: World): void {
    const sprites = this.queries.sprites.entities.map((ent) => ({
      id: ent.id,
      s: ent.getComponent(PixiSprite)!,
      t: ent.getComponent(Components.Transform)!,
    }))

    if (!sprites.length) return

    for (const entity of sprites) {
      // intialise the sprite
      if (!entity.s.loaded) {
        this.loadSprite(entity)
      }

      if (!entity.s.sprite) continue

      // update the sprite position from the transform
      entity.s.sprite.position.set(entity.t.x, entity.t.y)
      entity.s.sprite.angle = entity.t.rotation
    }
  }

  loadSprite(entity: { id: string; s: PixiSprite; t: Components.Transform }) {
    const sprite = this._spriteStorage?.getSprite(entity.s.spriteId)

    if (!sprite) {
      throw new Error(
        `Unable to find sprite for id ${entity.s.spriteId}, on entity ${entity.id}`,
      )
    }

    entity.s.sprite = sprite
    entity.s.loaded = true
    log(`Loaded sprite ${entity.s.spriteId} for entity ${entity.id}`)
  }
}
