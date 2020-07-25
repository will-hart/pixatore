import { createEventDefinition } from 'ts-bus'
import { Player } from '../state/entities'

export enum EventTypes {
  ON_PLAYER_ADD = 'Player.+',
  ON_PLAYER_REMOVE = 'Player.-',
}

export interface PlayerEventArgs {
  player: Player
  key: string
}

export const onPlayerAddEvent = createEventDefinition<PlayerEventArgs>()(
  EventTypes.ON_PLAYER_ADD,
)

export const onPlayerRemoveEvent = createEventDefinition<PlayerEventArgs>()(
  EventTypes.ON_PLAYER_REMOVE,
)
