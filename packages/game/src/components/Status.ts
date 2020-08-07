import { Schema, type } from '@colyseus/schema'
import { GameStatus } from '../types'

export class Status extends Schema {
  @type('string')
  public current: GameStatus = GameStatus.lobby
}
