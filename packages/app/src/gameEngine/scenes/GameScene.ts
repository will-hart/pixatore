import BaseScene from './BaseScene'
import Engine from '../Engine'
import { GameState } from '@pixatore/shared/build/state'
import { EventBus } from '@pixatore/shared'

export default class GameScene extends BaseScene {
  constructor(engine: Engine) {
    super('game', engine)
  }
}
