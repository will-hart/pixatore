import debug from 'debug'
import { INetworkMessageSender, IPixatorePlugin, World } from '@pixatore/ecs'
import { EventBus } from '@pixatore/event-bus'
import {
  ServerRendererLoadingSystem,
  ClientRendererLoadingSystem,
} from './systems'

const log = debug('PX:REN:PLUGIN    :          ')
if (console) log.log = console.log.bind(console)

export abstract class RendererPlugin implements IPixatorePlugin {
  private _isServer?: boolean

  handleMessage(
    client: { sessionId: string },
    type: string | number,
    message: any,
  ): boolean {
    throw new Error('Method not implemented.')
  }

  mountClient(
    client: INetworkMessageSender,
    world: World,
    eventBus: EventBus,
  ): void {
    this._isServer = false
    log('Registering RendererPlugin.client')

    world.registerSystem(new ClientRendererLoadingSystem(client, eventBus))
  }

  mountServer(world: World, eventBus: EventBus): void {
    this._isServer = true
    log('Registering RendererPlugin.server')

    world.registerSystem(new ServerRendererLoadingSystem(eventBus))
  }

  unmount(world: World, eventBus: EventBus): void {
    log('Unregistering RenderPlugin')

    if (this._isServer) {
      log('Unregistering loading system (server)')
      world.unregisterSystem(ServerRendererLoadingSystem)
    } else {
      log('Unregistering loading system (client)')
      world.unregisterSystem(ClientRendererLoadingSystem)
    }
  }
}

export * from './types'
export * from './components'
export * from './systems'

export * as rendererEvents from './events'
