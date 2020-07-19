import GroupDrawable from '../drawables/GroupDrawable'
import Engine from '../Engine'
import { SpriteKey } from '../spriteMap'
import BaseScreen from './BaseScreen'

export default class SplashScreen extends BaseScreen {
  constructor(engine: Engine) {
    super('splash', engine, (group: GroupDrawable) => {
      group.position.set(
        Math.max(this.engine.width / 2 - 0.5 * group.width, 0),
        Math.max(this.engine.height / 2 - 0.5 * group.height, 0),
      )
    })

    this.engine.root.addChild(this)
  }

  onAdd = () => {
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
    loadingText.alpha = 0.6

    const refreshLoadingText = () => {
      loadingText.text = `Loaded ${this.engine.sprites.progress}%`

      if (this.engine.sprites.loadingComplete) {
        this.engine.ticker.remove(refreshLoadingText)
        loadingText.text = 'Press any key to continue...'
      }
    }

    this.engine.ticker.add(refreshLoadingText)
  }

  onRemove = () => {
    this.engine.root.removeChild(this)
  }
}
