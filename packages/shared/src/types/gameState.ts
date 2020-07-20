import { GameStatus } from '.'
import { MapSchema, Schema, type } from '@colyseus/schema'

export interface GameState {
  status: GameStatus
  players: MapSchema
}
