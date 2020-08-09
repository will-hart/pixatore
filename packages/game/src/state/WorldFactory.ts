import { World } from '@colyseus/ecs'

import * as Components from '../components'

export enum WorldTypes {
  Client,
  Server,
}

const registerComponents = (world: World, _type: WorldTypes): void => {
  world
    .registerComponent(Components.Transform)
    .registerComponent(Components.PlayerData)
    .registerComponent(Components.Status)
}

const registerSystems = (world: World, worldType: WorldTypes): void => {
  // TODO
}

const registerSingletonEntity = (world: World, worldType: WorldTypes): void => {
  world.createEntity('__core').addComponent(Components.Status)
}

export const buildWorld = (worldType: WorldTypes): World => {
  const world = new World()

  registerComponents(world, worldType)
  registerSystems(world, worldType)
  registerSingletonEntity(world, worldType)

  return world
}
