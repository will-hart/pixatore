import { Entity } from '@pixatore/ecs'
import { Components } from '..'

export const Player = (entity: Entity): Entity => {
  return entity
    .addComponent(Components.PlayerData)
    .addComponent(Components.Transform)
}
