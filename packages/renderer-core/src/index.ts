import debug from 'debug'
import { INetworkMessageSender, IPixatorePlugin, World } from '@pixatore/ecs'
import { EventBus } from '@pixatore/event-bus'
import {
  ServerRendererLoadingSystem,
  ClientRendererLoadingSystem,
} from './systems'
import { LoadRenderer, Sprite } from './components'
import { IRenderSystem, MessageTypes } from './types'
import { ILoadingProgressEvent } from '@pixatore/game'

const log = debug('PX:REN:RendererPlugin       ')
if (console) log.log = console.log.bind(console)

/** This renderer plugin can be used on the server, but should be
 * overridden to run on the client with a specific renderer, e.g. pixi.js
 */
export class RendererPlugin implements IPixatorePlugin {
  private _isServer?: boolean
  private _world?: World

  handleMessage(
    client: { sessionId: string },
    type: string | number,
    message: { [key: string]: any },
  ): boolean {
    if (!this._world || !this._isServer) return false

    if (type !== MessageTypes.LOADING_PROGRESS) return false

    this._world.getSystem(ServerRendererLoadingSystem)?.queueLoadingUpdate({
      ...(message as ILoadingProgressEvent),
      sessionId: client.sessionId,
    })

    return true
  }

  mountClient(
    room: INetworkMessageSender,
    world: World,
    eventBus: EventBus,
  ): void {
    this._isServer = false
    log('Registering RendererPlugin.client')
    this._world = world

    this.registerComponents(this._world)

    log('RendererPlugin Systems')
    this._world.registerSystem(new ClientRendererLoadingSystem(room, eventBus))
  }

  mountServer(world: World, eventBus: EventBus): void {
    this._isServer = true
    this._world = world
    log('Registering RendererPlugin.server')

    this.registerComponents(this._world)

    log('RendererPlugin Systems')
    this._world.registerSystem(new ServerRendererLoadingSystem(eventBus))
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
