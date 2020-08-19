import { Component } from '@pixatore/ecs'
import { type } from '@colyseus/schema'

/**
 * Contains position and rotation for an entity
 */
export class Transform extends Component {
  @type('number')
  public x: number = 0

  @type('number')
  public y: number = 0

  @type('number')
  public rotation: number = 0

  reset() {
    this.rotation = 0
    this.x = 0
    this.y = 0
  }
}
