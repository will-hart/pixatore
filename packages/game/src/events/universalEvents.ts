import { buildEvent } from '@pixatore/event-bus'

export enum RendererEventTypes {
  READY_TO_LOAD = 're::RD!',
  LOADING_COMPLETE = 're::LC!',
  LOADING_PROGRESS = 're::AP~',
}

/**
 * Published by the server when the game moves to "playing"
 * state from "lobby" state
 */
export const onReadyToLoad = buildEvent(RendererEventTypes.READY_TO_LOAD)

/**
 * Published when all clients have finished loading
 */
export const onLoadingComplete = buildEvent(RendererEventTypes.LOADING_COMPLETE)

/**
 * published when the server receives a loading progress update
 * from a client
 */
export const onLoadingProgress = buildEvent<{
  status: string
  progress: number
  isComplete: boolean
}>(RendererEventTypes.LOADING_PROGRESS)
