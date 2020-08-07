import { Schema, type } from '@colyseus/schema'

/**
 * A default component that
 */
export class Position extends Schema {
  @type('number')
  public x: number

  @type('number')
  public y: number

  constructor(x: number, y: number) {
    super()
    this.x = x
    this.y = y
  }
}
