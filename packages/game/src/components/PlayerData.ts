import { Schema, type } from '@colyseus/schema'
import { IComponent } from '@pixatore/ecs'

/**
 * A default component that
 */
export class PlayerData extends Schema implements IComponent {
  @type('number')
  id: number | undefined

  @type('string')
  public readonly componentType: string = 'pld'

  @type('boolean')
  public connected: boolean = false

  @type('boolean')
  public ready: boolean = false

  @type('number')
  public slot: number = -1
}
