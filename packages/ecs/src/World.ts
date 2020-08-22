import { Schema, ArraySchema, type } from '@colyseus/schema'

import debug from 'debug'

import { System } from './System'
import { ObjectPool } from './ObjectPool'
import { Entity } from './Entity'
import { Component } from './Component'
import { IConstructableSchema, IQueryMap, IBaseConstructable } from './types'
import { Query } from './Query'
import { IPixatorePlugin } from '.'

const log = debug('PX:ECS:World     :          ')
if (console) log.log = console.log.bind(console)

export class World extends Schema {
  private _plugins: IPixatorePlugin[] = []

  private _systems: System[] = []

  private _componentPools: Map<number, ObjectPool> = new Map()

  private _entityPool: ObjectPool<Entity> = new ObjectPool(Entity, 10)

  /**
   * Holds a "last state version number" for each component type.
   * These are incremented when components are acquired or released.
   *
   * Queries retain their last updated version and can check to see
   * if the world has changed and the query is dirty based on their stored
   * hashes
   */
  private _componentUpdateHashes: Map<number, number> = new Map()

  /**
   * Returns true if any of the queries
   * @param schema
   */
  public isQueryOutdated(query: Query): boolean {
    const schema = query.schema

    for (const comp of [...schema.components, ...schema.notComponents]) {
      if (
        this._componentUpdateHashes.get(comp._typeId)! >
        query.getComponentHash(comp._typeId)!
      ) {
        return true
      }
    }

    return false
  }

  public registerComponent<TInstance extends Component>(
    ComponentClass: IConstructableSchema<TInstance>,
  ): World {
    log(
      `Registering component ${ComponentClass.name}::${ComponentClass._typeId}`,
    )
    this._componentPools.set(
      ComponentClass._typeId,
      new ObjectPool<TInstance>(ComponentClass, 1),
    )
    this._componentUpdateHashes.set(ComponentClass._typeId, 0)

    return this
  }

  private acquireComponent<TInstance extends Component>(
    ComponentClass: IConstructableSchema<TInstance>,
  ): TInstance {
    if (!this._componentPools.has(ComponentClass._typeId)) {
      log(
        `Unable to find Component Id ${ComponentClass._typeId} in registered components, which has keys %o`,
        Array.from(this._componentPools.keys()),
      )
      throw new Error(
        `Cannot acquire ${ComponentClass.name} - this component has not been registered`,
      )
    }

    const type = ComponentClass._typeId
    this.incrementComponentHash(type)
    return this._componentPools.get(type)?.acquire()
  }

  private incrementComponentHash(type: number) {
    this._componentUpdateHashes.set(
      type,
      this._componentUpdateHashes.get(type)! + 1,
    )
  }

  private releaseComponent<TInstance extends Component>(component: TInstance) {
    const componentClass = component.constructor as IConstructableSchema<
      TInstance
    >

    const type = componentClass._typeId

    this.incrementComponentHash(type)
    this._componentPools.get(type)?.release(component)
  }

  public createEntity(name?: string): Entity {
    const entity = this._entityPool.acquire()
    entity.name = name || ''
    entity.setWorld(this)

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
    entity.components.set(ComponentClass._typeId.toString(), component)
    return component as TComp
  }

  public releaseComponentFromEntity<TComp extends Component>(
    entity: Entity,
    ComponentClass: IConstructableSchema<TComp>,
  ): void {
    const component = entity.getComponent(ComponentClass)
    if (!component) return

    entity.components.delete(ComponentClass._typeId.toString())
    this.releaseComponent(component)

    // release empty entities
    if (entity.components.values.length === 0) {
      this.releaseEntity(entity)
    }
  }

  public releaseEntity(entity: Entity): void {
    // release all components
    const components = Array.from(entity.components.values())
    entity.components.clear()
    entity.setWorld(undefined)

    for (const component of components) {
      this._componentPools
        .get((component.constructor as IConstructableSchema<Component>)._typeId)
        ?.release(component)
    }

    // release the entity
    this._entityPool.release(entity)
  }

  public registerSystem(system: System): World {
    system.queries = this.getCachedQueries(system.queryMap)

    this._systems.push(system)
    this._systems.sort((a, b) => a.priority - b.priority)

    return this
  }

  public getSystem<T extends System>(
    SystemConstructor: IBaseConstructable<T>,
  ): T | null {
    const filtered = this._systems.filter(
      (sys) => sys.constructor === SystemConstructor,
    )

    if (filtered.length) {
      return filtered[0] as T
    }
    return null
  }

  public unregisterSystem(SystemClass: IBaseConstructable<System>): World {
    this._systems = this._systems.filter(
      (system) =>
        (system.constructor as IBaseConstructable<System>) !== SystemClass,
    )

    return this
  }

  /**
   * Inefficiently queries all the entities until one with the give nname is found
   * @param name the name to retrieve
   */
  public getEntityByName(name: string): Entity | undefined {
    return this.entities.find((ent) => ent.name === name)
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

  public handleMessage(
    client: { sessionId: string },
    type: string | number,
    message: any,
  ): void {
    for (const plugin of this._plugins) {
      if (plugin.handleMessage(client, type, message)) return
    }

    log('Unknown message type received %s, payload %o', type, message)
  }

  /**
   * Register a plugin as mounted on this world. Mounting actions are called via
   * the world factory
   */
  public addLoadedPlugin(plugin: IPixatorePlugin): void {
    this._plugins.push(plugin)
  }

  public tick(deltaT: number): void {
    for (const system of this._systems) {
      system.execute(deltaT, this)
    }
  }

  @type([Entity]) public entities: ArraySchema<Entity> = new ArraySchema()

  constructor() {
    super()
    log('Creating new world')
  }
}
