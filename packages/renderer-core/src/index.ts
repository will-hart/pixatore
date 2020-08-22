import debug from 'debug'
import { INetworkMessageSender, IPixatorePlugin, World } from '@pixatore/ecs'
import { EventBus } from '@pixatore/event-bus'
import {
  ServerRendererLoadingSystem,
  ClientRendererLoadingSystem,
} from './systems'
import { LoadRendererComponent } from './components'

const log = debug('PX:REN:PLUGIN    :          ')
if (console) log.log = console.log.bind(console)

/** This renderer plugin can be used on the server, but should be
 * overridden to run on the client with a specific renderer, e.g. pixi.js
 */
export class RendererPlugin implements IPixatorePlugin {
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

    this.registerComponents(world)
  }

  mountServer(world: World, eventBus: EventBus): void {
    this._isServer = true
    log('Registering RendererPlugin.server')

    world.registerSystem(new ServerRendererLoadingSystem(eventBus))

    // TODO - call this from the factory
    this.registerComponents(world)
  }

  registerComponents(world: World): void {
    world.registerComponent(LoadRendererComponent)
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
