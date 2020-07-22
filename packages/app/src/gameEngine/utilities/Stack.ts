export default class Stack<T> extends Array<T> {
  enqueue = (item: T): T => {
    this.push(item)
    return item
  }

  dequeue = (): T => {
    const item = this[this.length - 1]
    this.splice(this.length - 1)
    return item
  }

  peek = (): T => {
    return this[this.length - 1]
  }

  clear = (): void => {
    this.splice(0)
  }
}
