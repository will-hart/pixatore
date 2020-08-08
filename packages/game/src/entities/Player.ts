import { Schema, type } from '@colyseus/schema'
import { annotations } from '@pixatore/ecs'
import { Transform, PlayerData } from '../components'
import { ComponentTypes } from '../components/ComponentTypes'

@annotations.ecsEntity
export class Player extends Schema {
  @type('string')
  public id: string

  @annotations.ecsComponent(ComponentTypes.Transform)
  @type(Transform)
  public transform: Transform

  @annotations.ecsComponent(ComponentTypes.PlayerData)
  @type(PlayerData)
  public data: PlayerData

  constructor(id: string, slotNumber: number) {
    super()
    this.id = id

    this.data = new PlayerData()
    this.data.connected = true
    this.data.slot = slotNumber
    this.data.ready = false

    this.transform = new Transform(
      10 + 10 * (slotNumber % 2),
      10 + Math.floor(slotNumber / 2),
    )
  }
}
