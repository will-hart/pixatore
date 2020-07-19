import * as PIXI from 'pixi.js'
import Engine from '../Engine'
import BaseScreen from './BaseScreen'

export default class MenuScreen extends BaseScreen {
  constructor(engine: Engine) {
    super('main_menu', engine)
  }

  onAdd = () => {
    const sprite = new PIXI.Sprite(PIXI.Texture.WHITE)
    sprite.tint = 0xff0000
    sprite.width = sprite.height = 100
    sprite.position.set(100, 100)
    this.addChild(sprite)

    super.onAdd()
  }
}
