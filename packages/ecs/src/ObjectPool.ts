import { IPoolable, IConstructableSchema } from './types'

export class ObjectPool<T extends IPoolable = any> {
  private _freeItems: T[]

  public constructor(
    private Factory: IConstructableSchema<T>,
    initialSize: number,
  ) {
    console.log(`Creating factor for ${Factory.name} with ${initialSize} items`)
    this._freeItems = Array(initialSize > 0 ? initialSize : 1)
      .fill(null)
      .map(() => new this.Factory())
  }

  public acquire(): T {
    if (this._freeItems.length > 0) {
      console.log(`Acquiring pooled item for ${this.Factory.name}`)
      const result: T = this._freeItems.pop()!
      result.init()

      return result
    }

    console.log(`Acquiring new item for ${this.Factory.name}`)
    const item = new this.Factory()
    item.init()
    return item
  }

  public release(component: T): void {
    component.reset()
    console.log(`Releasing item for ${this.Factory.name}`)
    this._freeItems.push(component)
  }
}
