import * as PIXI from 'pixi.js'
import * as Colyseus from 'colyseus.js'

import { State } from '@tauri-game/shared'

import Engine from '../Engine'
import BaseScreen from './BaseScreen'

export default class MenuScreen extends BaseScreen {
  sprite?: PIXI.Sprite
  client?: Colyseus.Client

  constructor(engine: Engine) {
    super('main_menu', engine)
  }

  onAdd = (): void => {
    this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE)
    this.sprite.tint = 0x0000ff
    this.sprite.width = this.sprite.height = 100
    this.sprite.position.set(100, 100)
    this.addChild(this.sprite)
    super.onAdd()

    this.client = new Colyseus.Client('ws://localhost:2567')

    this.client
      .joinOrCreate<State.GameState>('game_room')
      .then((room) => {
        console.log(room.sessionId, 'joined', room.name)
        if (this.sprite) this.sprite.tint = 0x00ff00
      })
      .catch((e) => {
        console.error('JOIN ERROR', e)
        if (this.sprite) this.sprite.tint = 0xff0000
      })
  }
}
