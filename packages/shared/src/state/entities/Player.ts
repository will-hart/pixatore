import { Schema, type } from '@colyseus/schema'
import { Position } from '../components/Position'

export class Player extends Schema {
  @type(Position)
  public position: Position

  @type('number')
  public kills: number = 0

  constructor() {
    super()
    this.position = new Position(0, 0)
  }
}
