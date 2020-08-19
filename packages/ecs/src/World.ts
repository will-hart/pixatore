import { Schema, ArraySchema, type } from '@colyseus/schema'

import { System } from './System'
import { ObjectPool } from './ObjectPool'
import { Entity } from './Entity'
import { Component } from './Component'
import {
  IConstructableSchema,
  IQuerySchema,
  IQueryMap,
  IBaseConstructable,
} from './types'
import { Query } from './Query'

export class World extends Schema {
  private _systems: System[] = []

  private _componentPools: Map<string, ObjectPool> = new Map<
    string,
    ObjectPool
  >()

  private _entityPool: ObjectPool<Entity> = new ObjectPool(Entity, 10)

  private _changedComponents: Set<IConstructableSchema<Component>> = new Set()

  public isQueryOutdated(schema: IQuerySchema): boolean {
    for (const comp of schema.components) {
      if (this._changedComponents.has(comp)) {
        return true
      }
    }

    for (const comp of schema.notComponents || []) {
      if (this._changedComponents.has(comp)) {
        return true
      }
    }

    return false
  }

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

    this._changedComponents.add(ComponentClass)
    return this._componentPools.get(ComponentClass._typeId)?.acquire()
  }

  private releaseComponent<TInstance extends Component>(component: TInstance) {
    const componentClass = component.constructor as IConstructableSchema<
      TInstance
    >

    this._changedComponents.add(componentClass)
    this._componentPools.get(componentClass._typeId)?.release(component)
  }

  public acquireEntity(): Entity {
    const entity = this._entityPool.acquire()
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

    system.queries = this.getCachedQueries((system.constructor as any).queryMap)
  }

  public unregisterSystem(SystemClass: IBaseConstructable<System>): void {
    this._systems = this._systems.filter(
      (system) =>
        (system.constructor as IBaseConstructable<System>) !== SystemClass,
    )
  }

  private getCachedQueries(queries: IQueryMap): { [key: string]: Query } {
    return Object.keys(queries).reduce(
      (acc: { [key: string]: Query }, key: string) => {
        const query = new Query(queries[key], this)
        return { ...acc, [key]: query }
      },
      {},
    )
  }

  public tick(deltaT: number): void {
    for (const system of this._systems) {
      system.execute(deltaT)
    }

    this._changedComponents.clear()
  }

  @type({ array: Entity }) public entities: ArraySchema<
    Entity
  > = new ArraySchema()
}
