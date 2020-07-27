import { MapSchema, Schema, type } from '@colyseus/schema'
import { Player } from './entities/Player'
import { Status } from './entities/Status'

export class GameState extends Schema {
  @type(Status)
  public status: Status = new Status()

  @type({ map: Player })
  public players: MapSchema<Player> = new MapSchema<Player>()
}
