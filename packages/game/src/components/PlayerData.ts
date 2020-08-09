import { Component } from '@colyseus/ecs'
import { type } from '@colyseus/schema'

/**
 * A default component that
 */
export class PlayerData extends Component {
  @type('string')
  public playerId: string = ''

  @type('boolean')
  public connected: boolean = false

  @type('boolean')
  public ready: boolean = false

  @type('number')
  public slot: number = -1
}
