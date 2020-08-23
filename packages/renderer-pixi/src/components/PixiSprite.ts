import * as PIXI from 'pixi.js'
import { Sprite } from '@pixatore/renderer-core'

export class PixiSprite extends Sprite {
  public sprite: PIXI.Sprite | null = null

  reset(): void {
    super.reset()
    this.sprite = null
  }
}
