import { buildEvent } from './eventBuilder'

export enum ServerEventTypes {
  CHANGE_READY_STATE = 'RDY',
  CHANGE_CONNECTION_STATE = 'PCS',
  REQUEST_GAME_START = 'RGS',
  PLAYER_REMOVED = 'PRV',
}

export interface IPlayerStatusEvent {
  sessionId: string
  status: boolean
}

/**
 * Called when a player changes ready state
 */
export const onChangeReadyState = buildEvent<IPlayerStatusEvent>(
  ServerEventTypes.CHANGE_READY_STATE,
)

/**
 * Called when a player disconnects/reconnect
 */
export const onChangeConnectionState = buildEvent<IPlayerStatusEvent>(
  ServerEventTypes.CHANGE_CONNECTION_STATE,
)

/**
 * Called when a game start is requested
 */
export const onRequestGameStart = buildEvent<IPlayerStatusEvent>(
  ServerEventTypes.REQUEST_GAME_START,
)

/**
 * Called when a player is removed
 */
export const onPlayerRemove = buildEvent<IPlayerStatusEvent>(
  ServerEventTypes.PLAYER_REMOVED,
)
