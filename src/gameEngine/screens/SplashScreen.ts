import * as PIXI from 'pixi.js'
import GroupDrawable from '../drawables/GroupDrawable'
import Engine from '../Engine'
import { SpriteKey } from '../spriteMap'

export default class SplashScreen extends GroupDrawable {
  constructor(engine: Engine) {
    super(engine, (group: GroupDrawable) => {
      group.position.set(
        Math.max(this.engine.width / 2 - 0.5 * group.width, 0),
        Math.max(this.engine.height / 2 - 0.5 * group.height, 0),
      )
    })

    this.setup()
    this.engine.root.addChild(this)
  }

  setup = () => {
    this.position.set(this.engine.width / 2, this.engine.height / 2)

    const logo = this.createAndAddSprite('menu.logo', SpriteKey.LOGO)
    logo.height = 150
    logo.width = 150

    const logoText = this.createAndAddText('menu.logoTitle', 'MY GAME', {
      fontSize: 64,
      fontWeight: 'bold',
    })
    logoText.position.set(200, logo.height / 2)
    logoText.anchor.y = 0.5

    const loadingText = this.createAndAddText(
      'menu.loadingText',
      'LOADING...',
      { fontSize: 16 },
    )
    loadingText.position.set(200 + logoText.width, logo.height - 40)
    loadingText.anchor.x = 1
    loadingText.anchor.y = 0

    const refreshLoadingText = () => {
      loadingText.text = `Loaded ${this.engine.sprites.progress}%`

      if (this.engine.sprites.loadingComplete) {
        // group.removeDrawableById('menu.loadingText')
        // group.removeDrawable(loadingText)
        const item = this.getDisplayObjectById('menu.loadingText')
        if (item) item.alpha = 0.3

        this.engine.ticker.remove(refreshLoadingText)
      }
    }

    this.engine.ticker.add(refreshLoadingText)
  }

  detroy = () => {
    this.engine.root.removeChild(this)
  }
}
