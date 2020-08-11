import { World } from '@colyseus/ecs'

import * as Components from '../components'
import * as Systems from '../systems'
import { GameState } from './GameState'

export enum WorldTypes {
  Client,
  Server,
}

export const CORE_ENTITY_NAME = '__core'

const registerComponents = (world: World, _worldType: WorldTypes): void => {
  world
    .registerComponent(Components.Status)
    .registerComponent(Components.Transform)
    .registerComponent(Components.PlayerData)
    .registerComponent(Components.LobbyStateChangeMessage)
    .registerComponent(Components.PlayerConnectionStatusMessage)
    .registerComponent(Components.PlayerJoinMessage)
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
  if (worldType !== WorldTypes.Server) return // only create on server, will then sync to client
  world.createEntity(CORE_ENTITY_NAME).addComponent(Components.Status)
}

export const buildWorld = (state: GameState, worldType: WorldTypes): World => {
  const world = new World()
  world.useEntities(state.entities)

  registerComponents(world, worldType)
  registerSystems(world, worldType)
  registerSingletonEntity(world, worldType)

  return world
}
