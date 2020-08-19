import * as ECS from '..'
import { Schema } from '@colyseus/schema'

describe('Object pool', () => {
  class PooledItem extends Schema implements ECS.IPoolable {
    static _typeId = 1
    reset() {
      this.isAlive = false
    }
    init() {
      this.isAlive = true
    }
    isAlive: boolean = false
  }

  it('should create without error', () => {
    new ECS.ObjectPool(PooledItem, 5)
  })

  it('should construct with given number of items', () => {
    const op = new ECS.ObjectPool(PooledItem, 5)
    expect(op.availableItems).toEqual(5)
  })

  describe('pool acquisition', () => {
    it('should acquire an item from the pool', () => {
      const op = new ECS.ObjectPool(PooledItem, 1)
      expect(op.availableItems).toEqual(1)

      const ent = op.acquire()
      expect(ent).toBeDefined()
      expect(ent).toBeInstanceOf(PooledItem)
    })

    it('should increase the pool size', () => {
      const op = new ECS.ObjectPool(PooledItem, 1)
      expect(op.availableItems).toEqual(1)
      const freeEnt = op.acquire()

      expect(op.availableItems).toEqual(0)
      const ent = op.acquire()
      expect(ent).toBeDefined()
      expect(ent).toBeInstanceOf(PooledItem)

      expect(ent).not.toBe(freeEnt)
    })

    it('should init objects on acquisition', () => {
      const op = new ECS.ObjectPool(PooledItem, 1)
      expect(op.availableItems).toEqual(1)
      const freeEnt = op.acquire()

      expect(freeEnt.isAlive).toBeTruthy()
    })
  })

  describe('pool release', () => {
    it('should release items back to the free pool', () => {
      const op = new ECS.ObjectPool(PooledItem, 0)
      expect(op.availableItems).toEqual(0)

      const ent = new PooledItem()
      op.release(ent)
      expect(op.availableItems).toEqual(1)
    })

    it('should reset items when released', () => {
      const op = new ECS.ObjectPool(PooledItem, 0)
      expect(op.availableItems).toEqual(0)

      const ent = new PooledItem()
      ent.init()

      op.release(ent)
      expect(op.availableItems).toEqual(1)
      expect(ent.isAlive).toBeFalsy()
    })
  })
})
