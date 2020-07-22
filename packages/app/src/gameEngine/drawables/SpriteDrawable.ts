import * as PIXI from 'pixi.js'
import Engine from '../Engine'
import { SpriteKey } from '../spriteMap'
import Drawable from './Drawable'

export default class SpriteDrawable extends PIXI.Sprite implements Drawable {
  constructor(engine: Engine, public id: string, spriteKey: SpriteKey) {
    super(engine.sprites.getSprite(spriteKey)?.texture)
  }

  inject(stage: PIXI.Container): void {
    stage.addChild(this)
  }

  remove(stage: PIXI.Container): void {
    stage.removeChild(this)
  }
}
