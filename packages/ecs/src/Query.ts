import { Entity } from './Entity'
import { IQuerySchema } from './types'
import { World } from './World'

export class Query {
  private _entities: Set<Entity> = new Set()

  constructor(private schema: IQuerySchema, private world: World) {}

  public removeEntity(entity: Entity): void {
    this._entities.delete(entity)
  }

  public refresh(): void {
    if (!this.world.isQueryOutdated(this.schema)) return

    // probably not great performance but the easiest way to manage removed entities
    this._entities.clear()

    this._entities = new Set(
      this.world.entities.filter((ent) => this.matchEntity(ent)),
    )
  }

  get entities(): Entity[] {
    this.refresh()
    return Array.from(this._entities)
  }

  private matchEntity(entity: Entity): boolean {
    return (
      entity.hasAllComponents(this.schema.components) &&
      (!this.schema.notComponents?.length ||
        entity.hasNoComponents(this.schema.notComponents))
    )
  }
}
