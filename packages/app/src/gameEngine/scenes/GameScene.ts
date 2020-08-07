import BaseScene from './BaseScene'
import Engine from '../Engine'

export default class GameScene extends BaseScene {
  constructor(engine: Engine) {
    super('game', engine)
  }
}
