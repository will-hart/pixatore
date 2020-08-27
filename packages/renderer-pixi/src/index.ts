import debug from 'debug'
import { INetworkMessageSender, World } from '@pixatore/ecs'
import { EventBus } from '@pixatore/event-bus'
import { RendererPlugin } from '@pixatore/renderer-core'
import { PixiRenderSystem } from './systems/PixiRenderSystem'

const log = debug('PX:REN:PixiRenderPlugin     ')
if (console) console.log.bind(console)

export class PixiRendererPlugin extends RendererPlugin {
  mountClient(
    room: INetworkMessageSender,
    world: World,
    eventBus: EventBus,
  ): void {
    super.mountClient(room, world, eventBus)

    log('Mounting client systems for PixiRendererPlugin')
    world.registerSystem(new PixiRenderSystem(eventBus))
  }
}

export * from './systems'
export * from './utilities'
export * from '@pixatore/renderer-core'
