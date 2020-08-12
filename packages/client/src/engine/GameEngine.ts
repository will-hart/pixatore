import { World } from '@colyseus/ecs'
import { State } from '@pixatore/game'
import { EventBus } from 'ts-bus'
import { Room } from 'colyseus.js'
import { LobbyHudSystem } from '../systems/LobbyHudSystem'

import debug from 'debug'
const log = debug('PX:APP:Core      :GameEngine')
log.log = console.log.bind(console)

export class GameEngine {
  public readonly eventBus: EventBus = new EventBus()

  constructor(public world: World, public room: Room<State.GameState>) {
    log('Creating game engine...')

    this.world.registerSystem(LobbyHudSystem, { eventBus: this.eventBus })
    // const lobby = this.world.getSystem(LobbyHudSystem)
    log('Added lobby HUD system')
  }

  // TODO, link this into the PIXI app ticker
  public tick(delta: number): void {
    this.world.execute(delta)
  }

  disconnect(consented = false) {
    log('Disconnecting from game engine, consented = %o', consented)
    this.room.leave(consented)
  }
}
