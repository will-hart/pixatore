import { State } from '@pixatore/game'
import { World } from '@colyseus/ecs'
import { Room } from 'colyseus.js'

import debug from 'debug'
const log = debug('App:GameEngine')
log.log = console.log.bind(console)

export class GameEngine {
  public world: World

  constructor(private room: Room<State.GameState>) {
    log('Creating game engine')

    // mount the ECS world
    this.world = State.buildWorld(State.WorldTypes.Client)
    this.world.useEntities(this.room.state.entities)
    log('Mounted ECS World to State')
  }
}
