import { Component } from '@pixatore/ecs'
import { type } from '@colyseus/schema'

export abstract class Sprite extends Component {
  @type('string') spriteId: string = ''

  public loaded: boolean = false

  reset(): void {
    this.spriteId = ''
    this.loaded = false
  }
}
