import { World } from '@colyseus/ecs'

import debug from 'debug'
const log = debug('PX:APP:Core      :GameEngine')
log.log = console.log.bind(console)

export class GameEngine {
  constructor(public world: World) {
    log('Creating game engine')
  }
}
