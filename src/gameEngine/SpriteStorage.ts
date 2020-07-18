import * as PIXI from 'pixi.js'

import spriteMap, { SpriteKey } from './spriteMap'

export class SpriteStorage {
  constructor(app: PIXI.Application) {
    app.loader.add(Array.from(spriteMap.values())).load(this.spritesLoaded)
  }

  private spritesLoaded() {
    console.log('Loading complete')
  }

  getSprite(key: SpriteKey): PIXI.Sprite | null {
    const img = spriteMap.get(key)
    return img ? PIXI.Sprite.from(img) : null
  }
}
