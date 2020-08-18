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

export class World extends Schema {
  private _systems: System[] = []

  private _componentPools: Map<string, ObjectPool> = new Map<
    string,
    ObjectPool
  >()

  private _entityPool: ObjectPool<Entity> = new ObjectPool(Entity, 10)

  public registerComponent<TInstance extends Component>(
    ComponentClass: IConstructableSchema<TInstance>,
  ) {
    this._componentPools.set(
      ComponentClass._typeId,
      new ObjectPool<TInstance>(ComponentClass, 1),
    )
  }

  public acquireComponent<TInstance extends Component>(
    ComponentClass: IConstructableSchema<TInstance>,
  ): TInstance {
    if (!this._componentPools.has(ComponentClass._typeId)) {
      throw new Error(
        `Cannot acquire ${ComponentClass.name} - this component has not been registered`,
      )
    }

    return this._componentPools.get(ComponentClass._typeId)?.acquire()
  }

  public releaseComponent<TInstance extends Component>(component: TInstance) {
    const componentClass = component.constructor as IConstructableSchema<
      TInstance
    >
    this._componentPools.get(componentClass._typeId)?.release(component)
  }

  public acquireEntity(): Entity {
    return this._entityPool.acquire()
  }

  public releaseEntity(entity: Entity): void {
    return this._entityPool.release(entity)
  }

  public registerSystem(system: System): void {
    this._systems.push(system)
    this._systems.sort((a, b) => a.priority - b.priority)
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
      const queries: IQueryMap = (system.constructor as any).queries
      system.execute(this.getCachedQueries(queries), deltaT)
    }
  }

  @type({ array: Entity }) public entities: ArraySchema<
    Entity
  > = new ArraySchema()
}
