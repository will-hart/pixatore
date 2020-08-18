import { Schema, type, MapSchema } from '@colyseus/schema'
import { nanoid } from 'nanoid'

import { IPoolable, IConstructableSchema } from './types'
import { Component } from './Component'

export class Entity extends Schema implements IPoolable {
  @type('string') public id: string = ''

  @type({ map: Component }) public components: MapSchema<
    Component
  > = new MapSchema()

  static get _typeId() {
    return 'entity'
  }

  get isAlive(): boolean {
    return this.id !== ''
  }

  getComponent<T extends Component>(
    ComponentClass: IConstructableSchema<T>,
  ): T | undefined {
    return this.components.get(ComponentClass._typeId) as T
  }

  hasComponent(ComponentClass: IConstructableSchema<Component>) {
    return this.components.has(ComponentClass._typeId)
  }

  hasAllComponents(componentClasses: IConstructableSchema<Component>[]) {
    for (const cc of componentClasses) {
      if (!this.components.has(cc._typeId)) {
        return false
      }
    }

    return true
  }

  hasNoComponents(componentClasses: IConstructableSchema<Component>[]) {
    return !componentClasses.some((cc) => this.components.has(cc._typeId))
  }

  reset() {
    this.id = ''
  }

  init() {
    this.id = nanoid()
  }
}
