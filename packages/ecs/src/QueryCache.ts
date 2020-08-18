import { Entity } from './Entity'
import { IQueryMap, IQuerySchema, IConstructableSchema } from './types'
import { Component } from './Component'

export class Query {
  private _entities: Set<Entity> = new Set<Entity>()

  constructor(private schema: IQuerySchema) {}

  get entities(): Entity[] {
    return Array.from(this._entities)
  }

  private matchEntity(entity: Entity): boolean {
    return (
      entity.hasAllComponents(this.schema.components) &&
      (!this.schema.notComponents?.length ||
        entity.hasNoComponents(this.schema.notComponents))
    )
  }

  onAddEntity(entity: Entity) {
    if (this.matchEntity(entity)) {
      this._entities.add(entity)
    }
  }

  onAddComponent(entity: Entity) {
    this.onAddEntity(entity)
  }

  onRemoveComponent(entity: Entity) {
    if (!this._entities.has(entity)) return

    if (!this.matchEntity(entity)) {
      this._entities.delete(entity)
    }
  }
}

// TODO Defer query updates
export class QueryCache {
  private _queryMap: Map<string, Query[]> = new Map()

  registerSystem(queryMap: IQueryMap): { [key: string]: Query } {
    return Object.keys(queryMap || {}).reduce(
      (acc: ReturnType<QueryCache['registerSystem']>, key: string) => {
        const querySchema = queryMap[key]
        const query = new Query(querySchema)

        console.log(querySchema)

        // register query with different update maps
        for (const componentClass of new Set([
          ...querySchema.components,
          ...(querySchema.notComponents || []),
        ])) {
          this.ensureComponentMapExists(componentClass)

          const type = componentClass._typeId
          const queries = this._queryMap.get(type)
          queries?.push(query)
        }

        return { ...acc, [key]: query }
      },
      {},
    )
  }

  onAddEntity(entity: Entity): void {
    this.forAllMappedEntities(entity, (query: Query) => {
      query.onAddEntity(entity)
    })
  }

  onAddComponent(
    entity: Entity,
    ComponentClass: IConstructableSchema<Component>,
  ): void {
    const type = ComponentClass._typeId
    this.ensureComponentMapExists(ComponentClass)

    for (const query of this._queryMap.get(type) || []) {
      query.onAddComponent(entity)
    }
  }

  onRemoveComponent(
    entity: Entity,
    ComponentClass: IConstructableSchema<Component>,
  ): void {
    const type = ComponentClass._typeId

    if (!this._queryMap.has(type)) return

    for (const query of this._queryMap.get(type) || []) {
      query.onRemoveComponent(entity)
    }
  }

  onRemoveEntity(entity: Entity): void {}

  private ensureComponentMapExists(
    ComponentClass: IConstructableSchema<Component>,
  ): void {
    const type = ComponentClass._typeId
    if (!this._queryMap.has(type)) {
      this._queryMap.set(type, [])
    }
  }

  private forAllMappedEntities(
    entity: Entity,
    callback: (query: Query) => void,
  ): void {
    const visitedQueries = new Set<Query>()

    for (const component of entity.components.values()) {
      this.updateSingleComponent(component, visitedQueries, callback)
    }
  }

  private updateSingleComponent(
    component: Component,
    visitedQueries: Set<Query>,
    callback: (query: Query) => void,
  ) {
    const type = (component.constructor as IConstructableSchema<Component>)
      ._typeId

    for (const query of this._queryMap.get(type) || []) {
      if (visitedQueries.has(query)) {
        // don't update a query more than once
        continue
      }

      visitedQueries.add(query)
      callback(query)
    }
  }
}
