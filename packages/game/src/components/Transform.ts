import { Schema, type } from '@colyseus/schema'
import { IComponent } from '@pixatore/ecs'
import { ComponentTypes } from './ComponentTypes'

/**
 * A default component that
 */
export class Transform extends Schema implements IComponent {
  @type('number')
  id: number | undefined

  @type('string')
  public readonly componentType: string = ComponentTypes.Transform

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
