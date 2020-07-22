import * as PIXI from 'pixi.js'
import * as Colyseus from 'colyseus.js'

import { State } from '@tauri-game/shared'

import Engine from '../Engine'
import BaseScreen from './BaseScreen'

export type LobbyConnectionStatus = 'idle' | 'connected' | 'error'

export default class LobbyScreen extends BaseScreen {
  sprite?: PIXI.Sprite
  client?: Colyseus.Client

  constructor(engine: Engine) {
    super('main_menu', engine)
  }

  fitScreen = (): void => {
    this.sprite?.position.set(window.innerWidth - 20, 3)
  }

  setStatus = (status: LobbyConnectionStatus): void => {
    if (!this.sprite) return

    switch (status) {
      case 'idle':
        this.sprite.tint = 0x0000ff
        return
      case 'connected':
        this.sprite.tint = 0x00ff00
        return
      case 'error':
        this.sprite.tint = 0xff0000
        return
      default:
        this.sprite.tint = 0xffffff
    }
  }

  inject = (): void => {
    this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE)
    this.sprite.tint = 0x0000ff
    this.sprite.width = this.sprite.height = 5
    this.sprite.position.set(window.innerWidth - 20, 3)
    this.addChild(this.sprite)
    super.inject()

    this.engine.ticker.add(this.fitScreen)
  }

  remove = (): void => {
    super.remove()
    this.engine.ticker.remove(this.fitScreen)
  }
}
