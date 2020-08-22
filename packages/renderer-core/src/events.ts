import { buildEvent } from '@pixatore/event-bus'

export enum RendererEventTypes {
  READY_TO_LOAD = 're::RD!',
  LOADING_COMPLETE = 're::LC!',
  LOADING_PROGRESS = 're::AP~',
}

/**
 * Published when all clients have finished loading
 */
export const onLoadingComplete = buildEvent<{}>(
  RendererEventTypes.LOADING_COMPLETE,
)

export const onLoadingProgress = buildEvent<{
  status: string
  progress: number
  isComplete: boolean
}>(RendererEventTypes.LOADING_PROGRESS)
