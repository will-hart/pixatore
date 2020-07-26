import { createEventDefinition } from 'ts-bus'
import { Player } from '../state/entities'
import { Types } from '..'

export enum EventTypes {
  ON_PLAYER_ADD = 'Player.+',
  ON_PLAYER_REMOVE = 'Player.-',
  ON_PLAYER_UPDATE = 'Player.~',
  ON_GAME_STATUS_CHANGED = 'GameStatus.~',
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
export const onPlayerUpdateEvent = createEventDefinition<PlayerEventArgs>()(
  EventTypes.ON_PLAYER_UPDATE,
)
export const onGameStatusChanged = createEventDefinition<{
  current: Types.GameStatus
}>()(EventTypes.ON_GAME_STATUS_CHANGED)
