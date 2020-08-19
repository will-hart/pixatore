import { Component } from '@pixatore/ecs'
import { type } from '@colyseus/schema'
import { GameStatus } from '../types'

export class Status extends Component {
  @type('string')
  public value: GameStatus = GameStatus.lobby

  public listenersMounted: boolean = false

  public reset(): void {
    this.value = GameStatus.lobby
    this.listenersMounted = false
  }
}
