import { Schema, type } from '@colyseus/schema'
import { nanoid } from 'nanoid'

import { IPoolable } from './types'

export abstract class Component extends Schema implements IPoolable {
  @type('string') public id: string = ''

  static get _typeId() {
    return (this as typeof Schema)._typeid
  }

  static set _typeId(_typeId: number) {
    /* ignore */
  }

  get isAlive(): boolean {
    return this.id !== ''
  }

  abstract reset(): void

  init(): void {
    this.id = nanoid()
  }
}
