import { World } from '@colyseus/ecs'

import * as Components from '../components'
import * as Systems from '../systems'

export enum WorldTypes {
  Client,
  Server,
}

export const CORE_ENTITY_NAME = '__core'

const registerComponents = (world: World, _type: WorldTypes): void => {
  world
    .registerComponent(Components.LobbyStateChangeMessage)
    .registerComponent(Components.PlayerConnectionStatusMessage)
    .registerComponent(Components.PlayerData)
    .registerComponent(Components.PlayerJoinMessage)
    .registerComponent(Components.Status)
    .registerComponent(Components.Transform)
}

const registerSystems = (world: World, worldType: WorldTypes): void => {
  if (worldType === WorldTypes.Server) {
    world
      .registerSystem(Systems.LobbySystem)
      .registerSystem(Systems.PlayerConnectionStatusSystem)
      .registerSystem(Systems.PlayerJoinSystem)
  }
}

const registerSingletonEntity = (world: World, worldType: WorldTypes): void => {
  world.createEntity(CORE_ENTITY_NAME).addComponent(Components.Status)
}

export const buildWorld = (worldType: WorldTypes): World => {
  const world = new World()

  registerComponents(world, worldType)
  registerSystems(world, worldType)
  registerSingletonEntity(world, worldType)

  return world
}
