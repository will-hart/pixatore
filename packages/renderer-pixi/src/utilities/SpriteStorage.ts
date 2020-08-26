import * as PIXI from 'pixi.js'
import debug from 'debug'

import { EventBus } from '@pixatore/event-bus'
import { UniversalEvents } from '@pixatore/game'

const log = debug('PX:REN:SpriteStorage        ')
if (console) log.log = console.log.bind(console)

export class SpriteStorage {
  lastLoaded = ''
  progress = 0
  loadingComplete = false

  constructor(
    app: PIXI.Application,
    private spriteMap: Map<string, string>,
    private eventBus?: EventBus,
  ) {
    app.loader.onProgress.add(this.onLoaderProgress)
    app.loader
      .add(Array.from(this.spriteMap.values()))
      .load(this.onLoadingComplete)
  }

  private onLoadingComplete = () => {
    log('[LOADER] Loading complete')
    this.loadingComplete = true
    this.eventBus?.publish(
      UniversalEvents.onLoadingProgress({
        progress: 1,
        status: 'Loading complete',
        isComplete: true,
      }),
    )
  }
  private onLoaderProgress = (
    loader: PIXI.Loader,
    resource: PIXI.LoaderResource,
  ) => {
    this.progress = loader.progress
    this.lastLoaded = resource.name
    log(`[LOADER ${this.progress}%] Loaded ${this.lastLoaded}`)
    this.eventBus?.publish(
      UniversalEvents.onLoadingProgress({
        progress: this.progress,
        status: this.lastLoaded,
        isComplete: false,
      }),
    )
  }

  getSprite(key: string): PIXI.Sprite | null {
    const img = this.spriteMap.get(key)
    return img ? PIXI.Sprite.from(img) : null
  }
}
