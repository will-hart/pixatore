import GroupDrawable from '../drawables/GroupDrawable'
import Engine from '../Engine'
import { SpriteKey } from '../spriteMap'

export default class SplashScreen extends GroupDrawable {
  constructor(engine: Engine) {
    super(engine, (group: GroupDrawable) => {
      group.x = Math.max(this.engine.app.view.width / 2 - 0.5 * group.width, 0)
      group.y = Math.max(
        this.engine.app.view.height / 2 - 0.5 * group.height,
        0,
      )
    })
    this.setup()
  }

  setup = () => {
    this.x = this.engine.app.view.width / 2
    this.y = this.engine.app.view.height / 2

    const logo = this.createAndAddSprite('menu.logo', SpriteKey.LOGO)

    const logoText = this.createAndAddText('menu.logoTitle', 'MY GAME', {
      fontSize: 48,
      fontWeight: 'bold',
    })
    logoText.x = 300
    logoText.y = logo.height / 2
    logoText.anchor.y = 0.5

    const loadingText = this.createAndAddText(
      'menu.loadingText',
      'LOADING...',
      { fontSize: 16 },
    )
    loadingText.x = 300
    loadingText.y = logo.height + 50
    loadingText.anchor.x = 0.5
    loadingText.anchor.y = 0.5

    const refreshLoadingText = () => {
      loadingText.text = `Loaded ${this.engine.sprites.progress}%`

      if (this.engine.sprites.loadingComplete) {
        // group.removeDrawableById('menu.loadingText')
        // group.removeDrawable(loadingText)
        const item = this.getDisplayObjectById('menu.loadingText')
        if (item) item.alpha = 0.3

        this.engine.app.ticker.remove(refreshLoadingText)
      }
    }

    this.engine.app.stage.addChild(this)
    this.engine.app.ticker.add(refreshLoadingText)
  }

  detroy = () => {
    this.engine.app.stage.removeChild(this)
  }
}
