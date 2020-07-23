import * as PIXI from 'pixi.js'

import spriteMap, { SpriteKey } from './spriteMap'

export class SpriteStorage {
  lastLoaded = ''
  progress = 0
  loadingComplete = false

  constructor(
    app: PIXI.Application,
    private _onLoadingCompleteCallback?: () => void,
  ) {
    app.loader.onProgress.add(this.onLoaderProgress)
    app.loader.add(Array.from(spriteMap.values())).load(this.onLoadingComplete)
  }

  private onLoadingComplete = () => {
    console.log('[LOADER] Loading complete')
    this.loadingComplete = true
    this._onLoadingCompleteCallback?.()
  }
  private onLoaderProgress = (
    loader: PIXI.Loader,
    resource: PIXI.LoaderResource,
  ) => {
    this.progress = loader.progress
    this.lastLoaded = resource.name
    console.log(`[LOADER ${this.progress}%] Loaded ${this.lastLoaded}`)
  }

  getSprite(key: SpriteKey): PIXI.Sprite | null {
    const img = spriteMap.get(key)
    return img ? PIXI.Sprite.from(img) : null
  }
}
