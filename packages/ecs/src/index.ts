import { World } from './World'
import { EventBus } from '@pixatore/event-bus'

export * from './Component'
export * from './Entity'
export * from './ObjectPool'
export * from './System'
export * from './types'
export * from './World'

export interface INetworkMessageSender {
  send: (messageType: string, payload: any) => void
}

export interface IPixatorePlugin {
  mountClient(
    room: INetworkMessageSender,
    world: World,
    eventBus: EventBus,
  ): void
  mountServer(world: World, eventBus: EventBus): void
  unmount(world: World, eventBus: EventBus): void
  handleMessage(
    client: { sessionId: string },
    type: string | number,
    message: any,
  ): boolean
}
