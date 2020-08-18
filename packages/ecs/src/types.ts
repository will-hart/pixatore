import { Component } from './Component'
import { Entity } from './Entity'
import { Schema } from '@colyseus/schema'

export interface IPoolable extends Schema {
  reset: () => void
  init: () => void
  isAlive: boolean
}

export interface IBaseConstructable<T> {
  new (): T
}

export interface IConstructableSchema<C extends IPoolable>
  extends IBaseConstructable<C> {
  _typeId: string
}

export interface IQueryMap {
  [queryName: string]: IQuerySchema
}

export interface IQuerySchema {
  components: IConstructableSchema<Component>[]
  notComponents?: IConstructableSchema<Component>[]
}

export interface IQueryResultMap {
  [key: string]: Entity[]
}
