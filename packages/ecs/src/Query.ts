import { Entity } from './Entity'
import { IQuerySchema } from './types'
import { World } from './World'

export class Query {
  private _entities: Set<Entity> = new Set()

  private _lastQueryHash: Map<number, number> = new Map()

  public schema: Readonly<IQuerySchema>

  constructor(schema: IQuerySchema, private world: World) {
    this.schema = Object.freeze(schema)

    for (const componentClass of [
      ...schema.components,
      ...schema.notComponents,
    ]) {
      this._lastQueryHash.set(componentClass._typeId, -1)
    }
  }

  public getComponentHash(type: number): number | undefined {
    return this._lastQueryHash.get(type)
  }

  public removeEntity(entity: Entity): void {
    this._entities.delete(entity)
  }

  public refresh(): void {
    if (!this.world.isQueryOutdated(this)) return

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
      entity.doesNotHaveComponents(this.schema.notComponents)
    )
  }
}
