import GroupDrawable from '../drawables/GroupDrawable'
import Engine from '../Engine'
import { SpriteKey } from '../spriteMap'
import BaseScreen from './BaseScreen'
import InputManager from '../InputManager'
import LobbyScreen from './LobbyScreen'

export default class SplashScreen extends BaseScreen {
  loadingText?: PIXI.Text

  constructor(engine: Engine) {
    super('splash', engine, (group: GroupDrawable) => {
      group.position.set(
        Math.max(this.engine.width / 2 - 0.5 * group.width, 0),
        Math.max(this.engine.height / 2 - 0.5 * group.height, 0),
      )
    })
  }

  onAdd = (): void => {
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

    this.loadingText = this.createAndAddText('menu.loadingText', 'LOADING...', {
      fontSize: 16,
    })
    this.loadingText.position.set(200 + logoText.width, logo.height - 40)
    this.loadingText.anchor.x = 1
    this.loadingText.anchor.y = 0
    this.loadingText.alpha = 0.6

    const refreshLoadingText = () => {
      if (this.loadingText)
        this.loadingText.text = `Loaded ${this.engine.sprites.progress}%`

      if (this.engine.sprites.loadingComplete) {
        this.engine.ticker.remove(refreshLoadingText)
        if (this.loadingText)
          this.loadingText.text = 'Hold down [ENTER] to continue...'
      }
    }

    this.engine.ticker.add(refreshLoadingText)
    super.onAdd()
  }

  processInput(input: InputManager): void {
    const heldFor = input.heldFor('Enter')
    if (!heldFor) return

    if (this.loadingText)
      Math.min(
        1,
        Math.max((this.loadingText.alpha = 1 - input.heldFor('Enter')), 0),
      )

    if (heldFor > 1) {
      this.emit('exit')
    }
  }
}
