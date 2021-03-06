import { Component } from './Component'
import { Schema } from '@colyseus/schema'

export interface IPoolable extends Schema {
  reset: () => void
  init: () => void
  isAlive: boolean
}

export interface IBaseConstructable<T> {
  new (...args: any[]): T
}

export interface IConstructableSchema<C extends IPoolable>
  extends IBaseConstructable<C> {
  _typeId: number
}

export interface IQueryMap {
  [queryName: string]: IQuerySchema
}

export interface IQuerySchema {
  components: IConstructableSchema<Component>[]
  notComponents: IConstructableSchema<Component>[]
}
