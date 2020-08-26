import debug from 'debug'
import { INetworkMessageSender, IPixatorePlugin, World } from '@pixatore/ecs'
import { EventBus } from '@pixatore/event-bus'
import {
  ServerRendererLoadingSystem,
  ClientRendererLoadingSystem,
} from './systems'
import { LoadRenderer, Sprite } from './components'
import { IRenderSystem } from './types'

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
    room: INetworkMessageSender,
    world: World,
    eventBus: EventBus,
  ): void {
    this._isServer = false
    log('Registering RendererPlugin.client')

    this.registerComponents(world)

    log('RendererPlugin Systems')
    world.registerSystem(new ClientRendererLoadingSystem(room, eventBus))
  }

  mountServer(world: World, eventBus: EventBus): void {
    this._isServer = true
    log('Registering RendererPlugin.server')

    this.registerComponents(world)

    log('RendererPlugin Systems')
    world.registerSystem(new ServerRendererLoadingSystem(eventBus))
  }

  registerComponents(world: World): void {
    log('RendererPlugin Components')
    world.registerComponent(LoadRenderer)
    world.registerComponent(Sprite)
  }

  unmount(world: World, _eventBus: EventBus): void {
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

export const isRenderSystem = (system: any): system is IRenderSystem => {
  return (system as any).rendererType !== undefined
}

export * from './types'
export * from './components'
export * from './systems'
