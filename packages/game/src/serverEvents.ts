import { createEventDefinition } from 'ts-bus'

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
export const onChangeReadyState = createEventDefinition<IPlayerStatusEvent>()(
  ServerEventTypes.CHANGE_READY_STATE,
)

/**
 * Called when a player disconnects/reconnect
 */
export const onChangeConnectionState = createEventDefinition<
  IPlayerStatusEvent
>()(ServerEventTypes.CHANGE_CONNECTION_STATE)

/**
 * Called when a game start is requested
 */
export const onRequestGameStart = createEventDefinition<IPlayerStatusEvent>()(
  ServerEventTypes.REQUEST_GAME_START,
)

/**
 * Called when a player is removed
 */
export const onPlayerRemove = createEventDefinition<IPlayerStatusEvent>()(
  ServerEventTypes.PLAYER_REMOVED,
)
