import * as PIXI from 'pixi.js'

import { spriteMap, SpriteKey } from './spriteMap'
import { EventBus } from '@pixatore/event-bus'
import { clientEvents } from '@pixatore/game'

export class SpriteStorage {
  lastLoaded = ''
  progress = 0
  loadingComplete = false

  constructor(app: PIXI.Application, private eventBus?: EventBus) {
    app.loader.onProgress.add(this.onLoaderProgress)
    app.loader.add(Array.from(spriteMap.values())).load(this.onLoadingComplete)
  }

  private onLoadingComplete = () => {
    console.log('[LOADER] Loading complete')
    this.loadingComplete = true
    this.eventBus?.publish(
      clientEvents.onAppLoadingProgress({
        percentage: 1,
        status: 'Loading complete',
        complete: true,
      }),
    )
  }
  private onLoaderProgress = (
    loader: PIXI.Loader,
    resource: PIXI.LoaderResource,
  ) => {
    this.progress = loader.progress
    this.lastLoaded = resource.name
    console.log(`[LOADER ${this.progress}%] Loaded ${this.lastLoaded}`)
    this.eventBus?.publish(
      clientEvents.onAppLoadingProgress({
        percentage: this.progress,
        status: this.lastLoaded,
        complete: false,
      }),
    )
  }

  getSprite(key: SpriteKey): PIXI.Sprite | null {
    const img = spriteMap.get(key)
    return img ? PIXI.Sprite.from(img) : null
  }
}
