import { MapSchema, type } from '@colyseus/schema'
import { Component } from '@pixatore/ecs'

export class LoadRenderer extends Component {
  /** Percentge of the game loaded for the individual players */
  @type({ map: 'float32' }) public playerLoaded: MapSchema<
    number
  > = new MapSchema<number>()

  initialised = false

  public reset(): void {
    this.playerLoaded = new MapSchema<number>()
    this.initialised = false
  }
}
