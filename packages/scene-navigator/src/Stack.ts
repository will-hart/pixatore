export default class Stack<T> {
  private _items: T[] = []

  enqueue = (item: T): T => {
    this._items.push(item)
    return item
  }

  dequeue = (): T => {
    const item = this._items[this._items.length - 1]
    this._items.splice(this._items.length - 1)
    return item
  }

  peek = (): T => {
    return this._items[this._items.length - 1]
  }

  clear = (): void => {
    this._items.length = 0
  }
}
