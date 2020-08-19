import { Schema, type, MapSchema } from '@colyseus/schema'
import { nanoid } from 'nanoid'

import { IPoolable, IConstructableSchema } from './types'
import { Component } from './Component'
import { World } from './World'

export class Entity extends Schema implements IPoolable {
  private world?: World

  @type('string') public id: string = ''
  @type('string') public name: string = ''

  @type({ map: Component }) public components: MapSchema<
    Component
  > = new MapSchema()

  static get _typeId() {
    return (this as typeof Schema)._typeid
  }

  static set _typeId(_typeId: number) {
    /* ignore */
  }

  get isAlive(): boolean {
    return this.id !== ''
  }

  public setWorld(world: World | undefined) {
    this.world = world
  }

  addComponent<T extends Component>(ComponentClass: IConstructableSchema<T>) {
    this.world?.addComponentToEntity(this, ComponentClass)
    return this
  }

  getComponent<T extends Component>(
    ComponentClass: IConstructableSchema<T>,
  ): T | undefined {
    return this.components.get(ComponentClass._typeId.toString()) as T
  }

  hasComponent(ComponentClass: IConstructableSchema<Component>) {
    return this.components.has(ComponentClass._typeId.toString())
  }

  hasAllComponents(componentClasses: IConstructableSchema<Component>[]) {
    for (const cc of componentClasses) {
      if (!this.components.has(cc._typeId.toString())) {
        return false
      }
    }

    return true
  }

  doesNotHaveComponents(componentClasses: IConstructableSchema<Component>[]) {
    // can't have any components if we aren't checking any!
    if (!componentClasses.length) return true

    // check if we have any of the components. If so, return false
    return !componentClasses.some((cc) =>
      this.components.has(cc._typeId.toString()),
    )
  }

  reset() {
    this.id = ''
  }

  init() {
    this.id = nanoid()
  }
}
