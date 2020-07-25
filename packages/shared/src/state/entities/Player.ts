import { Schema, type } from '@colyseus/schema'
import { Position } from '../components/Position'

export class Player extends Schema {
  @type('string')
  public id: string

  @type('boolean')
  public connected: boolean = false

  @type(Position)
  public position: Position

  @type('number')
  public slot: number = -1

  constructor(id: string) {
    super()
    this.id = id
    this.position = new Position(0, 0)
    this.connected = true
  }
}
