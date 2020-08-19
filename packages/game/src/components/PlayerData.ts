import { Component } from '@pixatore/ecs'
import { type } from '@colyseus/schema'

/**
 * A default component that
 */
export class PlayerData extends Component {
  @type('string') public playerId: string = ''
  @type('number') public slot: number = -1
  @type('boolean') public isReady: boolean = false
  @type('boolean') public isConnected: boolean = false

  public reset(): void {
    this.playerId = ''
    this.slot = -1
    this.isReady = false
    this.isConnected = false
  }
}
