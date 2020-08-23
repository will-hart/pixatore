import { buildEvent } from '@pixatore/event-bus'

export enum UniversalEventTypes {
  READY_TO_LOAD = 're::RD!',
  MOUNT_APP_TO_DOM = 're:MA!',
  LOADING_COMPLETE = 're::LC!',
  LOADING_PROGRESS = 're::AP~',
}

export const onMountAppToDom = buildEvent<{ parent: HTMLElement }>(
  UniversalEventTypes.MOUNT_APP_TO_DOM,
)

/**
 * Published by the server when the game moves to "playing"
 * state from "lobby" state
 */
export const onReadyToLoad = buildEvent(UniversalEventTypes.READY_TO_LOAD)

/**
 * Published when all clients have finished loading
 */
export const onLoadingComplete = buildEvent(
  UniversalEventTypes.LOADING_COMPLETE,
)

/**
 * published when the server receives a loading progress update
 * from a client
 */
export const onLoadingProgress = buildEvent<{
  status: string
  progress: number
  isComplete: boolean
}>(UniversalEventTypes.LOADING_PROGRESS)
