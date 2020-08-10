import { Entity } from '@colyseus/ecs'
import { ArraySchema, Schema, type } from '@colyseus/schema'

export class GameState extends Schema {
  //@ts-ignore
  @type([Entity]) entities = new ArraySchema<Entity>()
}
