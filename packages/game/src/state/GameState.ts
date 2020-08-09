import { Entity } from '@colyseus/ecs'
import { ArraySchema, Schema, type } from '@colyseus/schema'

export class GameState extends Schema {
  // TODO: what is happening with the types here? Is this valid beyond ecs 0.4.0-alpha1?
  //@ts-ignore
  @type([Entity]) entities = new ArraySchema<Entity>()
}
