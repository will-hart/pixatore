import { World } from '@colyseus/ecs'
import { State } from '@pixatore/game'
import { EventBus } from '@pixatore/event-bus'
import { Room } from 'colyseus.js'

import debug from 'debug'
const log = debug('PX:APP:Core      :GameEngine')
log.log = console.log.bind(console)

export class GameEngine {
  public world: World
  public eventBus: EventBus

  constructor(public room: Room<State.GameState>) {
    log('Creating game engine...')
    log(' -> initialising event bus')
    this.eventBus = new EventBus()

    log(' -> Initialising ECS')
    this.world = State.buildWorld(
      room.state,
      State.WorldTypes.Client,
      this.eventBus,
    )

    log(' --> Game engine initialisation complete')
  }

  // TODO, link this into the PIXI app ticker
  public tick(delta: number): void {
    this.world.execute(delta)
  }

  disconnect(consented = false): void {
    log('Disconnecting from game engine, consented = %o', consented)
    this.room.leave(consented)
  }
}
