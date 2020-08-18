import { Schema, ArraySchema, type } from '@colyseus/schema'

import { System } from './System'
import { ObjectPool } from './ObjectPool'
import { Entity } from './Entity'
import { Component } from './Component'
import {
  IConstructableSchema,
  IQuerySchema,
  IQueryResultMap,
  IQueryMap,
  IBaseConstructable,
} from './types'
import { QueryCache } from './QueryCache'

export class World extends Schema {
  private _systems: System[] = []

  private _componentPools: Map<string, ObjectPool> = new Map<
    string,
    ObjectPool
  >()

  private _entityPool: ObjectPool<Entity> = new ObjectPool(Entity, 10)

  private _queryCache = new QueryCache()

  public registerComponent<TInstance extends Component>(
    ComponentClass: IConstructableSchema<TInstance>,
  ) {
    this._componentPools.set(
      ComponentClass._typeId,
      new ObjectPool<TInstance>(ComponentClass, 1),
    )
  }

  private acquireComponent<TInstance extends Component>(
    ComponentClass: IConstructableSchema<TInstance>,
  ): TInstance {
    if (!this._componentPools.has(ComponentClass._typeId)) {
      throw new Error(
        `Cannot acquire ${ComponentClass.name} - this component has not been registered`,
      )
    }

    return this._componentPools.get(ComponentClass._typeId)?.acquire()
  }

  private releaseComponent<TInstance extends Component>(component: TInstance) {
    const componentClass = component.constructor as IConstructableSchema<
      TInstance
    >
    this._componentPools.get(componentClass._typeId)?.release(component)
  }

  public acquireEntity(): Entity {
    const entity = this._entityPool.acquire()
    this._queryCache.onAddEntity(entity)
    this.entities.push(entity)

    return entity
  }

  public addComponentToEntity<TComp extends Component>(
    entity: Entity,
    ComponentClass: IConstructableSchema<TComp>,
  ): TComp {
    if (entity.hasComponent(ComponentClass)) {
      throw new Error(
        `Entity ${entity.id} already has a component of type ${ComponentClass._typeId}`,
      )
    }

    const component = this.acquireComponent(ComponentClass)
    entity.components.set(ComponentClass._typeId, component)
    return component as TComp
  }

  public releaseComponentFromEntity<TComp extends Component>(
    entity: Entity,
    ComponentClass: IConstructableSchema<TComp>,
  ): void {
    const component = entity.getComponent(ComponentClass)
    if (!component) return

    entity.components.delete(ComponentClass._typeId)
    this.releaseComponent(component)
  }

  public releaseEntity(entity: Entity): void {
    // do this before components are removed
    this._queryCache.onRemoveEntity(entity)

    // release all components
    const components = Array.from(entity.components.values())
    entity.components.clear()

    for (const component of components) {
      this._componentPools
        .get((component.constructor as IConstructableSchema<Component>)._typeId)
        ?.release(component)
    }

    // release the entity
    this._entityPool.release(entity)
  }

  public registerSystem(system: System): void {
    this._systems.push(system)
    this._systems.sort((a, b) => a.priority - b.priority)

    system.queries = this._queryCache.registerSystem(
      (system.constructor as any).queryMap,
    )
  }

  public removeSystem(SystemClass: IBaseConstructable<System>): void {
    this._systems = this._systems.filter(
      (system) =>
        (system.constructor as IBaseConstructable<System>) !== SystemClass,
    )
  }

  private matchEntities(matchSchema: IQuerySchema): Entity[] {
    return this.entities.filter(
      (ent) =>
        ent.hasAllComponents(matchSchema.components) &&
        (!matchSchema.notComponents?.length ||
          ent.hasNoComponents(matchSchema.notComponents)),
    )
  }

  // TODO: cache queries - map components to associated queries
  private getCachedQueries(queries: IQueryMap): IQueryResultMap {
    return Object.keys(queries).reduce((acc: IQueryResultMap, key: string) => {
      const querySchema = queries[key]

      return { ...acc, [key]: this.matchEntities(querySchema) }
    }, {} as IQueryResultMap)
  }

  public tick(deltaT: number): void {
    for (const system of this._systems) {
      const queryMap: IQueryMap = (system.constructor as any).queryMap
      system.execute(this.getCachedQueries(queryMap), deltaT)
    }
  }

  @type({ array: Entity }) public entities: ArraySchema<
    Entity
  > = new ArraySchema()
}
