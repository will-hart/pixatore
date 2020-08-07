import BaseScene from './BaseScene'
import Engine from '../Engine'
import { GameState } from '@pixatore/game/build/state'
import { EventBus } from '@pixatore/game'

export default class GameScene extends BaseScene {
  constructor(engine: Engine) {
    super('game', engine)
  }
}
