import { Schema, type } from '@colyseus/schema'
import { Position } from '../components/Position'

export class Player extends Schema {
  @type('string')
  public id: string

  @type('boolean')
  public connected: boolean = false

  @type('boolean')
  public ready: boolean = false

  @type(Position)
  public position: Position

  @type('number')
  public slot: number = -1

  constructor(id: string, slotNumber: number) {
    super()
    this.id = id
    this.connected = true
    this.slot = slotNumber
    this.position = new Position(10 + 10 * (slotNumber % 2), 10 + Math.floor(slotNumber / 2))
  }
}
