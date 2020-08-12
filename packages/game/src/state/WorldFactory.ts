import { World } from '@colyseus/ecs'

import * as Components from '../components'
import * as Systems from '../systems'
import { GameState } from './GameState'

import debug from 'debug'
const log = debug('PX:GAM:WorldFacty:BuildWorld')
if (console) log.log = console.log.bind(console)

export enum WorldTypes {
  Client,
  Server,
}

export const CORE_ENTITY_NAME = '__core'

const registerComponents = (world: World, _worldType: WorldTypes): void => {
  log('Registering components')
  world
    .registerComponent(Components.Status)
    .registerComponent(Components.Transform)
    .registerComponent(Components.PlayerData)
    .registerComponent(Components.PlayerJoinMessage)
}

const registerSystems = (world: World, worldType: WorldTypes): void => {
  if (worldType === WorldTypes.Server) {
    log('Registering server systems')
    world.registerSystem(Systems.PlayerJoinSystem)
  }
}

const registerSingletonEntity = (world: World, worldType: WorldTypes): void => {
  if (worldType !== WorldTypes.Server) return // only create on server, will then sync to client
  log('Registering singleton entity')
  world.createEntity(CORE_ENTITY_NAME).addComponent(Components.Status)
}

export const buildWorld = (state: GameState, worldType: WorldTypes): World => {
  const world = new World()
  world.useEntities(state.entities)

  registerComponents(world, worldType)
  registerSystems(world, worldType)
  registerSingletonEntity(world, worldType)

  log('Finished building world')
  return world
}
