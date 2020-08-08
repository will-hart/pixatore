import { Schema, type } from '@colyseus/schema'
import { ComponentTypes } from './ComponentTypes'

/**
 * A default component that
 */
export class PlayerData extends Schema {
  @type('number')
  id: number | undefined

  @type('string')
  public readonly componentType: string = ComponentTypes.PlayerData

  @type('boolean')
  public connected: boolean = false

  @type('boolean')
  public ready: boolean = false

  @type('number')
  public slot: number = -1
}
