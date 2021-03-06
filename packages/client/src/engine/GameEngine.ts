import * as ECS from '@pixatore/ecs'
import { State } from '@pixatore/game'
import { EventBus } from '@pixatore/event-bus'
import { isRenderSystem } from '@pixatore/renderer-core'
import { PixiRendererPlugin, IRenderSystem } from '@pixatore/renderer-pixi'
import { Room } from 'colyseus.js'

import { spriteMap } from './spriteMap'

import debug from 'debug'
const log = debug('PX:APP:Core      :GameEngine')
log.log = console.log.bind(console)

export class GameEngine<TRenderer extends IRenderSystem> {
  public eventBus: EventBus

  private _renderer: TRenderer | null = null

  public get world(): ECS.World {
    return this.room.state
  }

  constructor(public room: Room<ECS.World>) {
    log('Creating game engine...')
    log(' -> initialising event bus')
    this.eventBus = new EventBus()

    log(' -> Initialising ECS')
    State.buildWorld(
      State.WorldTypes.Client,
      [new PixiRendererPlugin()],
      this.eventBus,
      this.room,
      this.room.state,
    )

    log(' --> Game engine initialisation complete')
  }

  // TODO, link this into the PIXI app ticker
  public tick(delta: number): void {
    this.world.tick(delta)
  }

  public disconnect(consented = false): void {
    log('Disconnecting from game engine, consented = %o', consented)
    this.room.leave(consented)
  }

  public mountToDom(parent: HTMLDivElement): void {
    this._renderer = this.world.systems.find(isRenderSystem) as TRenderer

    if (!this._renderer) {
      throw new Error('No rendering system found')
    }

    this._renderer.mountToDom(parent, spriteMap)
  }
}
