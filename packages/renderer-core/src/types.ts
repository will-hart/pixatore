import { System } from '@pixatore/ecs'

export const MessageTypes = {
  LOADING_PROGRESS: 're::load',
}

export interface IRenderSystem extends System {
  rendererType: string
  mountToDom(parent: HTMLDivElement, spriteMap: Map<string, string>): void
}
