import { INetworkMessageSender, World } from '@pixatore/ecs'
import { EventBus } from '@pixatore/event-bus'
import { RendererPlugin } from '@pixatore/renderer-core'
import { PixiSpriteRendererSystem } from './systems'
import { PixiSprite } from './components'

export class PixiRendererPlugin extends RendererPlugin {
  mountClient(
    client: INetworkMessageSender,
    world: World,
    eventBus: EventBus,
  ): void {
    super.mountClient(client, world, eventBus)

    world.registerComponent(PixiSprite)
    world.registerSystem(new PixiSpriteRendererSystem(eventBus))
  }
}

export * from './components'
export * from './systems'
export * from './utilities'
export * from '@pixatore/renderer-core'
