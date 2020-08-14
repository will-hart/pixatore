import { Entity } from '@colyseus/ecs'
import { ArraySchema, Schema, type } from '@colyseus/schema'

export class GameState extends Schema {
  @type([Entity]) entities = new ArraySchema<Entity>()
}
