import { IPoolable, IConstructableSchema } from './types'

export class ObjectPool<T extends IPoolable = any> {
  private _freeItems: T[]

  public get availableItems() {
    return this._freeItems.length
  }

  public constructor(
    private Factory: IConstructableSchema<T>,
    initialSize: number,
  ) {
    this._freeItems = Array(initialSize >= 0 ? initialSize : 1)
      .fill(null)
      .map(() => new this.Factory())
  }

  public acquire(): T {
    if (this._freeItems.length > 0) {
      const result: T = this._freeItems.pop()!
      result.init()

      return result
    }

    const item = new this.Factory()
    item.init()
    return item
  }

  public release(component: T): void {
    component.reset()
    this._freeItems.push(component)
  }
}
