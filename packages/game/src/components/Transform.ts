import { Schema, type } from '@colyseus/schema'
import { IComponent } from '@pixatore/ecs'

/**
 * A default component that
 */
export class Transform extends Schema implements IComponent {
  @type('number')
  id: number | undefined

  @type('string')
  public readonly componentType: string = 'pos'

  @type('number')
  public x: number

  @type('number')
  public y: number

  @type('number')
  public rotation: number = 0

  constructor(x: number, y: number) {
    super()
    this.x = x
    this.y = y
  }
}
