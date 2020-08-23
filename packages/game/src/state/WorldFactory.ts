import { IPixatorePlugin, World } from '@pixatore/ecs'
import { EventBus } from '@pixatore/event-bus'

import * as Components from '../components'
import * as Systems from '../systems'

import debug from 'debug'
const log = debug('PX:GAM:WorldFacty:BuildWorld')
if (console) log.log = console.log.bind(console)

export enum WorldTypes {
  Client,
  Server,
}

export const CORE_ENTITY_NAME = '__core'

declare var window: any

const registerComponents = (
  world: World,
  _worldType: WorldTypes,
  _eventBus: EventBus,
): void => {
  log('Registering components')
  world
    .registerComponent(Components.Status)
    .registerComponent(Components.Transform)
    .registerComponent(Components.PlayerData)
    .registerComponent(Components.PlayerJoinMessage)
}

const registerSystems = (
  world: World,
  worldType: WorldTypes,
  eventBus: EventBus,
): void => {
  if (worldType === WorldTypes.Server) {
    log('Registering server systems')
    world.registerSystem(new Systems.PlayerJoinSystem())
    world.registerSystem(new Systems.ConnectionStatusSystem(eventBus))
  } else {
    log('Registering client systems')
    world
      .registerSystem(new Systems.GameStatusSystem(eventBus))
      .registerSystem(new Systems.LobbyHudSystem(eventBus))
  }
}

const registerSingletonEntity = (
  world: World,
  worldType: WorldTypes,
  _eventBus: EventBus,
): void => {
  if (worldType !== WorldTypes.Server) return // only create on server, will then sync to client
  log('Registering singleton entity')
  const ent = world.createEntity(CORE_ENTITY_NAME)
  world.addComponentToEntity(ent, Components.Status)
}

export const buildWorld = (
  worldType: WorldTypes,
  plugins: IPixatorePlugin[],
  eventBus: EventBus,
  existingWorld?: World,
): World => {
  const world = existingWorld || new World()

  for (const plugin of plugins) {
    if (worldType === WorldTypes.Server) {
      log('Mounting server plugin %s', plugin.constructor.name)
      plugin.mountServer(world, eventBus)
    } else {
      log('Mounting client plugin %s', plugin.constructor.name)
      plugin.mountClient({ send: console.log }, world, eventBus)
    }

    // world.addLoadedPlugin(plugin)
  }

  registerComponents(world, worldType, eventBus)
  registerSystems(world, worldType, eventBus)
  registerSingletonEntity(world, worldType, eventBus)

  log('Finished building world')

  if (
    world &&
    worldType === WorldTypes.Client &&
    typeof window !== 'undefined'
  ) {
    log('Emitting devtools hook')

    //@ts-ignore
    var event = new CustomEvent('pixatore-world-created', {
      detail: { world, eventBus },
    })
    window.dispatchEvent(event)
  }

  return world
}
