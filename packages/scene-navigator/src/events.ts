import { buildEvent } from '@pixatore/event-bus'

export enum SceneEventTypes {
  REQUEST_SCENE_TRANSITION = 'se::tr',
}

export enum SceneTransitionTypes {
  push,
  replace,
  reset,
}

export interface ISceneTransitionEventPayload {
  nextScreen?: string
  transitionType: SceneTransitionTypes
}

export const onSceneChange = buildEvent<ISceneTransitionEventPayload>(
  SceneEventTypes.REQUEST_SCENE_TRANSITION,
)
