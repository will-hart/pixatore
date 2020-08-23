import { MapSchema, type } from '@colyseus/schema'
import { Component } from '@pixatore/ecs'

export class LoadRenderer extends Component {
  /** Map of players who have completed loading */
  @type({ map: 'float32' }) public playerLoaded: MapSchema<
    number
  > = new MapSchema<number>()

  initialised = false

  public reset(): void {
    this.playerLoaded = new MapSchema<number>()
    this.initialised = false
  }
}
