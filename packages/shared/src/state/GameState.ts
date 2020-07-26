import { MapSchema, Schema, type } from '@colyseus/schema'
import { Player } from './entities/Player'
import { Types } from '..'

export class GameState extends Schema {
  @type('string')
  public status: Types.GameStatus = Types.GameStatus.lobby

  @type({ map: Player })
  public players: MapSchema<Player> = new MapSchema<Player>()
}
