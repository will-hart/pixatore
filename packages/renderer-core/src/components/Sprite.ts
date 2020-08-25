import { Component } from '@pixatore/ecs'
import { type } from '@colyseus/schema'

export class Sprite extends Component {
  @type('string') spriteId: string = ''

  public loaded: boolean = false
  public mounted: boolean = false

  public get spriteIdentifier(): string {
    return `${this.spriteId}|${this.id}`
  }

  reset(): void {
    this.spriteId = ''
    this.loaded = false
    this.mounted = false
  }
}
