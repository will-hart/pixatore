import * as ECS from '@pixatore/ecs'
import { State } from '@pixatore/game'
import { EventBus } from '@pixatore/event-bus'
import { PixiRendererPlugin } from '@pixatore/renderer-pixi'
import { Room } from 'colyseus.js'

import debug from 'debug'
const log = debug('PX:APP:Core      :GameEngine')
log.log = console.log.bind(console)

export class GameEngine {
  public eventBus: EventBus

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
}
