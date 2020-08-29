import debug from 'debug'
import {
  IPixatorePlugin,
  INetworkMessageSender,
  World,
  Entity,
} from '@pixatore/ecs'
import { EventBus } from '@pixatore/event-bus'
import { SceneNavigation } from './components'

export * from './components'

const log = debug('PX:SNP:SceneNavigatorPlugin ')
if (console) log.log = console.log.bind(console)

export class SceneNavigatorPlugin implements IPixatorePlugin {
  mountClient(
    client: INetworkMessageSender,
    world: World,
    eventBus: EventBus,
  ): void {
    log('Mounting scene navigator plugin on client')
    this.registerComponents(world)
    throw new Error('Method not implemented.')
  }

  mountServer(world: World, eventBus: EventBus): void {
    log('Mounting scene navigator plugin on server - logic is all client side')
    this.registerComponents(world)
    this.createServerEntity(world)
    throw new Error('Method not implemented.')
  }

  unmount(world: World, eventBus: EventBus): void {
    log('Unmounting scene navigator plugin')
    throw new Error('Method not implemented.')
  }

  handleMessage(
    client: { sessionId: string },
    type: string | number,
    message: any,
  ): boolean {
    return false
  }

  private createServerEntity(world: World): Entity {
    return world.createEntity('_sceneNavigator').addComponent(SceneNavigation)
  }

  private registerComponents(world: World): void {
    log('Registering components')
    world.registerComponent(SceneNavigation)
  }
}
