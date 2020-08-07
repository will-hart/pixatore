import { Schema, type } from '@colyseus/schema'
import { Transform, PlayerData } from '../../components'

export class Player extends Schema {
  @type('string')
  public id: string

  @type(Transform)
  public transform: Transform

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
