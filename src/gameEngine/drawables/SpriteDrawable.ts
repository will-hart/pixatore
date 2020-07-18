import * as PIXI from 'pixi.js'
import Engine from '../Engine'
import { SpriteKey } from '../spriteMap'
import IDrawable from './IDrawable'

export default class SpriteDrawable extends PIXI.Sprite implements IDrawable {
  constructor(engine: Engine, public id: string, spriteKey: SpriteKey) {
    super(engine.sprites.getSprite(spriteKey)?.texture)
  }

  onAdd(stage: PIXI.Container) {
    stage.addChild(this)
  }

  onRemove(stage: PIXI.Container) {
    stage.removeChild(this)
  }
}
